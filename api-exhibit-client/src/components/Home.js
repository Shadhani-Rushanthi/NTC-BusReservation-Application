import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Bus Reservation System</h1>
      <nav>
        <ul>
          <li>
            <Link to="/auth">Auth Endpoints</Link>
          </li>
          <li>
            <Link to="/admin">Admin Endpoints</Link>
          </li>
          <li>
            <Link to="/busOperator">Bus Operator Endpoints</Link>
          </li>
          <li>
            <Link to="/commuter">Commuter Endpoints</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
