import React, { useEffect } from "react"
import { Oval } from "react-loader-spinner"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"

import "./index.css"

const TaskForm = (props) => {
  const { handleTaskData, loading, type } = props
  const task = props.task || {}
  const [users, setUsers] = React.useState([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const userName = JSON.parse(localStorage.getItem("user")).name

  const onSubmit = (data) => {
    if (type === "create") {
      handleTaskData(data)
    } else {
      handleTaskData({ ...data, id: task._id })
    }
    /* reset() */
  }

  //fetch all users
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }

    const getUsers = async () => {
      const response = await fetch(
        "https://pps-atr8.onrender.com/api/users",
        options
      )
      const json = await response.json()
      if (response.ok) {
        setUsers(json)
      }
    }

    getUsers()

    return () => {
      setUsers([])
    }
  }, [])

  return (
    <div className="create-task-popup-container">
      <h4 className="Form-Title">{type === "create" ? "Create Project" : "Update Project"}</h4>
      <div className="create-task-form-container">
        <form className="create-task-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="create-task-form-input">
            <input
              type="text"
              id="company"
              name="company"
              defaultValue={task?.company || ""}
              placeholder="Company Name"
              {...register("company", { required: true })}
              className="task-input-field"
            />
            {errors.title && (
              <span className="task-error-msg">*Company Name is required</span>
            )}
          </div>
          <div className="create-task-form-input">
            <input
              type="text"
              id="contact"
              name="contact"
              defaultValue={task?.contact || ""}
              placeholder="Contact Name"
              {...register("contact", { required: true })}
              className="task-input-field"
            />
            {errors.title && (
              <span className="task-error-msg">*Contact is required</span>
            )}
          </div>
          <div className="create-task-form-input">
            <input
              type="text"
              id="city"
              name="city"
              defaultValue={task?.city || ""}
              placeholder="City"
              {...register("city", { required: true })}
              className="task-input-field"
            />
            {errors.title && (
              <span className="task-error-msg">*City is required</span>
            )}
          </div>
          <div className="create-task-form-input">
            <input
              type="text"
              id="project"
              name="project"
              defaultValue={task?.project || ""}
              placeholder="Project"
              {...register("project", { required: true })}
              className="task-input-field"
            />
            {errors.title && (
              <span className="task-error-msg">*Project type is required</span>
            )}
          </div>
          <div className="create-task-form-input">
            <input
              type="text"
              id="tasks"
              name="tasks"
              defaultValue={task?.tasks || ""}
              placeholder="Tasks"
              {...register("tasks", { required: true })}
              className="task-input-field"
            />
            {errors.title && (
              <span className="task-error-msg">*Tasks are required</span>
            )}
          </div>
          <div className="create-task-form-input">
            <input
              type="text"
              id="quantity"
              name="quantity"
              defaultValue={task?.quantity || ""}
              placeholder="Quantity"
              {...register("quantity", { required: true })}
              className="task-input-field"
            />
            {errors.title && (
              <span className="task-error-msg">*Quantity is required</span>
            )}
          </div>
          <div className="create-task-form-input">
            <label htmlFor="dueDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              // min={new Date().toISOString().split("T")[0]}
              defaultValue={
                (() => {
                  const dateObject = new Date(task?.startDate)
                  const year = dateObject.getFullYear()
                  const month = String(dateObject.getMonth() + 1).padStart(
                    2,
                    "0"
                  )
                  const day = String(dateObject.getDate()).padStart(2, "0")
                  return `${year}-${month}-${day}`
                })() || ""
              }
              {...register("startDate", { required: true })}
              className="task-input-field"
            />
            {errors.startDate && (
              <span className="task-error-msg">*Start Date is required</span>
            )}
          </div>
          <div className="create-task-form-input">
            <label htmlFor="dueDate">Planned End Date</label>
            <input
              type="date"
              id="plannedEndDate"
              name="plannedEndDate"
              // min={new Date().toISOString().split("T")[0]}
              defaultValue={
                (() => {
                  const dateObject = new Date(task?.plannedEndDate)
                  const year = dateObject.getFullYear()
                  const month = String(dateObject.getMonth() + 1).padStart(
                    2,
                    "0"
                  )
                  const day = String(dateObject.getDate()).padStart(2, "0")
                  return `${year}-${month}-${day}`
                })() || ""
              }
              {...register("plannedEndDate", { required: true })}
              className="task-input-field"
            />
            {errors.startDate && (
              <span className="task-error-msg">*Planned End Date is required</span>
            )}
          </div>
          <div className="create-task-form-input">
            <label htmlFor="dueDate">Actual End Date</label>
            <input
              type="date"
              id="actualEndDate"
              name="actualEndDate"
              min={new Date().toISOString().split("T")[0]}
              defaultValue={
                (() => {
                  const dateObject = new Date(task?.dueDate)
                  const year = dateObject.getFullYear()
                  const month = String(dateObject.getMonth() + 1).padStart(
                    2,
                    "0"
                  )
                  const day = String(dateObject.getDate()).padStart(2, "0")
                  return `${year}-${month}-${day}`
                })() || ""
              }
              {...register("actualEndDate", { required: true })}
              className="task-input-field"
            />
            {errors.dueDate && (
              <span className="task-error-msg">*Actual End Date is required</span>
            )}
          </div>
          <div className="create-task-form-input">
            <label htmlFor="assignedTo">Assign To</label>
            <select
              id="assignedTo"
              name="assignedTo"
              {...register("assignedTo", { required: true })}
              className="task-input-field"
            >
              {users?.map((user) => (
                <option
                  value={user.username}
                  key={user._id}
                  selected={user.username === task.assignedUser}
                >
                  {user.username === userName
                    ? `${user.username} (me)`
                    : user.username}
                </option>
              ))}
            </select>
            {/* {errors.assignedTo && (
              <span className="task-error-msg">*This field is required</span>
            )} */}
          </div>
          <div className="create-task-form-input">
            <label htmlFor="assignedTo">Status</label>
            <select
              id="status"
              name="status"
              {...register("status")}
              className="task-input-field"
            >
              <option value="Pending" selected={task.status === "Pending"}>
                Pending
              </option>
              <option
                value="In Progress"
                selected={task.status === "In Progress"}
              >
                In Progress
              </option>
              <option value="Completed" selected={task.status === "Completed"}>
                Completed
              </option>
            </select>
            </div>
            <div className="create-task-form-input">
            <label htmlFor="assignedTo">Priority</label>
            <select
              id="priority"
              name="priority"
              {...register("priority")}
              className="task-input-field"
            >
              <option value="Low" selected={task.status === "Low"}>
                Low
              </option>
              <option
                value="High"
                selected={task.status === "High"}
              >
                High
              </option>
             
            </select>
            </div>
            <div className="create-task-form-input">
            <input
              type="text"
              id="latestUpdate"
              name="latestUpdate"
              defaultValue={task?.latestUpdate || ""}
              placeholder="Latest Update"
              {...register("latestUpdate", { required: false })}
              className="task-input-field"
            />

            {/* {errors.assignedTo && (
              <span className="task-error-msg">*This field is required</span>
            )} */}
          </div>

          <button type="submit" className="create-btn">
            {loading ? (
              <Oval
                height={25}
                width={25}
                color="#ccc"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#fff"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            ) : type === "create" ? (
              "Create"
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
