import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/homePage/homePage";
import ExchangePage from "../pages/exchange/exchange";
import SingleExchange from "../pages/singleExchange/singleExchange";
import SingleCoin from "../pages/singleCoin/singleCoin";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/exchanges" element = {<ExchangePage/>}/>
      <Route path="/exchanges/:coinName" element = {<SingleExchange/>}/>
      <Route path="/assets/:coinName" element = {<SingleCoin/>}/>
    </Routes>
  )
     
  }