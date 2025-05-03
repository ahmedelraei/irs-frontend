// Global event system for authentication state changes
const AUTH_LOGIN_EVENT = "auth:login";
const AUTH_LOGOUT_EVENT = "auth:logout";

export const authEvents = {
  // Emit login event
  emitLogin: () => {
    window.dispatchEvent(new Event(AUTH_LOGIN_EVENT));
  },

  // Emit logout event
  emitLogout: () => {
    window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
  },

  // Subscribe to login events
  onLogin: (callback: () => void) => {
    window.addEventListener(AUTH_LOGIN_EVENT, callback);

    return () => window.removeEventListener(AUTH_LOGIN_EVENT, callback);
  },

  // Subscribe to logout events
  onLogout: (callback: () => void) => {
    window.addEventListener(AUTH_LOGOUT_EVENT, callback);

    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, callback);
  },
};
