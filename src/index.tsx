import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./components/App";
import { GroupSelection } from "./components/group-selection/GroupSelection";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement != null) {
    ReactDOM.createRoot(rootElement).render(
        <BrowserRouter>
            <Routes>
                <Route index element={<App />} />
                <Route path="group-selection" element={<GroupSelection />} />
            </Routes>
        </BrowserRouter>
    );
}
