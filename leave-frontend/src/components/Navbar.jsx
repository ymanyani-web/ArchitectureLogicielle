import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Demander un congé</Link> | 
      <Link to="/requests">Voir les demandes</Link>
    </nav>
  );
}
