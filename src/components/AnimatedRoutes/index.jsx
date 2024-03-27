import React from "react"
import { Route, Routes, useLocation } from "react-router-dom"

import Login from "../Login"
import SignUp from "../SignUp"
import Home from "../Home"
import Reports from "../Reports"
import Departments from "../Departments"
import AddInventory from "../AddInventory"
import AddDeptForm from "../AddDept"

const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Home />} />
      <Route path="/manage-inventory" element={<Departments />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/add-item" element={<AddInventory/>}/>
      <Route path="/add-dept" element={<AddDeptForm/>}/>
    </Routes>
  )
}

export default AnimatedRoutes
