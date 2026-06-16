import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001/api";

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  sendMagicLink: (email: string, name?: string) => Promise<void>;
  finishMagicLinkSignIn: () => Promise<string | null>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sendMagicLink = async (email: string, name?: string) => {
    localStorage.setItem("emailForSignIn", email);
    if (name) {
      localStorage.setItem("nameForSignIn", name);
    }

    const res = await fetch(`${API_BASE}/auth/send-magic-link`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      localStorage.removeItem("emailForSignIn");
      localStorage.removeItem("nameForSignIn");
      throw new Error(data.error || "Failed to send magic link");
    }
  };

  const finishMagicLinkSignIn = async (): Promise<string | null> => {
    const email = localStorage.getItem("emailForSignIn");
    const name = localStorage.getItem("nameForSignIn");

    if (!email) {
      throw new Error("No email found. Please try signing in again.");
    }

    const result = await signInWithEmailLink(auth, email, window.location.href);
    localStorage.removeItem("emailForSignIn");

    if (name) {
      await updateProfile(result.user, { displayName: name });
      localStorage.removeItem("nameForSignIn");
    }

    return name;
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const getToken = async (): Promise<string | null> => {
    if (!user) return null;
    return await user.getIdToken();
  };

  const value: AuthContextType = {
    user,
    loading,
    sendMagicLink,
    finishMagicLinkSignIn,
    loginWithGoogle,
    logout,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
