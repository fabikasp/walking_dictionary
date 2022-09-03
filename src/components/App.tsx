import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./home/Home";
import { GroupSelection } from "./group-selection/GroupSelection";
import "./App.css";
 
export const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="group-selection" element={<GroupSelection />} />
        </Routes>
    </BrowserRouter>
  );
};
