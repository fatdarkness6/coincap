import { Route, Routes } from "react-router-dom";
import HomePage from "../components/pages/homePage/homePage";
import React from "react";
import ExchangePage from "../components/pages/exchange/exchange";
import SingleExchange from "../components/pages/singleExchange/singleExchange";
import SingleCoin from "../components/pages/singleCoin/singleCoin";

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