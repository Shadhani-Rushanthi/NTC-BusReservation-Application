import React, { useState } from "react";
import apiClient from "../../services/api";
import "./AdminStyles.css";
import { busOperatorStatus } from "../../publicEnum";

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState(""); // Tracks the current view
  const [routeForm, setRouteForm] = useState({ routeId: "", routeStart: "", routeEnd: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (endpoint, currentView) => {
    setLoading(true);
    setView(currentView);
    try {
      const { data } = await apiClient.get(endpoint);
      setData(data);
      setMessage("");
      setError("");
    } catch (err) {
      setError(err.response?.data || "Failed to fetch data.");
      setMessage("");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id, status, isBusOperator = true, busNo = null) => {
    setLoading(true);
    try {
      const endpoint = isBusOperator
        ? `/admin/ApproveOrRejectBusOperator/${id}/${status}`
        : `/admin/ApproveOrRejectBusDetails/${id}/${busNo}/${status}`;
      const { data } = await apiClient.post(endpoint);
      setMessage(data.message || `Action ${status} successful.`);
      setError("");
      // Reload the respective list
      fetchData(
        isBusOperator ? "/admin/GetPendingBusOperators" : "/admin/getBusDetailsForApproval",
        isBusOperator ? "pendingOperators" : "pendingBusDetails"
      );
    } catch (err) {
      setError(err.response?.data || "Action failed.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleRouteSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await apiClient.post("/admin/addBusRoutes", routeForm);
      setMessage(data || "Route added successfully!");
      setError("");
      setRouteForm({ routeId: "", routeStart: "", routeEnd: "" });
    } catch (err) {
      setError(err.response?.data || "Failed to add route.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-actions">
        <button onClick={() => fetchData("/admin/GetPendingBusOperators", "pendingOperators")}>
          View Pending Operators
        </button>
        <button onClick={() => fetchData("/admin/getBusDetailsForApproval", "pendingBusDetails")}>
          View Pending Bus Details
        </button>
        <button onClick={() => fetchData("/admin/ViewRegisteredBusOperators", "registeredOperators")}>
          View Registered Operators
        </button>
        <button onClick={() => fetchData("/admin/ViewRejectedBusOperators", "rejectedOperators")}>
          View Rejected Operators
        </button>
        <button onClick={() => setView("addBusRoute")}>Add Bus Route</button>
      </div>

      {view === "addBusRoute" && (
        <form className="route-form" onSubmit={handleRouteSubmit}>
          <h2>Add Bus Route</h2>
          <input
            type="text"
            placeholder="Route ID"
            value={routeForm.routeId}
            onChange={(e) => setRouteForm({ ...routeForm, routeId: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Route Start"
            value={routeForm.routeStart}
            onChange={(e) => setRouteForm({ ...routeForm, routeStart: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Route End"
            value={routeForm.routeEnd}
            onChange={(e) => setRouteForm({ ...routeForm, routeEnd: e.target.value })}
            required
          />
          <button type="submit" className="submit-button">
            Add Route
          </button>
        </form>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      {view && data.length > 0 && (
        <div className="admin-data">
          <h2>{view === "pendingOperators" ? "Pending Operators" : "Pending Bus Details"}</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {Object.entries(item).map(([key, value]) => (
                    <td key={key}>{key === "busDetails" ? JSON.stringify(value) : value}</td>
                  ))}
                  <td>
                    <button
                      className="approve-button"
                      onClick={() =>
                        handleApproval(item._id, busOperatorStatus.Approved, view === "pendingOperators", item.busNo)
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="reject-button"
                      onClick={() =>
                        handleApproval(item._id, busOperatorStatus.Rejected , view === "pendingOperators", item.busNo)
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
