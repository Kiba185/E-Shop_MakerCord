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

const normalizeUser = (user) => ({
  ...user,
  id: Number(user.id),
  firstName: user.firstName?.trim() ?? "",
  lastName: user.lastName?.trim() ?? "",
  email: user.email?.trim().toLowerCase() ?? "",
  phone: user.phone?.trim() ?? "",
  password: user.password ?? "",
  isAdmin: Boolean(user.isAdmin),
});

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const stored = readStorageJSON(USERS_STORAGE_KEY, null);
    return (stored || seedUsers).map(normalizeUser);
  });
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
    const user = users.find(
      (item) => item.email.toLowerCase() === normalizedEmail && item.password === password
    );

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
      phone: payload.phone?.trim() ?? "",
      password: payload.password,
      isAdmin: false,
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

  const saveUser = (payload) => {
    const editedUser = normalizeUser(payload);

    if (!editedUser.firstName || !editedUser.lastName || !editedUser.email || !editedUser.password) {
      return { ok: false, message: "Vyplňte jméno, příjmení, e-mail a heslo." };
    }

    const emailTaken = users.some(
      (item) => item.id !== editedUser.id && item.email.toLowerCase() === editedUser.email
    );

    if (emailTaken) {
      return { ok: false, message: "Tento e-mail už používá jiný účet." };
    }

    if (editedUser.id) {
      setUsers((prev) => prev.map((item) => (item.id === editedUser.id ? editedUser : item)));
      if (currentUser?.id === editedUser.id) {
        setCurrentUser(editedUser);
      }
      return { ok: true };
    }

    setUsers((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((item) => item.id)) + 1 : 1;
      return [...prev, { ...editedUser, id: nextId }];
    });
    return { ok: true };
  };

  const deleteUser = (id) => {
    if (currentUser?.id === id) {
      return { ok: false, message: "Aktuálně přihlášený účet nelze smazat." };
    }

    setUsers((prev) => prev.filter((item) => item.id !== id));
    return { ok: true };
  };

  const value = {
    users,
    currentUser,
    user: currentUser,
    isLoggedIn: Boolean(currentUser),
    login,
    register,
    updateProfile,
    saveUser,
    deleteUser,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
};
