import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import LeaveRequests from "./components/LeaveRequests";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/leaves" /> : <Login setToken={setToken} setUser={setUser} />} />
        <Route path="/leaves" element={token ? <LeaveRequests token={token} user={user} setToken={setToken} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
