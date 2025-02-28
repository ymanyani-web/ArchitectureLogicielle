import React, { useEffect, useState } from "react";
import api from "../api/axios";

const LeaveRequests = ({ token, user, setToken }) => {
  const [leaves, setLeaves] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await api.get("/leave-requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeaves(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des congés", error);
      }
    };

    fetchLeaves();
  }, [token]);

  const handleCreateLeave = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await api.post(
        "/leave-request",
        { employeeId: user.id, startDate, endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLeaves([...leaves, response.data]);
      setMessage("Demande de congé créée avec succès !");
    } catch (error) {
      setMessage("Erreur lors de la création de la demande de congé.");
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(
        `/leave-requests/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLeaves(leaves.map((leave) => (leave.id === id ? { ...leave, status } : leave)));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut", error);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <div>
      <h2>Demandes de congé</h2>
      <button onClick={handleLogout}>Déconnexion</button> 

      {user.role === "user" && (
        <form onSubmit={handleCreateLeave}>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          <button type="submit">Demander un congé</button>
        </form>
      )}

      {message && <p>{message}</p>}

      <ul>
        {leaves.map((leave) => (
          <li key={leave.id}>
            {leave.startDate} - {leave.endDate} ({leave.status})
            {user.role === "admin" && leave.status === "PENDING" && (
              <>
                <button onClick={() => handleUpdateStatus(leave.id, "APPROVED")}>Accepter</button>
                <button onClick={() => handleUpdateStatus(leave.id, "REJECTED")}>Refuser</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequests;
