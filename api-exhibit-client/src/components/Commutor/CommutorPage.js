import React from "react";

const CommuterPage = () => {
  return (
    <div>
      <h2>Commuter Dashboard</h2>
      <button onClick={() => alert("Search for Buses")}>Search Buses</button>
      <button onClick={() => alert("Reserve a Seat")}>Reserve a Seat</button>
      {/* Add more buttons for other commuter functionalities */}
    </div>
  );
};

export default CommuterPage;
