import { createContext, useContext, useEffect, useState } from "react";
import { users as seedUsers } from "../data";

const UserContext = createContext();
const USERS_STORAGE_KEY = "users";
const CURRENT_USER_STORAGE_KEY = "currentUser";

const readStorageJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => readStorageJSON(USERS_STORAGE_KEY, seedUsers));
  const [currentUser, setCurrentUser] = useState(() =>
    readStorageJSON(CURRENT_USER_STORAGE_KEY, null)
  );

  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {}
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
      }
    } catch (e) {}
  }, [currentUser]);

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    console.log('Login attempt:', { email, normalizedEmail, password });
    console.log('Available users:', users);
    const user = users.find(
      (item) => item.email.toLowerCase() === normalizedEmail && item.password === password
    );
    console.log('Found user:', user);

    if (!user) {
      return { ok: false, message: "Neplatný e-mail nebo heslo." };
    }

    setCurrentUser(user);
    return { ok: true };
  };

  const register = (payload) => {
    const normalizedEmail = payload.email.trim().toLowerCase();
    const exists = users.some((item) => item.email.toLowerCase() === normalizedEmail);

    if (exists) {
      return { ok: false, message: "Uživatel s tímto e-mailem už existuje." };
    }

    const newUser = {
      id: Date.now(),
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      email: normalizedEmail,
      phone: payload.phone.trim(),
      password: payload.password,
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { ok: true };
  };

  const updateProfile = (payload) => {
    if (!currentUser) return;

    const normalizedEmail = payload.email.trim().toLowerCase();
    const emailTaken = users.some(
      (item) => item.id !== currentUser.id && item.email.toLowerCase() === normalizedEmail
    );

    if (emailTaken) {
      return { ok: false, message: "Tento e-mail už používá jiný účet." };
    }

    const updatedUser = {
      ...currentUser,
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      email: normalizedEmail,
      phone: payload.phone.trim(),
      password: payload.password,
    };

    setUsers((prev) => prev.map((item) => (item.id === currentUser.id ? updatedUser : item)));
    setCurrentUser(updatedUser);
    return { ok: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    users,
    currentUser,
    isLoggedIn: Boolean(currentUser),
    login,
    register,
    updateProfile,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
};
