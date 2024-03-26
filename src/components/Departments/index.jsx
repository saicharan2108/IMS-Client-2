import React from "react"
import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"
import { CgOptions } from "react-icons/cg"
import { Oval } from "react-loader-spinner"
import Tippy from "@tippyjs/react"
import { toast } from "react-hot-toast"
import Popup from "reactjs-popup"
import HomeCharts from "../HomeCharts"

import Navbar from "../Navbar"
import TaskHeader from "../TaskHeader"
import TaskForm from "../TaskForm"

import "./index.css"
import "tippy.js/dist/tippy.css"

const combinedData = [
  {
    "SL No": 1,
    "Category": "Server Room",
    "Lab Name": "-",
    "Department": "Server Room",
    "Sys Config": "-",
    "Quantity": 1,
    "Invoice No": "31/03/2018",
    "Purchase Date": "-",
    "Expiry Date": "-",
    "Unit Price": 141750,
    "Total Price": 2141750
  },
  {
    "SL No": 2,
    "Category": "Server Room",
    "Lab Name": "-",
    "Department": "Server Room",
    "Sys Config": "-",
    "Quantity": 1,
    "Invoice No": "27/06/2011",
    "Purchase Date": "-",
    "Expiry Date": "-",
    "Unit Price": 675000,
    "Total Price": 2675000
  },
  {
    "SL No": 3,
    "Category": "Desktops",
    "Lab Name": "-",
    "Department": "Desktops",
    "Sys Config": "Intel 12th Gen. Core i7 Processor, 16GB DDR4 RAM, 512GB Solid State Drive, Intel UHD Graphics 770, 19.5\" LED Monitor.",
    "Quantity": 32,
    "Invoice No": "$3700290/22-23 & 13/01/2023",
    "Purchase Date": "-",
    "Expiry Date": "-",
    "Unit Price": 59000,
    "Total Price": 1888000
  },
  {
    "SL No": 4,
    "Category": "Desktops",
    "Lab Name": "-",
    "Department": "Desktops",
    "Sys Config": "Intel 12th Gen. Core i7 Processor, 16GB DDR4 RAM, 512GB Solid State Drive, Intel UHD Graphics 770, 19.5\" LED Monitor.",
    "Quantity": 32,
    "Invoice No": "$3700290/22-23 & 13/01/2023",
    "Purchase Date": "-",
    "Expiry Date": "-",
    "Unit Price": 59000,
    "Total Price": 1888000
  },
  {
    "SL No": 5,
    "Category": "Desktops",
    "Lab Name": "-",
    "Department": "Desktops",
    "Sys Config": "Intel 12th Gen. Core i7 Processor, 16GB DDR4 RAM, 512GB Solid State Drive, Intel UHD Graphics 770, 19.5\" LED Monitor.",
    "Quantity": 39,
    "Invoice No": "$3700290/22-23 & 13/01/2023",
    "Purchase Date": "-",
    "Expiry Date": "-",
    "Unit Price": 59000,
    "Total Price": 2301000
  },
  {
    "SL No": 6,
    "Category": "Desktops",
    "Lab Name": "-",
    "Department": "Desktops",
    "Sys Config": "Intel 12th Gen. Core i7 Processor, 16GB DDR4 RAM, 512GB Solid State Drive, Intel UHD Graphics 770, 19.5\" LED Monitor.",
    "Quantity": 1,
    "Invoice No": "$3700290/22-23 & 13/01/2023",
    "Purchase Date": "-",
    "Expiry Date": "-",
    "Unit Price": 59000,
    "Total Price": 1888000
  },
  {
    "SL No": 7,
    "Category": "Desktops",
    "Lab Name": "-",
    "Department": "Desktops",
    "Sys Config": "HP PRO AMD Athlon(tm) II B.28 3.4GHz, 2GB RAM Processor",
    "Quantity": 2,
    "Invoice No": "7032 06/03/2009",
    "Purchase Date": "-",
    "Expiry Date": "-",
    "Unit Price": 29900,
    "Total Price": 59800
  },
  {
    "SL No": 8,
    "Category": "Desktops",
    "Lab Name": "-",
    "Department": "Desktops",
    "Sys Config": "Intel Core i7 7700 processor, 3.2GHz, 16GB RAM Desktops.",
    "Quantity": 1,
    "Invoice No": "VIZ-1549 29/9/2018",
    "Purchase Date": "-",
    "Expiry Date": "-",
    "Unit Price": 55500,
    "Total Price": 55500
  },
  {
    "SL No": 9,
    "Category": "Desktops",
    "Lab Name": "-",
    "Department": "Desktops",
    "Sys Config": "Intel Core i3 3210 processor, 3.4 GHz, 4GB RAM desktops.",
    "Quantity": 1,
    "Invoice No": "HO-02 29/03/2011",
    "Purchase Date": "-",
    "Expiry Date": "-",
    "Unit Price": 25850,
    "Total Price": 25850
  },
  {
    "SL No": 10,
    "Category": "Pen Tablets",
    "Lab Name": "-",
    "Department": "Pen Tablets",
    "Sys Config": "-",
    "Quantity": 4,
    "Invoice No": "HO-OUT-80 & 31/01/2022",
    "Purchase Date": "-",
    "Expiry Date": "-",
    "Unit Price": 5841,
    "Total Price": 23364
  },
  {
    "SL No": 11,
    "Category": "AC unit",
    "Lab Name": "-",
    "Department": "AC unit",
    "Sys Config": "-",
    "Quantity": 1,
    "Invoice No": "VJA2122-250 & 28/07/2021",
    "Purchase Date": "-",
    "Expiry Date": "-",
    "Unit Price": 36700,
    "Total Price": 36700
  },
  {
    "SL No": 12,
    "Category": "Mic",
    "Lab Name": "-",
    "Department": "Mic",
    "Sys Config": "-",
    "Quantity": 1,
    "Invoice No": "STV/19-20/11371",
    "Purchase Date": "-",
    "Expiry Date": "-",
    "Unit Price": 3644,
    "Total Price": 4300
  },
  {
    "SL No": 13,
    "Category": "Projectors",
    "Lab Name": "-",
    "Department": "Projectors",
    "Sys Config": "-",
    "Quantity": 6,
    "Invoice No": "CORPOUT",
    "Purchase Date": "-",
    "Expiry Date": "-",
    "Unit Price": "-",
    "Total Price":"-"}]


const Departments = () => {
  const [activeTitle, setActiveTitle] = React.useState("")
  const [activeFilters, setActiveFilters] = React.useState([])
  const [edit, toggleEdit] = React.useState(false)
  const [activeEdit, setActiveEdit] = React.useState(null)
  const [tasks, setTasks] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [btnLoad, setBtnLoad] = React.useState(false)
  const fetchTasks = React.useRef(null)
  const editRef = React.useRef(null)
  const updateRef = React.useRef(null)
  const token = Cookies.get("token")
  if (!token) {
    return <Navigate to="/login" />
  }

  const userDetails = JSON.parse(localStorage.getItem("user"))
  const { name } = userDetails

  //Update task
  const handleTaskData = async (data) => {
    setBtnLoad(true)
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(
      `https://pps-atr8.onrender.com/api/tasks/update/${data.id}`,
      options
    )
    const json = await response.json()
    if (response.ok) {
      setBtnLoad(false)
      toast.success("Task Updated")
      updateRef.current.close()
      fetchTasks.current()
    } else {
      setBtnLoad(false)
      toast.error(json.message)
    }
  }

  //Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (activeTitle === "" && activeFilters.length === 0) {
      return task
    } else if (
      task.company.toLowerCase().includes(activeTitle.toLowerCase()) &&
      activeFilters.length === 0
    ) {
      return task
    } else if (activeTitle === "" && activeFilters.length > 0) {
      if (activeFilters.includes("Today")) {
        const today = new Date()
        const dueDate = new Date(task.createdAt)
        return (
          dueDate.getDate() === today.getDate() &&
          dueDate.getMonth() === today.getMonth() &&
          dueDate.getFullYear() === today.getFullYear()
        )
      } else if (activeFilters.includes("Yesterday")) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const dueDate = new Date(task.dueDate)
        return (
          dueDate.getDate() === yesterday.getDate() &&
          dueDate.getMonth() === yesterday.getMonth() &&
          dueDate.getFullYear() === yesterday.getFullYear()
        )
      } else {
        return activeFilters.includes(task.status)
      }
    } else if (
      task.title.toLowerCase().includes(activeTitle.toLowerCase()) &&
      activeFilters.length > 0
    ) {
      return activeFilters.includes(task.status)
    } else {
      return null
    }
  })

  //Delete task
  const deleteTask = async (task) => {
    setBtnLoad(true)
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(
      `https://pps-atr8.onrender.com/api/tasks/delete/${task._id}`,
      options
    )
    const json = await response.json()
    if (response.ok) {
      toast.success("Task Deleted")
      fetchTasks.current()
      setBtnLoad(false)
    } else {
      toast.error(json.message)
      setBtnLoad(false)
    }
  }

  const handleSearchTitle = (e) => {
    setActiveTitle(e)
  }

  const handleActiveFilters = (e, checked) => {
    if (checked) {
      setActiveFilters([...activeFilters, e])
    } else {
      setActiveFilters((prev) => prev.filter((item) => item !== e))
    }
  }

  const statusColor = (status) => {
    switch (status) {
      case "Completed":
        return "completed"
      case "In Progress":
        return "in-progress"
      case "Pending":
        return "pending"
      default:
        return ""
    }
  }
  const priorityColor = (status) => {
    switch (status) {
      case "High":
        return "high"
      case "Low":
        return "low"
      default:
        return ""
    }
  }

  //close edit when clicked outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (editRef.current && editRef.current !== event.target) {
        toggleEdit(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  //fetch user tasks
  React.useEffect(() => {
    setLoading(true)
    fetchTasks.current = async () => {
      const api = `https://pps-atr8.onrender.com/api/tasks/get/${userDetails.id}`
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setTasks(data.tasks)

      if (response.ok) {
        setLoading(false)
      }
    }
    fetchTasks.current()
  }, [])




  return (
    <div className="home-container">
      <Navbar />
      <div className="home-main">
        <img src="https://res.cloudinary.com/dlovqnrza/image/upload/v1710952325/BEC_bmbdkx.jpg" alt="BEC" className="college-logo" />
        <div className="greeting-container">
          <p className="greeting-msg">Hi {name.split(" ")[0]},</p>
          <h1>
            Welcome Back <span className="wave">👋🏻</span>
          </h1>
        </div>
        <div className="task-container">
          <TaskHeader
            handleSearchTitle={handleSearchTitle}
            handleActiveFilters={handleActiveFilters}
            activeFilters={activeFilters}
            fetchTasks={fetchTasks}
          />
          <div className="task-list-container">
{/* {loading ? (
              <div className="loader-container">
                <Oval
                  height={55}
                  width={55}
                  color="#000"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#fff"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            ) : combinedData.length === 0 ? (
              <div className="no-task-container">
                <h2 className="no-task-msg">No Data Found ☹️</h2>
              </div>
            ) : (             */}
              <div>
                <div className="table-header">
                  <li className="table-column">SL No.</li>
                  <li className="table-column">Department</li>
                  <li className="table-column">System Config</li>
                  <li className="table-column">Quantity</li>
                  <li className="table-column">Invoice No</li>
                  <li className="table-column">Purchase Date</li>
                  <li className="table-column">Expiry Date</li>
                  <li className="table-column">Unit Price</li>
                  <li className="table-column">Total</li>
                  <li className="table-column">Edit</li>

                </div>
                {/* Map over your filteredTasks array to display the data */}
                {combinedData.map(task => (
                  <div key={task["SL No"]} className="task-row">
                    <div className="table-row">{task["SL No"]}</div>
                    <div className="table-row">{task["Department"]}</div>
                    <div className="table-row">{task["Sys Config"]}</div>
                    <div className="table-row">{task["Quantity"]}</div>
                    <div className="table-row">{task["Invoice No"]}</div>
                    <div className="table-row">{task["Purchase Date"]}</div>
                    <div className="table-row">{task["Expiry Date"]}</div>
                    <div className="table-row">{task["Unit Price"]}</div>
                    <div className="table-row">{task["Total Price"]}</div>
                    <button className="table-row edit-btn">Edit</button>

                  </div>
                ))}
              </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
                }
                
export default Departments