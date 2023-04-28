import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Monitoring from "./Monitoring.js";
import Update from "./Update.js";

export default function App() {
  return (
    <>
      <div>
        <h1>Hello StackBlitz!</h1>
        <p>Start editing to see some magic happen :)</p>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
