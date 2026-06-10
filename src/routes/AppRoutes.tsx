import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Avisos from "../pages/Avisos";
import MeusAvisos from "../pages/MeusAvisos";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/avisos" element={<Avisos />} />

      <Route path="/meus-avisos" element={<MeusAvisos />} />
    </Routes>
  );
}
