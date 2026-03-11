import Basil from 'basil.js';

const authorizedCookies = [
  '_member_session',
  'access_token',
  'browser_timezone',
  'reauth_token',
  'refresh_token',
  'token'
];

const authorizedCookiePattern = [
  '__stripe_',
  '_pk_',
  '_vis_',
  '_vwo_',
  'mp_',
  'Optanon',
  'stg_'
];

const TYPES = {
  local: 'localStorage',
  session: 'sessionStorage',
  cookie: 'cookie'
};

const basil = new Basil({
  storages: ['local', 'session', 'cookie']
});

const StorageUtils = {
  set({ key, value, type = 'local', cookieOptions = {}, useNative = false, stringify = true }) {
    const val = stringify ? JSON.stringify(value) : value;
    switch (type) {
      case 'session': {
        const options = { storages: ['session', 'local'] };
        useNative
          ? Basil.sessionStorage.set(key, val, options)
          : basil.set(key, val, options);
        break;
      }
      case 'cookie': {
        const options = { storages: ['cookie'], expireDays: 1, ...cookieOptions };
        useNative
          ? Basil.cookie.set(key, val, options)
          : basil.set(key, val, options);
        break;
      }
      case 'local':
      default: {
        useNative
          ? Basil.localStorage.set(key, val)
          : basil.set(key, val);
        break;
      }
    }
  },

  get({ key, type = 'local', useNative = false, parse = true }) {
    const value = useNative
      ? Basil[TYPES[type]].get(key)
      : basil.get(key);

    if (parse) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  },

  remove({ key, type = 'local', useNative = false }) {
    if (useNative) {
      Basil[TYPES[type]].remove(key);
    } else {
      basil.remove(key);
    }
  },

  // WARNING: This resets the entire storage for the given type (local, session, or cookie).
  // Use with caution — all keys in that storage will be permanently deleted.
  clear(type = 'local') {
    Basil[TYPES[type]].reset();
  },

  deleteUnAuthorizedCookie() {
    if (typeof document === 'undefined' || typeof document.cookie !== 'string') {
      return;
    }
    const webCookies = document.cookie.split(';');
    for (const cookie of webCookies) {
      const indexOfEqual = cookie.indexOf('=');
      const cookieName = (indexOfEqual > -1 ? cookie.substring(0, indexOfEqual) : cookie).trim();
      const isSubCookie = authorizedCookiePattern.some(
        subCookie => cookieName.includes(subCookie)
      );
      if (!authorizedCookies.includes(cookieName) && !isSubCookie) {
        this.remove({ key: cookieName, type: 'cookie', useNative: true });
      }
    }
  }
};

export default StorageUtils;