import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function readAuthState() {
  try {
    const storedUsers = localStorage.getItem("users");
    const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
    const storedSession = localStorage.getItem("user");
    const session = storedSession ? JSON.parse(storedSession) : null;

    if (!Array.isArray(parsedUsers)) {
      throw new Error("Saved account data has an invalid format.");
    }

    const users = [...parsedUsers];
    if (
      session?.email &&
      session?.password &&
      !users.some(
        (account) => account.email.toLowerCase() === session.email.toLowerCase(),
      )
    ) {
      users.push(session);
    }

    return {
      users,
      user: session ? { id: session.id, name: session.name, email: session.email } : null,
      error: "",
    };
  } catch (error) {
    console.error("Failed to load local account data:", error);
    return {
      users: [],
      user: null,
      error: "Saved account data could not be loaded. Please check your browser storage.",
    };
  }
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(readAuthState);

  const register = (email, password, name) => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();

    if (!normalizedName || !normalizedEmail || password.length < 8) {
      return {
        success: false,
        message: "Enter your name, a valid email, and a password with at least 8 characters.",
      };
    }

    if (authState.users.some((account) => account.email.toLowerCase() === normalizedEmail)) {
      return { success: false, message: "An account with this email already exists." };
    }

    const account = {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
      name: normalizedName,
      email: normalizedEmail,
      password,
    };
    const users = [...authState.users, account];
    const user = { id: account.id, name: account.name, email: account.email };

    try {
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(user));
      setAuthState({ users, user, error: "" });
      return { success: true };
    } catch (error) {
      console.error("Failed to save the new account:", error);
      return {
        success: false,
        message: "Your account could not be saved in this browser. Check available storage and try again.",
      };
    }
  };

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const account = authState.users.find(
      (candidate) =>
        candidate.email.toLowerCase() === normalizedEmail &&
        candidate.password === password,
    );

    if (!account) {
      return { success: false, message: "The email or password is incorrect." };
    }

    const user = { id: account.id, name: account.name, email: account.email };
    try {
      localStorage.setItem("users", JSON.stringify(authState.users));
      localStorage.setItem("user", JSON.stringify(user));
      setAuthState({ ...authState, user, error: "" });
      return { success: true };
    } catch (error) {
      console.error("Failed to save the sign-in session:", error);
      return {
        success: false,
        message: "Your sign-in session could not be saved. Check browser storage and try again.",
      };
    }
  };

  const logout = () => {
    try {
      localStorage.setItem("users", JSON.stringify(authState.users));
      localStorage.removeItem("user");
      setAuthState({ ...authState, user: null, error: "" });
      return { success: true };
    } catch (error) {
      console.error("Failed to clear the sign-in session:", error);
      setAuthState({
        ...authState,
        user: null,
        error: "Could not clear the saved sign-in session from browser storage.",
      });
      return { success: false };
    }
  };

  const updateProfile = (name, email) => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedName || !normalizedEmail) {
      return { success: false, message: "Name and email are required." };
    }

    if (
      authState.users.some(
        (account) =>
          account.email.toLowerCase() === normalizedEmail &&
          account.email.toLowerCase() !== authState.user?.email.toLowerCase(),
      )
    ) {
      return { success: false, message: "An account with this email already exists." };
    }

    const users = authState.users.map((account) =>
      account.id === authState.user?.id ||
      account.email.toLowerCase() === authState.user?.email.toLowerCase()
        ? { ...account, name: normalizedName, email: normalizedEmail }
        : account,
    );
    const user = { ...authState.user, name: normalizedName, email: normalizedEmail };

    try {
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(user));
      setAuthState({ ...authState, users, user, error: "" });
      return { success: true };
    } catch (error) {
      console.error("Failed to save profile changes:", error);
      return { success: false, message: "Profile changes could not be saved in browser storage." };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        authError: authState.error,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
