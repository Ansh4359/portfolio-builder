import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import FormPage from "./pages/FormPage";
import TemplatePage from "./pages/TemplatePage";
import DeployPage from "./pages/DeployPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { fetchProfile } from "./api";
import { emptyPortfolio } from "./types";
import type { PortfolioData } from "./types";

function AppRoutes() {
  const { user, loading } = useAuth();
  const [data, setData] = useState<PortfolioData>(emptyPortfolio());
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [subdomain, setSubdomain] = useState("");

  useEffect(() => {
    if (!user) return;
    fetchProfile()
      .then((profile) => {
        if (profile) {
          const hasData = profile.name || profile.title || profile.email;
          if (hasData) {
            setData(profile);
          }
        }
      })
      .catch(() => {});
  }, [user]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          loading ? (
            <div className="flex items-center justify-center min-h-screen">
              <div className="w-10 h-10 border-3 border-border border-t-charcoal rounded-full animate-spin" />
            </div>
          ) : user ? (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          ) : (
            <HomePage />
          )
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <FormPage data={data} onChange={setData} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/template"
        element={
          <ProtectedRoute>
            <TemplatePage
              data={data}
              selectedTemplate={selectedTemplate}
              subdomain={subdomain}
              onTemplateChange={setSelectedTemplate}
              onSubdomainChange={setSubdomain}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/deploy"
        element={
          <ProtectedRoute>
            <DeployPage
              data={data}
              selectedTemplate={selectedTemplate}
              subdomain={subdomain}
            />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
