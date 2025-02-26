import { useState } from "react";
import axios from "axios";

export default function LeaveRequestForm() {
  const [employeeId, setEmployeeId] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  const submitRequest = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/leave-request", {
        employeeId,
        startDate,
        endDate,
      });

      setMessage("Demande envoyée avec succès !");
    } catch (error) {
      setMessage("Erreur : " + error.response?.data?.error || "Erreur inconnue");
    }
  };

  return (
    <div>
      <h2>Demander un congé</h2>
      <label>Employé ID:</label>
      <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />

      <label>Date de début:</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

      <label>Date de fin:</label>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

      <button onClick={submitRequest}>Envoyer</button>

      {message && <p>{message}</p>}
    </div>
  );
}
