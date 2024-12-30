import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AuthPage from "./components/Auth/AuthPage";
import AdminPage from "./components/Admin/AdminPage";
import BusOperatorPage from "./components/BusOperator/BusOperatorPage";
import CommuterPage from "./components/Commutor/CommutorPage.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/busOperator" element={<BusOperatorPage />} />
        <Route path="/commuter" element={<CommuterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
