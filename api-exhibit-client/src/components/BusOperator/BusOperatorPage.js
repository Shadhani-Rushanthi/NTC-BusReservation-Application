import React from "react";

const BusOperatorPage = () => {
  return (
    <div>
      <h2>Bus Operator Dashboard</h2>
      <button onClick={() => alert("Add a Bus")}>Add Buses</button>
      <button onClick={() => alert("View Bus Details")}>View Bus Details</button>
      {/* Add more buttons for other bus operator functionalities */}
    </div>
  );
};

export default BusOperatorPage;
