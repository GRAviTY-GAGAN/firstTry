import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmployeeCalendar from "../../SmallComponents/EmployeeCalendar";
import EmployeeDailyUpdate from "../../SmallComponents/EmployeeDailyUpdate";

import { Progress, Tooltip, Modal, Input, notification } from "antd";
import { FcClock } from "react-icons/fc";
import { TiTick } from "react-icons/ti";
import "./EmployeeDashboard.css";

const {TextArea} = Input;

function EmployeeDashboard() {
  const userObj = useSelector((state) => state);
  const dispatch = useDispatch();
  

  const [raiseIssueModal, setRaiseIssueModal] = useState(false);

  const handleRaiseIssue = () => {
    setRaiseIssueModal(true)
  };

  const handleOk = () => {
    setRaiseIssueModal(false);
  }

  const handleCancel = () => {
    setRaiseIssueModal(false);
  }

  const handleUpdate = () => {
    setTimeout(()=>{
      setRaiseIssueModal(false);
      notification.open({
        message: "Your Issue has been sent to the Admin!",
        icon: <TiTick style={{ fontSize: "1.5rem", color: "#4BB543" }} />,
      });
    }, 200)

  }

  const handleIssue = (text) => {
    alert(text);
  }

  return (
    <>
      <div>
        <div className="empdash">
          <div style={{ width: "55%", marginTop: "1rem" }}>
            {" "}
            <EmployeeCalendar />{" "}
          </div>
          <div style={{ display: "flex" }}>
            <Tooltip
              placement="leftTop"
              className="tooltip"
              title={
                userObj.performanceMessage?.length == 0
                  ? "No Performance Message yet"
                  : userObj.performanceMessage
              }
              color={true ? "#6075fe" : "red"}
            >
              <div className="cardstyle">
                {" "}
                Perfomance
                <div className="progress">
                  <Progress
                    type="circle"
                    percent={userObj.performanceOfPerviousMonth}
                    width={120}
                    status={
                      userObj.performanceOfPerviousMonth < 35
                        ? "exception "
                        : ""
                    }
                  />
                </div>
              </div>
            </Tooltip>

            <div>
              <div className="shift">
                <FcClock fontSize="3rem" />
                <div className="shifttext">
                  <div style={{ color: "rgb(23, 43, 77)" }}>
                    {userObj.shiftOfCurrentMonth == ""
                      ? "Not Allocated"
                      : userObj.shiftOfCurrentMonth}
                  </div>
                  <div style={{ color: "#7bd4fb" }}>4pm to 12pm</div>
                </div>

                <div className="issuebtn" onClick={handleRaiseIssue}>
                  Raise Issue
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <EmployeeDailyUpdate />
        </div>
      </div>

      <Modal
        title="This message will be sent to the admin"
        visible={raiseIssueModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="footerctn" onClick={handleUpdate}>
            {" "}
            <div className="footerbtn"> Send </div>{" "}
          </div>,
        ]}
      >
        <TextArea
          rows={5}
          placeholder="Please write down the Issue"
          maxLength={300}
          onChange={(e) => handleIssue(e.target.value)}
          minLength={60}
        />
      </Modal>
    </>
    // Add pay day in calendar
    // Employee and admin dashboard should also show todays date
  );
}

export default EmployeeDashboard;
