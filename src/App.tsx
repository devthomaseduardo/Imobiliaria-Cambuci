import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import LandingPage from "./pages/LandingPage";
import ExplorePage from "./pages/ExplorePage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import SavedPropertiesPage from "./pages/SavedPropertiesPage";
import FinancingPage from "./pages/FinancingPage";
import LegalPage from "./pages/LegalPage";
import { PropertyProvider } from "./context/PropertyContext";
import { properties } from "./data/properties";

function App() {
  return (
    <PropertyProvider>
      <Suspense fallback={<p>Loading...</p>}>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route
            path="/property/:id"
            element={<PropertyDetailPage properties={properties} />}
          />
          <Route path="/saved" element={<SavedPropertiesPage />} />
          <Route path="/financing" element={<FinancingPage />} />
          <Route path="/terms" element={<LegalPage title="Termos de Uso" type="terms" />} />
          <Route path="/privacy" element={<LegalPage title="Política de Privacidade" type="privacy" />} />
          <Route path="/lgpd" element={<LegalPage title="Segurança & LGPD" type="lgpd" />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={<div />} />
          )}
        </Routes>
      </Suspense>
    </PropertyProvider>
  );
}

export default App;
