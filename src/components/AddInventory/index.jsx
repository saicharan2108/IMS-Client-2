import React, { useState } from 'react';
import './index.css';
import Navbar from '../Navbar';

const AddInventory = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    systemConfiguration: '',
    quantity: '',
    unitPrice: '',
    invoiceNo: '',
    purchaseDate: '',
    expiryDate: '',
    supplierName: '',
    categoryName: '',
    supplierAddress: '',
    supplierContactNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <>  <Navbar/>  
    <div className="task-container-add">
      <form className="create-task-form" onSubmit={handleSubmit}>
        <div className="create-task-form-input">
          <label htmlFor="itemName">Item Name:</label>
          <input type="text" id="itemName" name="itemName" value={formData.itemName} onChange={handleChange} className="task-input-field" />
        </div>
        <div className="create-task-form-input">
          <label htmlFor="systemConfiguration">System Configuration:</label>
          <input type="text" id="systemConfiguration" name="systemConfiguration" value={formData.systemConfiguration} onChange={handleChange} className="task-input-field" />
        </div>
        <div className="create-task-form-input">
          <label htmlFor="quantity">Quantity:</label>
          <input type="text" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="task-input-field" />
        </div>
        <div className="create-task-form-input">
          <label htmlFor="unitPrice">Unit Price:</label>
          <input type="text" id="unitPrice" name="unitPrice" value={formData.unitPrice} onChange={handleChange} className="task-input-field" />
        </div>
        <div className="create-task-form-input">
          <label htmlFor="invoiceNo">Invoice No:</label>
          <input type="text" id="invoiceNo" name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="task-input-field" />
        </div>
        <div className="create-task-form-input">
          <label htmlFor="purchaseDate">Purchase Date:</label>
          <input type="text" id="purchaseDate" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} className="task-input-field" />
        </div>
        <div className="create-task-form-input">
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input type="text" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="task-input-field" />
        </div>
        <div className="create-task-form-input">
          <label htmlFor="supplierName">Supplier Name:</label>
          <input type="text" id="supplierName" name="supplierName" value={formData.supplierName} onChange={handleChange} className="task-input-field" />
        </div>
        <div className="create-task-form-input">
          <label htmlFor="categoryName">Category Name:</label>
          <input type="text" id="categoryName" name="categoryName" value={formData.categoryName} onChange={handleChange} className="task-input-field" />
        </div>
        <div className="create-task-form-input">
          <label htmlFor="supplierAddress">Supplier Address:</label>
          <input type="text" id="supplierAddress" name="supplierAddress" value={formData.supplierAddress} onChange={handleChange} className="task-input-field" />
        </div>
        <div className="create-task-form-input">
          <label htmlFor="supplierContactNumber">Supplier Contact Number:</label>
          <input type="text" id="supplierContactNumber" name="supplierContactNumber" value={formData.supplierContactNumber} onChange={handleChange} className="task-input-field" />
        </div>
        <button type="submit" className="create-btn">Add</button>
      </form>
    </div>
  ;
  </>
  )

};

export default AddInventory;
