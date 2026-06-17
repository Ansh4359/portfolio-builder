import { useState, useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileGuard from "./components/ProfileGuard";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import FormPage from "./pages/FormPage";
import TemplatePage from "./pages/TemplatePage";
import DeployPage from "./pages/DeployPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import FinishSignInPage from "./pages/FinishSignInPage";
import UnsubscribePage from "./pages/UnsubscribePage";
import AdminPage from "./pages/AdminPage";
import AdminRoute from "./components/AdminRoute";
import PricingPage from "./pages/PricingPage";
import { fetchProfile, fetchPortfolio } from "./api";
import { emptyPortfolio } from "./types";
import type { PortfolioData } from "./types";

function EditLoader({
  onLoad,
}: {
  onLoad: (data: PortfolioData, templateId: string, subdomain: string) => void;
}) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetchPortfolio(id)
      .then((p) => {
        const portfolioData: PortfolioData = {
          name: p.name,
          title: p.title,
          email: p.email,
          phone: p.phone || "",
          location: p.location || "",
          about: p.about,
          skills: p.skills,
          experience: p.experience,
          education: p.education,
          projects: p.projects,
          socials: p.socials,
        };
        onLoad(portfolioData, p.templateId, p.subdomain || "");
        navigate("/create", { replace: true });
      })
      .catch((err) => {
        setError(err.message || "Failed to load portfolio");
      });
  }, [id]);

  if (error) {
    return (
      <div className="py-6 pb-[60px] flex-1">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center py-16">
            <p className="text-error mb-4">{error}</p>
            <button
              className="border border-border-interactive text-charcoal px-5 py-2.5 rounded-sm text-base hover:opacity-80 transition-opacity"
              onClick={() => navigate("/")}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-3 border-border border-t-charcoal rounded-full animate-spin" />
    </div>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();
  const [data, setData] = useState<PortfolioData>(emptyPortfolio());
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [isEdit, setIsEdit] = useState(false);

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

  const handleEditLoad = (
    portfolioData: PortfolioData,
    templateId: string,
    portfolioSubdomain: string
  ) => {
    setData(portfolioData);
    setSelectedTemplate(templateId);
    setSubdomain(portfolioSubdomain);
    setIsEdit(true);
  };

  const handleProfileSave = (profileData: PortfolioData) => {
    setData(profileData);
  };

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
      <Route path="/finish-sign-in" element={<FinishSignInPage />} />
      <Route path="/unsubscribe" element={<UnsubscribePage />} />
      <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage onProfileSave={handleProfileSave} />
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
            <ProfileGuard data={data}>
              <TemplatePage
                data={data}
                selectedTemplate={selectedTemplate}
                subdomain={subdomain}
                onTemplateChange={setSelectedTemplate}
                onSubdomainChange={setSubdomain}
                isEdit={isEdit}
              />
            </ProfileGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/deploy"
        element={
          <ProtectedRoute>
            <ProfileGuard data={data}>
              <DeployPage
                data={data}
                selectedTemplate={selectedTemplate}
                subdomain={subdomain}
              />
            </ProfileGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/portfolio/:id/edit"
        element={
          <ProtectedRoute>
            <EditLoader onLoad={handleEditLoad} />
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
