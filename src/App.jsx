import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Privew from "./components/Privew";
import Form from "./components/Form";

import Menu from "./components/Menu";
import Allinvoices from "./components/Allinvoices"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-invoice" element={<Form />} />
        <Route path="/" element={<Menu />} />
        <Route path="/Allinvoices" element={<Allinvoices />} />
        <Route path="/preview" element={<Privew />} />
      </Routes>
    </Router>
  );
};

export default App;
