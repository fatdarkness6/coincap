import { Route, Routes } from "react-router-dom";
import HomePage from "../components/pages/homePage/homePage";
import React from "react";
import InsidePage from "../components/pages/insidePages/insidePage";

export function App() {
  return (

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/insidePage" element={<InsidePage/>} />
    </Routes>

  )
     
  }