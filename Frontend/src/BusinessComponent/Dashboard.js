import React, { useState } from "react";
import { useDataLayerValue } from "../DataLayer/DataLayer";
import EmployeeDashboard from "./Employee/EmployeeDashboard";
import "./Dashboard.css";

function Dashboard() {
  const [clickStyle, setClickStyle] = useState(1);
  const [{ employeeType }, dispatch] = useDataLayerValue();
  return (
    <>
      {employeeType == 1 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            className={` ${
              clickStyle == 1 ? "activeSection sections" : "sections"
            }`}
            onClick={() => setClickStyle(1)}
          >
            Engineering
          </div>
          <div
            className={` ${
              clickStyle == 2 ? "activeSection sections" : "sections"
            }`}
            onClick={() => setClickStyle(2)}
          >
            Operations
          </div>
          <div
            className={` ${
              clickStyle == 3 ? "activeSection sections" : "sections"
            }`}
            onClick={() => setClickStyle(3)}
          >
            Accounts
          </div>
          <div
            className={` ${
              clickStyle == 4 ? "activeSection sections" : "sections"
            }`}
            onClick={() => setClickStyle(4)}
          >
            Supply Chain
          </div>
        </div>
      ) : (
        <div>
          <EmployeeDashboard/>
        </div>
      )}
    </>
  );
}

export default Dashboard;