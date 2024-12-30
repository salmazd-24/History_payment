import pb from "../services/pocketbaseservice";

export const login = async (email, password) => {
  try {
    const authData = await pb.collection("users").authWithPassword(email, password);
    return authData;
  } catch (error) {
    throw new Error("Login gagal: " + error.message);
  }
};

export const logout = async () => {
  pb.authStore.clear();
};

export const isAuthenticated = () => {
  return pb.authStore.isValid;
};
