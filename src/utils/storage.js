const storage = {
  get(key) {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  setSession(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key)
  },
};

export default storage;
