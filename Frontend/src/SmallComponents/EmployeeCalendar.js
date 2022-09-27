import React, { useState, useRef } from "react";
import "./EmployeeCalendar.css";
import { Calendar, Modal } from "antd";
import "antd/dist/antd.css";

function EmployeeCalendar() {
  const [visible, setVisible] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  // const [date, setDate] = useState();
  const date = useRef('NO date selected');

  const onSelect = (datefromCalendar) => {
    // alert(datefromCalendar);
    // setDate(datefromCalendar);
    date.current = date ;
    alert(date)
    setVisible(true);
    modal.info(config);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const config = {
    title: `Schedules for ${ date.current }`,
    content: (
      <>
        <div> No Updates for now </div>
      </>
    ),
  };

  return (
    <>
      <div className="calendarmain">
        <Calendar
          fullscreen={false}
          style={{ width: "100%" }}
          onSelect={(date)=>onSelect(date)}
        />
      </div>
      {contextHolder}
    </>
  );
}

export default EmployeeCalendar;
