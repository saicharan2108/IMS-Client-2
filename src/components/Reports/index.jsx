import React from "react"
import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"
import { toast } from "react-hot-toast"
import Popup from "reactjs-popup"

import Navbar from "../Navbar"
import TaskHeader from "../TaskHeader"
import TaskForm from "../TaskForm"

import "./index.css"
import "tippy.js/dist/tippy.css"

const Home = () => {
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
           <img src="https://res.cloudinary.com/dlovqnrza/image/upload/v1684135277/maintain_moazzq.webp" alt="Maintaining" className="beta-stage" /> 
           <p>Reports Page In Beta Stage</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
