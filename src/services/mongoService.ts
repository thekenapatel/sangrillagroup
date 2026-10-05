/**
 * Sangrilla Group Lead Capture & Contact Service
 * 
 * Interacts with the backend API to securely record leads in MongoDB Atlas.
 * No MongoDB credentials or packages exist on the client side.
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

const LOCAL_STORAGE_KEY = 'sangrilla_contact_history';

/**
 * Returns the configured API base URL without trailing slashes.
 * In development, defaults to http://localhost:5000 if VITE_API_BASE_URL is not set.
 */
export const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  return '';
};

/**
 * Safely constructs an API endpoint URL.
 */
export const getApiUrl = (endpoint: string): string => {
  const base = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return base ? `${base}${cleanEndpoint}` : cleanEndpoint;
};

/**
 * Helper to normalize a phone number (removes all non-digits)
 */
export const normalizePhone = (phone: string): string => {
  if (!phone) return '';
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
    return list.some((item) => normalizePhone(item) === clean);
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
 * Directly check if contact number exists in backend database
 */
export const checkDuplicateContact = async (contactNumber: string): Promise<boolean> => {
  const cleanPhone = normalizePhone(contactNumber);
  if (!cleanPhone) return false;

  // Fast-check client local storage cache
  if (isPhoneLocallyRegistered(cleanPhone)) {
    return true;
  }

  try {
    const endpoint = getApiUrl(`/api/contacts/check?phone=${encodeURIComponent(contactNumber)}`);
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
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
 * Save contact info into MongoDB via the backend API.
 * Prevents duplicate entries based on normalized contact number.
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
      error: 'INVALID_PHONE',
    };
  }

  if (!payload.name || payload.name.trim().length < 2) {
    return {
      success: false,
      isDuplicate: false,
      message: 'Please enter your full name.',
      error: 'INVALID_NAME',
    };
  }

  const submissionData = {
    name: payload.name.trim(),
    contactNumber: payload.contactNumber.trim(),
    email: payload.email?.trim() || '',
    source: payload.source || 'Brochure Modal Popup',
    project: payload.project || 'Sangrilla Meadows',
  };

  try {
    const endpoint = getApiUrl('/api/contacts');
    const response = await fetch(endpoint, {
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
          id: data.data?.id,
        };
      }

      return {
        success: true,
        isDuplicate: false,
        message: 'Details saved, Downloading your brochure...',
        id: data.data?.id,
      };
    } else {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData.error || errorData.message || `HTTP ${response.status}`;
      throw new Error(errorMsg);
    }
  } catch (error: any) {
    console.error('[MongoService] Save contact error:', error.message || error);

    return {
      success: false,
      isDuplicate: false,
      message: 'Failed to save, Please try again later: ' + (error.message || 'Server error'),
      error: error.message,
    };
  }
};

/**
 * Resolves the full URL to the brochure PDF reliably across development,
 * GitHub Pages custom domain, or repository subpaths.
 */
export const resolveBrochureUrl = (
  brochureUrl: string = '/sangrilla-meadows-brochure.pdf'
): string => {
  if (!brochureUrl) return '/sangrilla-meadows-brochure.pdf';

  // If already absolute URL, use as is
  if (brochureUrl.startsWith('http://') || brochureUrl.startsWith('https://')) {
    return brochureUrl;
  }

  try {
    const cleanPath = brochureUrl.startsWith('/') ? brochureUrl : `/${brochureUrl}`;
    const base = import.meta.env.BASE_URL || '/';
    const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
    const pathWithBase =
      normalizedBase && !cleanPath.startsWith(normalizedBase)
        ? `${normalizedBase}${cleanPath}`
        : cleanPath;

    return new URL(pathWithBase, window.location.origin).href;
  } catch {
    return brochureUrl;
  }
};

/**
 * Triggers the browser download for the brochure PDF
 */
export const downloadBrochure = (
  brochureUrl: string = '/sangrilla-meadows-brochure.pdf',
  filename: string = 'sangrilla-meadows-brochure.pdf'
): void => {
  const targetUrl = resolveBrochureUrl(brochureUrl);
  const link = document.createElement('a');
  link.href = targetUrl;
  link.download = filename;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    try {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    } catch {
      // Ignore if already removed
    }
  }, 500);
};
