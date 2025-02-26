import { useState, useEffect } from "react";
import axios from "axios";

export default function LeaveList() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/leave-requests")
      .then(response => setLeaves(response.data))
      .catch(error => console.error("Erreur lors de la récupération des congés :", error));
  }, []);

  return (
    <div>
      <h2>Demandes de congé</h2>
      <ul>
        {leaves.map((leave) => (
          <li key={leave.id}>
            Employé {leave.employeeId} - Du {leave.startDate} au {leave.endDate} - Statut: {leave.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
