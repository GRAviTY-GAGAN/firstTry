import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import Logo1 from "../assests/logo1.png";
import { MdDashboard } from "react-icons/md";
import { MdWorkOff } from "react-icons/md";
import { BsNewspaper } from "react-icons/bs";
import { RiMoneyDollarBoxFill } from "react-icons/ri";

const Siderbar = () => {
  const [clickStyle, setClickStyle] = useState(1);

  return (
    <>
      <div style={{ height: "100vh",  }}>
        <aside className="sidebar">
          <div
            style={{
              diplay: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "1.4rem",
                fontWeight: "600",
                color: "#354259",
                cursor: 'default',
              }}
            >
              <img 
              alt=""
                src={Logo1}
                style={{ width: "4rem", marginLeft: "0.8rem" }}
              />
              {"  "} Office HR
            </div>
          </div>
          <div className="sidebarContainer">
            <ul style={{ marginLeft: "2px", marginTop: "0.8rem" }}>
              <Link to="/home/dashboard">
                <li
                  onClick={() => {
                    setClickStyle(1);
                  }}
                  className={`${clickStyle === 1 ? "item active" : "item "}`}
                >
                  <div className="sidebarText">
                    {" "}
                    <MdDashboard
                      style={{
                        fontSize: "1rem",
                        marginRight: "5px",
                        color: `${clickStyle === 1 ? "white" : "#A4A6B3"}`,
                      }}
                    />{" "}
                    Dashboard{" "}
                  </div>
                </li>
              </Link>

              <Link to="/home/payroll">
                <li
                  onClick={() => {
                    setClickStyle(2);
                  }}
                  className={`${clickStyle === 2 ? "item active" : "item "}`}
                >
                  <div className="sidebarText">
                    {" "}
                    <RiMoneyDollarBoxFill
                      style={{
                        fontSize: "1rem",
                        marginRight: "5px",
                        color: `${clickStyle === 2 ? "white" : "#A4A6B3"}`,
                      }}
                    />{" "}
                    Payroll Management{" "}
                  </div>
                </li>
              </Link>
              <Link to="/home/leave">
                <li
                  onClick={() => {
                    setClickStyle(3);
                  }}
                  className={`${clickStyle === 3 ? "item active" : "item "}`}
                >
                  <div className="sidebarText">
                    {" "}
                    <MdWorkOff
                      style={{
                        fontSize: "1rem",
                        marginRight: "5px",
                        color: `${clickStyle === 3 ? "white" : "#A4A6B3"}`,
                      }}
                    />{" "}
                    Leave Management{" "}
                  </div>
                </li>
              </Link>
              <Link to="/home/test">
                <li
                  onClick={() => {
                    setClickStyle(4);
                  }}
                  className={`${clickStyle === 4 ? "item active" : "item "}`}
                >
                  <div className="sidebarText">
                    {" "}
                    <BsNewspaper
                      style={{
                        fontSize: "1rem",
                        marginRight: "5px",
                        color: `${clickStyle === 4 ? "white" : "#A4A6B3"}`,
                      }}
                    />{" "}
                    Quarterly Assessment{" "}
                  </div>
                </li>
              </Link>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Siderbar;

// export const Sidebar = [
//   {
//     title: 'Payroll Management',
//     path: '/payroll',
//     cName: 'item',
//   },
//   {
//     title: 'Leave',
//     path: '/leave',
//     cName: 'item',
//   },
//   {
//     title: 'Test',
//     path: '/test',
//     cName: 'item',
//   },
//   {
//     title: 'Performance',
//     path: '/performance',
//     cName: 'item',
//   },
// ]
