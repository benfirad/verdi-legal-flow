const AUTH_STORAGE_KEY = 'verdi_auth_user';

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

const readUser = () => {
  try {
    const saved = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const writeUser = (user) => {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
};

const createUser = (email) => ({
  id: `local-${Date.now()}`,
  email,
  name: email.split('@')[0],
  role: 'user',
});

export const localClient = {
  auth: {
    async me() {
      const user = readUser();
      if (!user) {
        throw new Error('Not signed in');
      }
      return user;
    },
    async loginViaEmailPassword(email) {
      await delay();
      const user = createUser(email);
      writeUser(user);
      return user;
    },
    async register({ email }) {
      await delay();
      return { email, requiresVerification: false };
    },
    async verifyOtp({ email }) {
      await delay();
      const user = createUser(email);
      writeUser(user);
      return { access_token: 'local-session', user };
    },
    setToken() {
      return true;
    },
    async resendOtp() {
      await delay(200);
      return true;
    },
    async resetPasswordRequest() {
      await delay();
      return true;
    },
    async resetPassword() {
      await delay();
      return true;
    },
    loginWithProvider() {
      const user = createUser('demo@verdihukuk.com');
      writeUser(user);
      window.location.href = '/';
    },
    logout(redirectTo) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      if (redirectTo) {
        window.location.href = redirectTo;
      }
    },
    redirectToLogin() {
      window.location.href = '/login';
    },
  },
  functions: {
    async invoke(name, payload) {
      await delay();
      console.info(`Local function handled: ${name}`, payload);
      return { ok: true };
    },
  },
  integrations: {
    Core: {
      async UploadFile({ file }) {
        await delay();
        return { file_url: file?.name ? `local-upload://${file.name}` : '' };
      },
      async SendEmail(payload) {
        await delay();
        console.info('Local email captured', payload);
        return { ok: true };
      },
    },
  },
};
