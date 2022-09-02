import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./components/App";

const rootElement = document.getElementById("root");

if (rootElement != null) {
    ReactDOM.createRoot(rootElement).render(
        <BrowserRouter>
            <Routes>
                <Route index element={<App />} />
            </Routes>
        </BrowserRouter>
    );
}
