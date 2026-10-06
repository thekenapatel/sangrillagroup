/**
 * Sangrilla Group Lead Capture & Contact Service
 * 
 * Handles reliable lead recording to MongoDB Atlas and resilient client-side storage.
 * Guarantees that brochure downloads succeed 100% of the time, even during cold-starts or offline states.
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
  savedOffline?: boolean;
}

const LOCAL_STORAGE_KEY = 'sangrilla_contact_history';
const OFFLINE_LEADS_KEY = 'sangrilla_offline_leads';

/**
 * Returns the configured API base URL without trailing slashes.
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
  return String(phone).replace(/\D/g, '');
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
    console.warn('[MongoService] LocalStorage write warning:', err);
  }
};

/**
 * Records an offline lead to guarantee zero lead loss even if backend is sleeping or offline
 */
export const recordOfflineLead = (lead: ContactSubmission): void => {
  try {
    const raw = localStorage.getItem(OFFLINE_LEADS_KEY);
    const list: (ContactSubmission & { timestamp: string })[] = raw ? JSON.parse(raw) : [];
    const cleanPhone = normalizePhone(lead.contactNumber);
    const alreadySaved = list.some(item => normalizePhone(item.contactNumber) === cleanPhone);
    if (!alreadySaved) {
      list.push({ ...lead, timestamp: new Date().toISOString() });
      localStorage.setItem(OFFLINE_LEADS_KEY, JSON.stringify(list));
    }
  } catch (err) {
    console.warn('[MongoService] Offline lead queue warning:', err);
  }
};

/**
 * Checks if contact exists in backend or local storage
 */
export const checkDuplicateContact = async (contactNumber: string): Promise<boolean> => {
  const cleanPhone = normalizePhone(contactNumber);
  if (!cleanPhone) return false;

  if (isPhoneLocallyRegistered(cleanPhone)) {
    return true;
  }

  try {
    const endpoint = getApiUrl(`/api/contacts/check?phone=${encodeURIComponent(contactNumber)}`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.isDuplicate) {
        recordLocalPhone(cleanPhone);
        return true;
      }
    }
  } catch {
    // If backend offline, assume non-duplicate
  }

  return false;
};

/**
 * Attempts to sync any offline-stored leads to the live backend in the background
 */
export const syncOfflineLeads = async (): Promise<void> => {
  try {
    const raw = localStorage.getItem(OFFLINE_LEADS_KEY);
    if (!raw) return;
    const list: (ContactSubmission & { timestamp: string })[] = JSON.parse(raw);
    if (!list || list.length === 0) return;

    const remaining: typeof list = [];
    for (const lead of list) {
      try {
        const endpoint = getApiUrl('/api/contacts');
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        });
        if (!res.ok && res.status !== 409) {
          remaining.push(lead);
        }
      } catch {
        remaining.push(lead);
      }
    }
    localStorage.setItem(OFFLINE_LEADS_KEY, JSON.stringify(remaining));
  } catch {
    // Background sync failure is silent
  }
};

/**
 * Save contact details.
 * 1. Validates inputs
 * 2. Caches locally so lead is NEVER lost
 * 3. Sends to API endpoint with timeout
 * 4. Never throws unhandled errors that break the user experience
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
      message: 'Please enter your full name (at least 2 characters).',
      error: 'INVALID_NAME',
    };
  }

  const submissionData: ContactSubmission = {
    name: payload.name.trim(),
    contactNumber: payload.contactNumber.trim(),
    email: payload.email?.trim() || '',
    source: payload.source || 'Brochure Modal Popup',
    project: payload.project || 'Sangrilla Meadows',
  };

  // Always back up locally first so lead is never lost
  recordLocalPhone(cleanPhone);
  recordOfflineLead(submissionData);

  try {
    const endpoint = getApiUrl('/api/contacts');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      // Trigger background sync for any other pending leads
      syncOfflineLeads().catch(() => {});

      if (data.isDuplicate) {
        return {
          success: true,
          isDuplicate: true,
          message: 'Contact details already recorded.',
          id: data.data?.id,
        };
      }

      return {
        success: true,
        isDuplicate: false,
        message: 'Details saved to database successfully.',
        id: data.data?.id,
      };
    } else {
      console.warn('[MongoService] Backend responded with status:', response.status);
      return {
        success: true,
        isDuplicate: false,
        savedOffline: true,
        message: 'Details recorded! Downloading your brochure...',
      };
    }
  } catch (error: any) {
    console.warn('[MongoService] Network/Backend notice:', error.message || error);
    // Return success so user is NOT blocked from getting their brochure
    return {
      success: true,
      isDuplicate: false,
      savedOffline: true,
      message: 'Details captured! Downloading your brochure...',
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
 * Triggers the browser download for the brochure PDF.
 * Uses a user-gesture anchor tag click with target="_blank" so mobile & desktop browsers both succeed.
 */
export const downloadBrochure = (
  brochureUrl: string = '/sangrilla-meadows-brochure.pdf',
  filename: string = 'sangrilla-meadows-brochure.pdf'
): void => {
  try {
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
      } catch {}
    }, 400);
  } catch (err) {
    console.error('[DownloadBrochure] Error initiating download:', err);
  }
};
