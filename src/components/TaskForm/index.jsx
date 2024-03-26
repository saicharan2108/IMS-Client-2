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
      <h4 className="Form-Title">{type === "create" ? "Create New Inventory" : "Update Inventory"}</h4>
      <div className="create-task-form-container">
        <form className="create-task-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="create-task-form-input">
            <input
              type="text"
              id="labName"
              name="labName"
              defaultValue={task?.labName || ""}
              placeholder="Item Name"
              {...register("labName", { required: true })}
              className="task-input-field"
            />
            {errors.title && (
              <span className="task-error-msg">*Item Name is required</span>
            )}
          </div>
          <div className="create-task-form-input">
            <input
              type="text"
              id="sysConfig"
              name="sysConfig"
              defaultValue={task?.sysConfig || ""}
              placeholder="System Configuration"
              {...register("sysConfig", { required: true })}
              className="task-input-field"
            />
            {errors.title && (
              <span className="task-error-msg">*sysConfig is required</span>
            )}
          </div>
          <div className="create-task-form-input">
            <input
              type="text"
              id="qty"
              name="qty"
              defaultValue={task?.qty || ""}
              placeholder="Quantity"
              {...register("quantity", { required: true })}
              className="task-input-field"
            />
            {errors.title && (
              <span className="task-error-msg">*Quantity is required</span>
            )}
          </div>
          <div className="create-task-form-input">
            <input
              type="text"
              id="invoiceNo"
              name="invoiceNo"
              defaultValue={task?.invoiceNo || ""}
              placeholder="Invoice No"
              {...register("invoiceNo", { required: true })}
              className="task-input-field"
            />
            {errors.title && (
              <span className="task-error-msg">*Invoice No is required</span>
            )}
          </div>
 
        
          
          <div className="create-task-form-input">
            <input
              type="text"
              id="unitPrice"
              name="unitPrice"
              defaultValue={task?.unitPrice || ""}
              placeholder="Unit Price"
              {...register("unitPrice", { required: true })}
              className="task-input-field"
            />
            {errors.title && (
              <span className="task-error-msg">*Unit Price is required</span>
            )}
          </div>
          <div className="create-task-form-input">
            <label htmlFor="dueDate">Purchase Date</label>
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
              <span className="task-error-msg">*Purchase Date is required</span>
            )}
          </div>
          <div className="create-task-form-input">
            <label htmlFor="dueDate"> Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              // min={new Date().toISOString().split("T")[0]}
              defaultValue={
                (() => {
                  const dateObject = new Date(task?.expiryDate)
                  const year = dateObject.getFullYear()
                  const month = String(dateObject.getMonth() + 1).padStart(
                    2,
                    "0"
                  )
                  const day = String(dateObject.getDate()).padStart(2, "0")
                  return `${year}-${month}-${day}`
                })() || ""
              }
              {...register("expiryDate", { required: false })}
              className="task-input-field"
            />
            {errors.startDate && (
              <span className="task-error-msg">*Expiry Date is required</span>
            )}
          </div>
         
         
            
            <div className="create-task-form-input">
            <input
              type="text"
              id="category"
              name="category"
              defaultValue={task?.category || ""}
              placeholder="Category"
              {...register("category", { required: false })}
              className="task-input-field"
            />

            {/* {errors.assignedTo && (
              <span className="task-error-msg">*This field is required</span>
            )} */}
          </div>

          <div className="create-task-form-input">
            <input
              type="text"
              id="supplierName"
              name="supplier"
              defaultValue={task?.supplier || ""}
              placeholder="Supplier Name"
              {...register("Supplier", { required: false })}
              className="task-input-field"
            />

            {/* {errors.assignedTo && (
              <span className="task-error-msg">*This field is required</span>
            )} */}
          </div>


          <div className="create-task-form-input">
            <input
              type="text"
              id="category"
              name="category"
              defaultValue={task?.category || ""}
              placeholder="Category"
              {...register("category", { required: false })}
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
