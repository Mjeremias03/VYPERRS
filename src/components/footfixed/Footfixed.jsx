import { Link } from "react-router-dom";

import './footfixed.css';

function Footfixed() {
  return (
    <div className="menu__fixed">
      <nav>
        <Link to="/inicio">Inicio</Link>
        <Link to="/shop">Tienda</Link>
        <Link to="/favoritos">Favoritos</Link>
      </nav>
    </div>
  );
}

export default Footfixed;