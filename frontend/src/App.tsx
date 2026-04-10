import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FormPage from "./pages/FormPage";
import TemplatePage from "./pages/TemplatePage";
import DeployPage from "./pages/DeployPage";
import { emptyPortfolio } from "./types";
import type { PortfolioData } from "./types";

function App() {
  const [data, setData] = useState<PortfolioData>(emptyPortfolio());
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [subdomain, setSubdomain] = useState("");

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<FormPage data={data} onChange={setData} />}
        />
        <Route
          path="/template"
          element={
            <TemplatePage
              data={data}
              selectedTemplate={selectedTemplate}
              subdomain={subdomain}
              onTemplateChange={setSelectedTemplate}
              onSubdomainChange={setSubdomain}
            />
          }
        />
        <Route
          path="/deploy"
          element={
            <DeployPage
              data={data}
              selectedTemplate={selectedTemplate}
              subdomain={subdomain}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
