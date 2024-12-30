import { useEffect } from "react";
import { login, isAuthenticated } from "@/services/auth";

useEffect(() => {
  const authenticateUser = async () => {
    if (!isAuthenticated()) {
      try {
        await login("email@example.com", "password123"); // Ganti dengan kredensial pengguna
      } catch (error) {
        console.error("Autentikasi gagal:", error.message);
      }
    }
  };

  authenticateUser();
}, []);
