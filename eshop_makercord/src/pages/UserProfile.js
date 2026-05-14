import React, { useEffect, useMemo, useState } from "react";
import PageHeading from "../components/PageHeading/PageHeading";
import { useUser } from "../context/UserContext";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import "./UserProfile.css";

const passwordRules = [
  "Alespoň 8 znaků",
  "Alespoň jedno velké písmeno",
  "Alespoň jedno malé písmeno",
  "Alespoň jedno číslo",
  "Alespoň jeden speciální znak",
];

const emptyRegisterForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const emptyLoginForm = {
  email: "",
  password: "",
};

const UserProfile = () => {
  const { currentUser, isLoggedIn, login, register, updateProfile, logout } = useUser();
  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState(emptyLoginForm);
  const [registerForm, setRegisterForm] = useState(emptyRegisterForm);
  const [message, setMessage] = useState(null);
  const [visiblePasswordField, setVisiblePasswordField] = useState(null);

  const [profileForm, setProfileForm] = useState(() => ({
    firstName: currentUser?.firstName ?? "",
    lastName: currentUser?.lastName ?? "",
    email: currentUser?.email ?? "",
    phone: currentUser?.phone ?? "",
    password: currentUser?.password ?? "",
  }));

  useEffect(() => {
    if (!currentUser) return;

    setProfileForm({
      firstName: currentUser.firstName ?? "",
      lastName: currentUser.lastName ?? "",
      email: currentUser.email ?? "",
      phone: currentUser.phone ?? "",
      password: currentUser.password ?? "",
    });
  }, [currentUser]);

  useEffect(() => {
    if (message?.type === "success") {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const passwordChecks = useMemo(() => {
    const password = registerForm.password;
    return {
      length: password.length >= 8,
      uppercase: /[A-ZÁ-Ž]/.test(password),
      lowercase: /[a-zá-ž]/.test(password),
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
  }, [registerForm.password]);

  const isRegisterPasswordValid = Object.values(passwordChecks).every(Boolean);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const showPassword = (fieldName) => setVisiblePasswordField(fieldName);
  const hidePassword = () => setVisiblePasswordField(null);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const result = login(loginForm.email, loginForm.password);

    if (!result.ok) {
      setMessage({ type: "error", text: result.message });
      return;
    }

    setMessage({ type: "success", text: "Přihlášení proběhlo úspěšně." });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (!isRegisterPasswordValid) {
      setMessage({ type: "error", text: "Heslo nesplňuje zadaná kritéria." });
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword && registerForm.confirmPassword !== "") {
      setMessage({ type: "error", text: "Hesla se neshodují." });
      return;
    }

    if (registerForm.confirmPassword === "") {
      setMessage({ type: "error", text: "Musíte potvrdit heslo." });
      return;
    }

    const result = register(registerForm);
    if (!result.ok) {
      setMessage({ type: "error", text: result.message });
      return;
    }

    setProfileForm({
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      email: registerForm.email,
      phone: registerForm.phone,
      password: registerForm.password,
    });
    setMessage({ type: "success", text: "Registrace byla dokončena a účet je přihlášen." });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const result = updateProfile(profileForm);

    if (!result?.ok) {
      setMessage({ type: "error", text: result?.message ?? "Údaje se nepodařilo uložit." });
      return;
    }

    setMessage({ type: "success", text: "Profil byl úspěšně upraven." });
  };

  if (isLoggedIn && currentUser) {
    return (
      <main className="user-profile-page">
        <PageHeading>Můj profil</PageHeading>
        <section className="user-profile-shell">
          <div className="user-profile-intro">
            <p className="user-profile-kicker">Přihlášený uživatel</p>
            <h2>{currentUser.firstName} {currentUser.lastName}</h2>
            <p>Spravujte své kontaktní údaje a nastavení účtu na jednom místě.</p>
          </div>

          <form className="user-profile-form" onSubmit={handleProfileSubmit}>
            <div className="user-profile-grid">
              <input
                type="text"
                name="firstName"
                placeholder="Jméno"
                value={profileForm.firstName}
                onChange={handleProfileChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Příjmení"
                value={profileForm.lastName}
                onChange={handleProfileChange}
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={profileForm.email}
                onChange={handleProfileChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Telefonní číslo"
                value={profileForm.phone}
                onChange={handleProfileChange}
              />
              <div className="password-field full-width">
                <input
                  className="full-width"
                  type={visiblePasswordField === "profilePassword" ? "text" : "password"}
                  name="password"
                  placeholder="Upravit heslo"
                  value={profileForm.password}
                  onChange={handleProfileChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onMouseDown={() => showPassword("profilePassword")}
                  onMouseUp={hidePassword}
                  onMouseLeave={hidePassword}
                  onTouchStart={() => showPassword("profilePassword")}
                  onTouchEnd={hidePassword}
                  aria-label="Zobrazit heslo"
                >
                  {visiblePasswordField === "profilePassword" ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
            </div>

            {message && <div className={`user-profile-message ${message.type}`}>{message.text}</div>}

            <div className="user-profile-actions">
              <button type="submit" className="primary-action">Uložit změny</button>
              {currentUser.isAdmin && (
                <a href="/admin" className="admin-link">
                  <button type="button" className="secondary-action">Admin panel</button>
                </a>
              )}
              <button type="button" className="secondary-action" onClick={logout}>Odhlásit se</button>
            </div>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="user-profile-page">
      <PageHeading>Uživatelský profil</PageHeading>
      <section className="user-profile-shell auth-shell">
        <div className="user-profile-intro">
          <p className="user-profile-kicker">Účet zákazníka</p>
          <h2>Přihlášení a registrace</h2>
          <p>Přihlaste se svým e-mailem a heslem, nebo si vytvořte nový účet.</p>
        </div>

        <div className="auth-toggle">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Přihlášení
          </button>
          <button
            type="button"
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            Registrace
          </button>
        </div>

        {mode === "login" ? (
          <form className="user-profile-form" onSubmit={handleLoginSubmit}>
            <div className="user-profile-grid">
              <input
                className="full-width"
                type="email"
                name="email"
                placeholder="E-mail"
                value={loginForm.email}
                onChange={handleLoginChange}
              />
              <div className="password-field full-width">
                <input
                  className="full-width"
                  type={visiblePasswordField === "loginPassword" ? "text" : "password"}
                  name="password"
                  placeholder="Heslo"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onMouseDown={() => showPassword("loginPassword")}
                  onMouseUp={hidePassword}
                  onMouseLeave={hidePassword}
                  onTouchStart={() => showPassword("loginPassword")}
                  onTouchEnd={hidePassword}
                  aria-label="Zobrazit heslo"
                >
                  {visiblePasswordField === "loginPassword" ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
            </div>

            {message && <div className={`user-profile-message ${message.type}`}>{message.text}</div>}

            <div className="user-profile-actions">
              <button type="submit" className="primary-action">Přihlásit se</button>
            </div>
          </form>
        ) : (
          <form className="user-profile-form" onSubmit={handleRegisterSubmit}>
            <div className="user-profile-grid">
              <input
                type="text"
                name="firstName"
                placeholder="Jméno"
                value={registerForm.firstName}
                onChange={handleRegisterChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Příjmení"
                value={registerForm.lastName}
                onChange={handleRegisterChange}
              />
              <input
                className="full-width"
                type="email"
                name="email"
                placeholder="E-mail"
                value={registerForm.email}
                onChange={handleRegisterChange}
              />
              <input
                className="full-width"
                type="tel"
                name="phone"
                placeholder="Telefonní číslo (nepovinné)"
                value={registerForm.phone}
                onChange={handleRegisterChange}
              />
              <div className="password-field full-width">
                <input
                  className="full-width"
                  type={visiblePasswordField === "registerPassword" ? "text" : "password"}
                  name="password"
                  placeholder="Vytvořte heslo"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onMouseDown={() => showPassword("registerPassword")}
                  onMouseUp={hidePassword}
                  onMouseLeave={hidePassword}
                  onTouchStart={() => showPassword("registerPassword")}
                  onTouchEnd={hidePassword}
                  aria-label="Zobrazit heslo"
                >
                  {visiblePasswordField === "registerPassword" ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
              <div className="password-field full-width">
                <input
                  className="full-width"
                  type={visiblePasswordField === "registerConfirmPassword" ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Potvrďte heslo"
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onMouseDown={() => showPassword("registerConfirmPassword")}
                  onMouseUp={hidePassword}
                  onMouseLeave={hidePassword}
                  onTouchStart={() => showPassword("registerConfirmPassword")}
                  onTouchEnd={hidePassword}
                  aria-label="Zobrazit heslo"
                >
                  {visiblePasswordField === "registerConfirmPassword" ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
            </div>

            <div className="password-rules">
              <h3>Požadavky na heslo</h3>
              <ul>
                <li className={passwordChecks.length ? "valid" : ""}>{passwordRules[0]}</li>
                <li className={passwordChecks.uppercase ? "valid" : ""}>{passwordRules[1]}</li>
                <li className={passwordChecks.lowercase ? "valid" : ""}>{passwordRules[2]}</li>
                <li className={passwordChecks.number ? "valid" : ""}>{passwordRules[3]}</li>
                <li className={passwordChecks.special ? "valid" : ""}>{passwordRules[4]}</li>
              </ul>
            </div>

            {message && <div className={`user-profile-message ${message.type}`}>{message.text}</div>}

            <div className="user-profile-actions">
              <button type="submit" className="primary-action">Vytvořit účet</button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
};

export default UserProfile;
