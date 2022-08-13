import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { Concentrate } from "./concerntrate/Concentrate";
import { Sidebar } from "./sidebar/Sidebar";

function AppWithRoute() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route element={<App />} index />
        <Route path="/concerntrate" element={<Concentrate />} />
        {/* <Route path="invoices" element={<Invoices />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppWithRoute;
