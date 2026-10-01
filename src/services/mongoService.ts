/**
 * MongoDB Atlas Direct Frontend Service
 * 
 * Interacts with MongoDB Atlas (UserInfo database -> ContactDetails collection)
 * directly from the frontend using Vite environment variables.
 * Automatically checks and prevents duplicate contact numbers.
 */

export interface ContactSubmission {
  name: string;
  contactNumber: string;
  email?: string;
  source?: string;
  project?: string;
}

export interface MongoResult {
  success: boolean;
  isDuplicate: boolean;
  message: string;
  id?: string;
  error?: string;
}

// Access environment variables configured in .env with VITE_ prefix
export const ATLAS_ENV = {
  uri: import.meta.env.VITE_MONGODB_URI || '',
  username: import.meta.env.VITE_MONGODB_USERNAME || '',
  password: import.meta.env.VITE_MONGODB_PASSWORD || '',
  database: import.meta.env.VITE_MONGODB_DATABASE || 'UserInfo',
  collection: import.meta.env.VITE_MONGODB_COLLECTION || 'ContactDetails',
};

const LOCAL_STORAGE_KEY = 'sangrilla_contact_history';

/**
 * Helper to normalize a phone number (removes non-digits)
 */
export const normalizePhone = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

/**
 * Checks if a contact number already exists in local storage cache
 */
export const isPhoneLocallyRegistered = (phone: string): boolean => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return false;
    const list: string[] = JSON.parse(raw);
    const clean = normalizePhone(phone);
    return list.some(item => normalizePhone(item) === clean);
  } catch {
    return false;
  }
};

/**
 * Stores a contact phone in local storage cache
 */
export const recordLocalPhone = (phone: string): void => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    const clean = normalizePhone(phone);
    if (!list.includes(clean)) {
      list.push(clean);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    }
  } catch (err) {
    console.warn('[MongoService] LocalStorage write error:', err);
  }
};

/**
 * Directly check if contact number exists in MongoDB Atlas collection
 */
export const checkDuplicateContact = async (contactNumber: string): Promise<boolean> => {
  const cleanPhone = normalizePhone(contactNumber);
  if (!cleanPhone) return false;

  // First fast-check local client history
  if (isPhoneLocallyRegistered(cleanPhone)) {
    return true;
  }

  try {
    const res = await fetch(`/api/contacts/check?phone=${encodeURIComponent(contactNumber)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (res.ok) {
      const data = await res.json();
      if (data.isDuplicate) {
        recordLocalPhone(cleanPhone);
        return true;
      }
    }
  } catch (err) {
    console.warn('[MongoService] Check duplicate API warning:', err);
  }

  return false;
};

/**
 * Save contact info into MongoDB Atlas UserInfo database, ContactDetails collection.
 * Prevents duplicate entries based on contact number.
 */
export const saveContactDetails = async (
  payload: ContactSubmission
): Promise<MongoResult> => {
  const cleanPhone = normalizePhone(payload.contactNumber);

  if (!cleanPhone || cleanPhone.length < 10) {
    return {
      success: false,
      isDuplicate: false,
      message: 'Please provide a valid 10-digit mobile number.',
      error: 'INVALID_PHONE'
    };
  }

  if (!payload.name || payload.name.trim().length < 2) {
    return {
      success: false,
      isDuplicate: false,
      message: 'Please enter your full name.',
      error: 'INVALID_NAME'
    };
  }


  const submissionData = {
    name: payload.name.trim(),
    contactNumber: payload.contactNumber.trim(),
    email: payload.email?.trim() || '',
    source: payload.source || 'Brochure Download Popup',
    project: payload.project || 'Sangrilla Meadows',
    database: ATLAS_ENV.database,
    collection: ATLAS_ENV.collection,
    submittedAt: new Date().toISOString()
  };

  try {
    console.log(`[MongoService] Submitting to Mongo Atlas (${ATLAS_ENV.database}.${ATLAS_ENV.collection}):`, submissionData);

    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    if (response.ok) {
      const data = await response.json();
      recordLocalPhone(cleanPhone);

      if (data.isDuplicate) {
        return {
          success: true,
          isDuplicate: true,
          message: 'Contact already exists. Downloading your brochure...',
          id: data.data?.id
        };
      }

      return {
        success: true,
        isDuplicate: false,
        message: 'Details saved, Downloading your brochure...',
        id: data.data?.id
      };
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
  } catch (error: any) {
    console.error('[MongoService] MongoDB connection error:', error.message);

    return {
      success: false,
      isDuplicate: false,
      message: 'Failed to save, Please try again later: ' + (error.message || 'Server error'),
      error: error.message
    };
  }
};

/**
 * Triggers the browser download for the brochure PDF
 */
export const downloadBrochure = (
  brochureUrl: string = '/sangrilla-meadows-brochure.pdf',
  filename: string = 'sangrilla-meadows-brochure.pdf'
): void => {
  const link = document.createElement('a');
  link.href = brochureUrl;
  link.download = filename;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    try {
      document.body.removeChild(link);
    } catch {
      // Ignore if already removed
    }
  }, 200);
};
