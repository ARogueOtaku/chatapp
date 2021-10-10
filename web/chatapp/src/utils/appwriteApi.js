import { Appwrite } from "appwrite";

const appwriteApi = {
  sdk: null,

  provider: () => {
    if (appwriteApi.sdk) return appwriteApi.sdk;
    const appwrite = new Appwrite();
    appwrite.setEndpoint(process.env.REACT_APP_ENDPOINT).setProject(process.env.REACT_APP_PROJECT);
    appwriteApi.sdk = appwrite;
    return appwrite;
  },

  createAccount: (email, password, name) => {
    return appwriteApi.provider().account.create(email, password, name);
  },

  getAccount: () => {
    return appwriteApi.provider().account.get();
  },

  createSession: (email, password) => {
    return appwriteApi.provider().account.createSession(email, password);
  },

  deleteCurrentSession: () => {
    return appwriteApi.provider().account.deleteSession("current");
  },

  sendVerificationEmail: () => {
    return appwriteApi.provider().account.createVerification(process.env.REACT_APP_VERIFICATION_URL);
  },

  verifyUser: (userid, secret) => {
    return appwriteApi.provider().account.updateVerification(userid, secret);
  },
};

export default appwriteApi;
