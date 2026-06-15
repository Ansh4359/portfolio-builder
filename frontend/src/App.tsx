import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import FormPage from "./pages/FormPage";
import TemplatePage from "./pages/TemplatePage";
import DeployPage from "./pages/DeployPage";
import LoginPage from "./pages/LoginPage";
import { emptyPortfolio } from "./types";
import type { PortfolioData } from "./types";

function App() {
  const [data, setData] = useState<PortfolioData>(emptyPortfolio());
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [subdomain, setSubdomain] = useState("");

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
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
    </AuthProvider>
  );
}

export default App;
