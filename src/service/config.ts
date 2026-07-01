export const CONFIG_KEYS = {
  ANTHROPIC_API_KEY: 'anthropic_api_key',
  OPENSANCTIONS_API_KEY: 'opensanctions_api_key',
};

export const setApiKey = (key: string, value: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

export const getApiKey = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    const localValue = localStorage.getItem(key);
    if (localValue) return localValue;
  }

  if (key === CONFIG_KEYS.ANTHROPIC_API_KEY) {
    return import.meta.env.VITE_ANTHROPIC_API_KEY || null;
  }
  if (key === CONFIG_KEYS.OPENSANCTIONS_API_KEY) {
    return import.meta.env.VITE_OPENSANCTION_API_TOKEN || null;
  }

  return null;
};

export const hasRequiredKeys = (): boolean => {
  return !!getApiKey(CONFIG_KEYS.ANTHROPIC_API_KEY);
};

export const clearApiKeys = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CONFIG_KEYS.ANTHROPIC_API_KEY);
    localStorage.removeItem(CONFIG_KEYS.OPENSANCTIONS_API_KEY);
  }
};
