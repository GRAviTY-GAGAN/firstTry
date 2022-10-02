import React, { useState, useEffect } from "react";
import {
  Table,
  Tooltip,
  Space,
  Modal,
  Dropdown,
  Menu,
  Progress,
  notification,
} from "antd";
import {
  DownOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "antd/dist/antd.min.css";
import "./DashboardTableOne.css";
import TextArea from "antd/lib/input/TextArea";

const DashboardTableOne = ({ clickedBtn }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [allrequest, setAllRequest] = useState([]);
  const [getValue, setGetValue] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [scoreOne, setScoreOne] = useState(0);
  const [scoreTwo, setScoreTwo] = useState(0);
  const [scoreThree, setScoreThree] = useState(0);
  const [scoreFour, setScoreFour] = useState(0);
  const [score, setScore] = useState(0);
  const [currentEmpId, setCurrentEmpId] = useState("");
  const [performanceMessage, setPerformanceMessage] = useState("");


  const increaseScoreOne = () => {
    if (scoreOne < 10) {
      setScoreOne(scoreOne + 1);
    }
  };

  const decreaseScoreOne = () => {
    if (scoreOne > 0) {
      setScoreOne(scoreOne - 1);
    }
  };

  const increaseScoreTwo = () => {
    if (scoreTwo < 10) {
      setScoreTwo(scoreTwo + 1);
    }
  };

  const decreaseScoreTwo = () => {
    if (scoreTwo > 0) {
      setScoreTwo(scoreTwo - 1);
    }
  };

  const increaseScoreThree = () => {
    if (scoreThree < 10) {
      setScoreThree(scoreThree + 1);
    }
  };

  const decreaseScoreThree = () => {
    if (scoreThree > 0) {
      setScoreThree(scoreThree - 1);
    }
  };

  const increaseScoreFour = () => {
    if (scoreFour < 10) {
      setScoreFour(scoreFour + 1);
    }
  };

  const decreaseScoreFour = () => {
    if (scoreFour > 0) {
      setScoreFour(scoreFour - 1);
    }
  };

  const showModal = (record) => {
    console.log(record);
    setVisible(true);
    setEmployeeDetails(record);
    setCurrentEmpId(record.id);
  };

  const updateDetails = () => {
    // setEmployeeDetails({
    //   ...employeeDetails,
    //   shift: getValue,
    //   remainingLeaves: 110,
    // });
    // console.log(employeeDetails, "From Update");

    updatePerformanceMessage(performanceMessage);
    setVisible(false);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const onRadioBtnChange = (e) => {
    setGetValue(e.target.value);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "firstName",
      key: "key",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "key",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "key",
    },
    {
      title: "Performance",
      dataIndex: "performanceOfPerviousMonth",
      key: "key",
    },
    {
      title: "Shift",
      dataIndex: "leavesTakeInTheMonth",
      key: "key",
    },
  ];

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

  const getDeparatmentName = (clickedBtn) => {
    switch (clickedBtn) {
      case 1:
        return "Engineering";
      case 2:
        return "Operations";
      case 3:
        return "Accounts";
      case 4:
        return "Supply Chain";
      default:
        return "Engineering";
    }
  };

  const fetchRequest = async () => {
    setLoading(true);

    let deparatmentName = getDeparatmentName(clickedBtn);
    let response = await axios({
      method: "get",
      url: `http://localhost:5000/admin/deparatment/${deparatmentName}`,
    });
    console.log("from frontend Engineering", response.data);
    setAllRequest(response.data);
    response.status == 200 && setLoading(false);
  };
  useEffect(() => {
    fetchRequest();
  }, [clickedBtn]);

  const openNotificationWithIcon = (type, mes, des) => {
    notification[type]({
      message: mes,
      description: des,
    });
  };

  async function updatePerformanceMessage(text) {
    let responseObj = await axios({
      method: "post",
      url: `http://localhost:5000/admin/performance/${currentEmpId}`,
      data: {
        performanceMessage: text,
        performanceScore: 35,
      },
    });

    responseObj.status == 200
      ? openNotificationWithIcon(
          "success",
          "Performance Message Update",
          ` Performance Message to Employee ${currentEmpId} has been updated`
        )
      : <></>;
  }

  return (
    <div className="dtoc">
      <div>
        <Table
          loading={loading}
          style={{ padding: "5px" }}
          dataSource={allrequest}
          columns={columns}
          align={"right"}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => showModal(record),
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
          <div className="btncontainermodal">
            <div className="dbtnmodal approve" style={{width: '13rem'}}
    >
              <div  className="btntext">
                {" "}
                Update Performance{" "}
              </div>
            </div>
            <div className="dbtnmodal approve">
              <div className="btntext">
                {" "}
                Update Shift{" "}
              </div>
            </div>
          </div>,
        ]}
      >
        <div className="empdetails">
          <p id="name" className="parad">
            <strong>Name:</strong>{" "}
            <div className="blue">
              {employeeDetails.firstName + " " + employeeDetails.lastName}
            </div>
          </p>
          <p id="id" className="parad">
            <strong>ID: </strong>
            <div className="blue">{employeeDetails.id}</div>
          </p>
          <p id="department" className="parad">
            <Tooltip
              placement="leftTop"
              className="tooltip"
              title="Department And Designation"
              color={true ? "#6075fe" : "red"}
            >
              <div style={{ display: "flex", margin: "0", padding: "0" }}>
                <strong>D&D: </strong>
                <div className="blue">{employeeDetails.deparatment}</div>
              </div>
            </Tooltip>
          </p>
          <p id="phone" className="parad">
            <strong>Phone: </strong>
            <div className="blue">{employeeDetails.phoneNumber}</div>
          </p>
          <p id="address" className="parad">
            <strong>Address:</strong>
            <div className="blue">{employeeDetails.address}</div>
          </p>
          <p id="performance" className="parad">
            <strong>Performance:</strong>
            <div className="blue">
              {employeeDetails.performanceOfPerviousMonth}
            </div>
          </p>
          <p id="shift" className="parad">
            <strong>Shift:</strong>
            <div className="blue">{getValue}</div>
          </p>
        </div>

        {/* <div>
          <div className="mcontainer">
            <span className="material-symbols-outlined performanceIcon">
              insert_chart
            </span>
            <strong>Performance</strong>
          </div>
          <div className="econtainer progress">
            <div className="progressContainer">
              <p className="parad">
                <strong>Leaves Taken In Month: </strong>
                <div className="blue">{employeeDetails.leavesTakenInMonth}</div>
              </p>
              <p className="parad">
                <strong>Tasks of the Month: </strong>
                <div className="blue">{employeeDetails.tasksOfTheMonth}</div>
              </p>
              <div className="progressBar">
                {" "}
                <strong>Perfomance</strong>
                <div className="progress">
                  <Progress
                    type="circle"
                    percent={35}
                    width={120}
                    status={35 < 35 ? "exception " : ""}
                  />
                </div>
              </div>
            </div>
            <div className="progressContainer">
              <p className="parad" style={{ marignBottom: "12px" }}>
                <strong>Rate {employeeDetails.firstName}: </strong>

                <input
                  className="inputRate"
                  value={score}
                  type="number"
                  readOnly
                />
                <div className="upsdowns">
                  <button className="ups">
                    <CaretUpOutlined
                      onClick={increaseScore}
                      style={{
                        height: "1.2rem",
                        fontSize: "20px",
                        textAlign: "center",
                        color: "#6ff16f",
                        cursor: "default",
                      }}
                    />
                  </button>
                  <button className="downs">
                    <CaretDownOutlined
                      onClick={decreaseScore}
                      style={{
                        height: "1.2rem",
                        fontSize: "20px",
                        textAlign: "center",
                        color: "red",
                        cursor: "default",
                      }}
                    />
                  </button>
                </div>
              </p>

              <p className="parad">
                <strong>Tasks completed: </strong>{" "}
                <div className="blue">
                  {employeeDetails.tasksCompletedInMonth}
                </div>
              </p>
              <p style={{ marginBottom: "0" }}>
                <strong>Performance message:</strong>{" "}
                <textarea
                  className="inputMessage"
                  type="text"
                  onChange={(e) => setPerformanceMessage(e.target.value)}
                />
              </p>
            </div>
          </div>
        </div> // */}

        <div>
        <div>
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

            <div className="labelstyle">
              <label>  Message </label>
              <TextArea
                style={{
                  borderRadius: "5px",
                  padding: "0.4rem",
                  margin: '0 1rem 0 5rem',
                  maxWidth: '14rem',
                  height: '2.7rem'
                }}
                placeholder="Performance Message"
              />
              
            </div>

          </div>
        </div>
        </div>

        <div>
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
        </div>

        {/* <div>
          <div className="mcontainer">
            <span
              style={{ color: "#6075fe", marginRight: "5px" }}
              className="material-symbols-outlined"
            >
              work_history
            </span>
            <strong>Select Shift Hours</strong>
          </div>
          <div className="econtainer">
            <div>
              <div>
                {" "}
                Shift Hours :{" "}
                <input
                  className="dinput"
                  readOnly
                  type="text"
                  value={getValue}
                />
              </div>
              <br />
              <Dropdown overlay={menu}>
                <Space>
                  Select shift hours
                  <DownOutlined />
                </Space>
              </Dropdown>
            </div>
          </div>
        </div> */}
      </Modal>
    </div>
  );
};

export default DashboardTableOne;
