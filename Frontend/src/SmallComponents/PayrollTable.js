import React, { useEffect, useState } from "react";
import { Table, Space, Modal, Button, Dropdown, Menu } from "antd";
import { GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineAttachMoney } from 'react-icons/md'
import axios from "axios";
import {
  DownOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import "./PayrollTable.css";

function PayrollTable({ clickedBtn }) {
  let Obj = [];
  const [mainData, setMainData] = useState(Obj);
  const [allrequest, setAllRequest] = useState([]);
  const [getValue, setGetValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  
  const getDepartmentName = (clickedBtn) => {
    switch (clickedBtn) {
      case 1:
        return "Engineering";
      case 2:
        return "Product";
      case 3:
        return "HR";
      case 4:
        return "Product";

      default:
        return "Engineering";
    }
  };

  const fetchRequest = async () => {
    let departmentName = getDepartmentName(clickedBtn);
    let response = await axios({
      method: "get",
      url: `https://hr-dashboard-nimish.herokuapp.com/admin/deparatment/${departmentName}`,
    });
    console.log("from payroll table", response.data);
    setAllRequest(response.data);

    response?.data.map((obj, idx) => {
      setMainData((mainData) => [
        ...mainData,
        [
          obj.id,
          obj.firstName + " " + obj.lastName,
          obj.email,
          obj.PayrollMangement?.halfDayTaken,
          obj.leavesTakenInMonth,
          obj.PayrollMangement?.salaryCreditedThisMonth == ""
            ? "Not Credited"
            : `${obj.PayrollMangement?.salaryCreditedThisMonth}`,
        ],
      ]);
    });
    console.log(mainData[0][1], "from PayrollTable maindata01");
  };

  useEffect(() => {
    setMainData([]);

    fetchRequest();
  }, [clickedBtn]);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showModal = (record, rowIndex) => {
    setVisible(true);
    setEmployeeDetails(record);
    console.log(record, "record after click");
  };

  const updateDetails = () => {
    alert("Holaaaa");
  };

  const onClick = ({ key }) => {
    setGetValue(key);
  };

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: "1st Shift",
          key: "1st Shift",
        },
        {
          label: "2nd Shift",
          key: "2nd Shift",
        },
        {
          label: "3rd Shift",
          key: "3rd Shift",
        },
        {
          label: "4th Shift",
          key: "4th Shift",
        },
      ]}
    />
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "0",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "1",
      key: "key",
    },
    {
      title: "Email",
      dataIndex: "2",
      key: "key",
    },
    {
      title: "Half Days",
      dataIndex: "3",
      key: "key",
    },
    {
      title: "Leaves Taken(Month)",
      dataIndex: "4",
      key: "key",
    },
    {
      title: "Salary Credited",
      dataIndex: "5",
      key: "key",
    },
  ];

  return (
    <div className="dtoc">
      <div>
        <Table
          style={{ padding: "5px" }}
          dataSource={mainData}
          columns={columns}
          align={"center"}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => showModal(record, rowIndex),
            };
          }}
        ></Table>
      </div>

      <Modal
        visible={visible}
        title="Employee Details"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="empdetailsmodel">
            <div onClick={updateDetails} className="updateBtn">
              {" "}
              Update{" "}
            </div>
          </div>,
        ]}
      >
        <div className="empDetails">
          <div>
            <p className="detail">
              <div>Name :</div> <div className="blue">{employeeDetails[1]}</div>
            </p>
            <p className="detail">
              <div>Employee Id : </div>
              <div className="blue">{employeeDetails[0]}</div>
            </p>
            <p className="detail">
              <div>Email : </div>
              <div className="blue">{employeeDetails[2]}</div>
            </p>
          </div>
          <div>
            <p className="detail">
              <div>Half Days Taken : </div>
              <div className="blue">{employeeDetails[3]}</div>
            </p>
            <p className="detail">
              <div>Salary Credited : </div>
              <div className="blue">{employeeDetails[5]}</div>
            </p>
            <p className="detail">
              <div>Leaves Taken In Month : </div>
              <div className="blue"> {employeeDetails[4]}</div>
            </p>
          </div>
        </div>

        {/* <div>
          <div className="pmcontainer">
            <span className="material-symbols-outlined performanceIcon">
              insert_chart
            </span>
            <strong> Performance</strong>
          </div>

          <div className="econtainer">
            <div className="labelstyle">
              <label>Communication</label>
              <input
                style={{
                  borderRadius: "5px",
                  border: "1px solid #A4A6B3",
                  outline: "none",
                  textAlign: "center",
                  padding: "0.4rem",
                  margin: '0 1rem 0 2rem'
                }}
                type="number"
                placeholder="1 - 10"
                value={scoreOne}
                readOnly
              />
              <div className="upsdownss"  >
                <button className="ups">< CaretUpOutlined onClick={increaseScoreOne} style={{ height:'1.2rem',fontSize:'20px', textAlign:'center', color:'#6ff16f', cursor: 'default' }} /></button>
                <button className="downs"><CaretDownOutlined onClick={decreaseScoreOne} style={{ height:'1.2rem' , fontSize:'20px', textAlign:'center', color:'red', cursor: 'default'}} /></button>
                </div>
            </div>

            <div className="labelstyle">
              <label style={{ display: "" }}>Leadership</label>
              
              <input
                style={{
                  borderRadius: "5px",
                  border: "1px solid #A4A6B3",
                  outline: "none",
                  textAlign: "center",
                  padding: "0.4rem",
                  margin: '0 1rem 0 4.2rem'
                }}
                type="number"
                placeholder="1 - 10"
                value={scoreTwo}
                readOnly
              />
              <div className="upsdownss"  >
                <button className="ups">< CaretUpOutlined onClick={increaseScoreTwo} style={{ height:'1.2rem',fontSize:'20px', textAlign:'center', color:'#6ff16f', cursor: 'default' }} /></button>
                <button className="downs"><CaretDownOutlined onClick={decreaseScoreTwo} style={{ height:'1.2rem' , fontSize:'20px', textAlign:'center', color:'red', cursor: 'default'}} /></button>
                </div>
                
            </div>

            <div className="labelstyle">
              <label> Helping </label>
              <input
                style={{
                  borderRadius: "5px",
                  border: "1px solid #A4A6B3",
                  outline: "none",
                  textAlign: "center",
                  padding: "0.4rem",
                  margin: '0 1rem 0 5.5rem'
                }}
                type="number"
                placeholder="1 - 10"
                value={scoreThree}
                readOnly
              />
              <div className="upsdownss"  >
                <button className="ups">< CaretUpOutlined onClick={increaseScoreThree} style={{ height:'1.2rem',fontSize:'20px', textAlign:'center', color:'#6ff16f', cursor: 'default' }} /></button>
                <button className="downs"><CaretDownOutlined onClick={decreaseScoreThree} style={{ height:'1.2rem' , fontSize:'20px', textAlign:'center', color:'red', cursor: 'default'}} /></button>
                </div>
            </div>

            <div className="labelstyle">
              <label> Others </label>
              <input
                style={{
                  borderRadius: "5px",
                  border: "1px solid #A4A6B3",
                  outline: "none",
                  textAlign: "center",
                  padding: "0.4rem",
                  margin: '0 1rem 0 6rem'
                }}
                type="number"
                placeholder="1 - 10"
                value={scoreFour}
                readOnly
              />
              <div className="upsdownss"  >
                <button className="ups">< CaretUpOutlined onClick={increaseScoreFour} style={{ height:'1.2rem',fontSize:'20px', textAlign:'center', color:'#6ff16f', cursor: 'default' }} /></button>
                <button className="downs"><CaretDownOutlined onClick={decreaseScoreFour} style={{ height:'1.2rem' , fontSize:'20px', textAlign:'center', color:'red', cursor: 'default'}} /></button>
                </div>
            </div>
          </div>
        </div> */}

        {/* <div>
          <div className="pmcontainer">
            <span className="material-symbols-outlined performanceIcon">
              work_history
            </span>
            <strong>Select Shift Hours</strong>
          </div>

          <div className="econtainer">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                aligItem: "center",
                width: "100%",
              }}
            >
              <Dropdown overlay={menu}>
                <Space style={{ fontSize: "1rem" }}>
                  Select shift hours
                  <DownOutlined />
                </Space>
              </Dropdown>
              <input
                className="inputShift"
                readOnly
                type="text"
                value={getValue}
              />
            </div>
          </div>
        </div> */}

        <div>
          <div className="pmcontainer">
            <span className="material-symbols-outlined performanceIcon">
              {/* work_history */}
              <GiPayMoney />
              {/* <GiTakeMyMoney />
            <MdOutlineAttachMoney /> */}
            </span>
            <strong> Update Salary </strong>
          </div>
          <div className="econtainer">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                aligItem: "center",
                width: "100%",
                marginTop: "0.4rem",
              }}
            >
              <span
                style={{
                  fontSize: "1.2rem",
                  marginTop: "0.3rem",
                  // color: "#A4A6B3",
                  fontWeight:'400'
                }}
              >
                Enter in Lakhs
              </span>
              <input
                placeholder="  "
                className="inputShift"
                readOnly
                type="text"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PayrollTable;
