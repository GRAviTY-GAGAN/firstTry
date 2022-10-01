import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiRupee } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { VscWorkspaceUntrusted } from "react-icons/vsc";
import { CgDanger } from "react-icons/cg";
import { RiFileWarningLine } from "react-icons/ri";
import "./EmployeePayroll.css";

function EmployeePayroll() {
  const userObj = useSelector((state) => state);
  console.log(userObj);

  return (
    <div className="mainstyle">
      {/* <div>
        EmployeePayroll Working days leaves taken half days task Completed last
        month sal performance your year pay monthly pay raise issue btn download
        slip option daily task detail
      </div> */}

      <div className="headingtxt">
        {" "}
        <span className="cardtxt"> Home / </span> Payroll Management{" "}
      </div>

      <div className="btnctn">
        <div className="btnpr editbtn">
          {" "}
          <span>
            {" "}
            <FaEdit
              style={{
                paddingTop: "7px",
                // color: "#5FD068",
                fontSize: "20px",
              }}
            />{" "}
          </span>{" "}
          Edit
        </div>
        <div className="btnpr raiseissuebtn ">
          <span>
            {" "}
            <VscWorkspaceUntrusted
              style={{
                paddingTop: "7px",
                fontSize: "20px",
                fontWeight: "800",
              }}
            />{" "}
          </span>
          Raise Issue{" "}
        </div>
      </div>

      <div
        className="empprstyle"
        style={{ width: "100%", border: "1px solid black" }}
      >
        <div style={{ width: "50%" }}>
          <h2>
            {" "}
            <span className="cardtxt"> Name : </span>{" "}
            {userObj.firstName + " " + userObj.lastName}
          </h2>

          <h3>
            {" "}
            <span className="cardtxt"> Department :</span> {userObj.deparatment}{" "}
          </h3>

          <div className="empprstyle">
            <div className="cardpr">
              <div className="cardtxt">Leaves ( Month )</div>
              <div className="cardamt">
                {userObj.leavesTakenInMonth}
              </div>
            </div>
            <div className="cardpr">
              <div className="cardtxt">Leaves ( Year )</div>
              <div className="cardamt">{userObj.leavesTakenInYear}</div>
            </div>
          </div>
        </div>

        <div className="" style={{ width: "50%" }}>
          <div className="paymentdetails">
            <div className="cardpr">
              <div className="cardtxt">Monthly Pay</div>
              <div className="cardamt">
                <div
                  style={{
                    paddingTop: "7px",
                    color: "#5FD068",
                    fontSize: "18px",
                  }}
                >
                  <BiRupee />
                </div>
                <div>75000/- </div>
              </div>
            </div>

            <div className="cardpr">
              <div className="cardtxt">This Month</div>
              <div className="cardamt">
                <div
                  style={{
                    paddingTop: "7px",
                    color: "#5FD068",
                    fontSize: "18px",
                    fontWeight: "800",
                  }}
                >
                  <BiRupee />
                </div>
                <div>55000/- </div>
              </div>
            </div>
          </div>

          <div className="longcardctn">
            <div className="longcardpr">
              <div className="cardtxt"> Yearly Pay </div>
              <div className="cardamt">
                <div
                  style={{
                    paddingTop: "7px",
                    color: "#5FD068",
                    fontSize: "18px",
                    fontWeight: "800",
                  }}
                >
                  <BiRupee />
                </div>
                <div>
                  {" "}
                  10LPA + 50K <span className="cardtxt">
                    {" "}
                    (Performance)
                  </span>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div> {userObj.paidLeavesRemaining} </div>
        <div> {userObj.leavesTakenInMonth} </div>
        <div> {userObj.leavesTakenInYear} </div>
        <div> {userObj.shiftOfCurrentMonth} </div>

        <div> {userObj.salaryCreditedThisMonth} </div>
        <div> {userObj.PayrollMangement.halfDayTaken} </div>
        <div> Months when salary not credited </div>
      </div>
    </div>

    // in admin payroll add monthly and yearly pay of the person
    // add avatart in the table
    // add a property to user obj of monthly & yearly pay
    // and find out the total buget(salary) of that deparatment
    // Search Options
  );
}

export default EmployeePayroll;
