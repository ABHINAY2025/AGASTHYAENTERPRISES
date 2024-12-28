import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import firestore  from './firebase';  // Ensure the correct path to your firebase.js
import { collection,setDoc,doc, addDoc, query, where, getDocs, collectionGroup } from 'firebase/firestore'; 
import firebase from './firebase.js';  // Import Firebase config
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles



const ItemForm = () => {
  const [billTo, setBillTo] = useState({
    name: '',
    mobileNo: '',
    address: '',
    gstin: '',
  });

  const [items, setItems] = useState([
    { description: '', hsnCode: '', quantity: '', rate: '', amount: '' },
  ]);




  const [cgst, setCgst] = useState('');
  const [sgst, setSgst] = useState('');
  
  // New state for invoice details
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: '',
    DespThrough: '',
    date: '',
  });

  const navigate = useNavigate();

  const handleBillToChange = (e) => {
    const { name, value } = e.target;
    setBillTo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInvoiceDetailsChange = (e) => {
    const { name, value } = e.target;
    setInvoiceDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    // Recalculate amount
    if (field === 'quantity' || field === 'rate') {
      const quantity = updatedItems[index].quantity;
      const rate = updatedItems[index].rate;
      const amount = quantity && rate ? quantity * rate : '';
      updatedItems[index].amount = amount;
    }

    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { description: '', hsnCode: '', quantity: '', rate: '', amount: '' },
    ]);
  };

  // Function to format the date to dd-mmm-yyyy format
  const formatDate = (date) => {
    const d = new Date(date);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return d.toLocaleDateString('en-GB', options).replace(',', '');
  };

  // Calculate Subtotal
  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + parseFloat(item.amount || 0), 0);
  };

  // Calculate Total (Subtotal + CGST + SGST)
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const cgstAmount = (parseFloat(cgst) || 0) / 100 * subtotal;
    const sgstAmount = (parseFloat(sgst) || 0) / 100 * subtotal;
    console.log(cgstAmount)
    console.log(sgstAmount)
    return subtotal + cgstAmount + sgstAmount;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const subtotal = calculateSubtotal();
    const total = calculateTotal();

    // Create the form data object to pass to Preview
    const formData = {
      billTo,   
      items,
      cgst,
      sgst,
      subtotal,
      cgstAmount : (parseFloat(cgst) || 0) / 100 * subtotal,
      sgstAmount : (parseFloat(sgst) || 0) / 100 * subtotal,
      total,
      invoiceDetails: {
        ...invoiceDetails,
        date: formatDate(invoiceDetails.date), // Format date before sending
      },
    };

    const { invoiceNumber } = formData.invoiceDetails;  // Extract invoice number from the form data
  
    // Step 1: Query Firestore to check if the invoice number already exists
    const q = query(collection(firestore, 'invoices'), where('invoiceDetails.invoiceNumber', '==', invoiceNumber));
    
    try {
      const querySnapshot = await getDocs(q);
  
      // Step 2: Check if an invoice with the same invoice number exists
      if (!querySnapshot.empty) {
        // If invoice exists, show a notification and redirect or handle accordingly
        toast.error('EInvoice with this number already exists!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      } else {
        // Step 3: If no invoice exists, proceed to add the new invoice document
        // Save the document with invoice number as the document ID
        const docRef = doc(firestore, 'invoices', invoiceNumber);  // Use invoiceNumber as the document ID
        await setDoc(docRef, formData);  // Use setDoc to create or overwrite the document
        
        console.log("Document written with ID: ", docRef.id);
        toast.success('Invoice successfully added!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
         // Navigate to the Preview page
      navigate('/preview', { state: { formData } });
    }
  } catch (error) {
    console.error("Error adding document: ", error);
        toast.error('Error adding invoice!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      }
  };
  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  
  return (
    <div className="bg-gray-50 min-h-screen p-8">
        <ToastContainer />
        <Link className='border-2 rounded-lg px-5 p-y-2 border-black' to={"/"}>back</Link>
  <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">

    <h1 className="text-2xl font-bold text-gray-800 mb-6">Item Details Form</h1>
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Invoice Details Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Invoice Details:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-600">Invoice Number:</label>
            <input
              id="invoiceNumber"
              type="text"
              name="invoiceNumber"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              value={invoiceDetails.invoiceNumber}
              onChange={handleInvoiceDetailsChange}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">DespThrough:</label>
            <input
              id="DespThrough"
              type="text"
              name="DespThrough"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              value={invoiceDetails.DespThrough}
              onChange={handleInvoiceDetailsChange}
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-600">Date:</label>
            <input
              id="date"
              type="date"
              name="date"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              value={invoiceDetails.date}
              onChange={handleInvoiceDetailsChange}
            />
          </div>
        </div>
      </section>

      {/* Bill To Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Bill To:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">NAME:</label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              value={billTo.name}
              onChange={handleBillToChange}
            />
          </div>
          <div>
            <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-600">Mobile No:</label>
            <input
              id="mobileNo"
              type="text"
              name="mobileNo"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              value={billTo.mobileNo}
              onChange={handleBillToChange}
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-600">ADDRESS:</label>
            <input
              id="address"
              type="text"
              name="address"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              value={billTo.address}
              onChange={handleBillToChange}
            />
          </div>
          <div>
            <label htmlFor="gstin" className="block text-sm font-medium text-gray-600">GSTIN:</label>
            <input
              id="gstin"
              type="text"
              name="gstin"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              value={billTo.gstin}
              onChange={handleBillToChange}
            />
          </div>
        </div>
      </section>

      {/* Item Details Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Item Details:</h2>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-4">
            <div>
              <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-600">Description:</label>
              <input
                id={`description-${index}`}
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`hsnCode-${index}`} className="block text-sm font-medium text-gray-600">HSN Code:</label>
              <input
                id={`hsnCode-${index}`}
                type="number"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                value={item.hsnCode}
                onChange={(e) => handleItemChange(index, 'hsnCode', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-gray-600">Quantity:</label>
              <input
                id={`quantity-${index}`}
                type="number"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`rate-${index}`} className="block text-sm font-medium text-gray-600">Rate:</label>
              <input
                id={`rate-${index}`}
                type="number"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                value={item.rate}
                onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`amount-${index}`} className="block  flex text-sm font-medium text-gray-600">Amount:</label>
              <div className='flex    items-center' >
              <input
                id={`amount-${index}`}
                type="number"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 bg-gray-100"
                value={item.amount}
                readOnly
              />
               <button 
        type="button"
        className="text-red-500 mt-5 ml-3"
        onClick={() => removeItem(index)}
      >
        <FaTrash />
      </button>
              </div>
             
            </div>
          </div>
        ))}
        <div>
          <button
            type="button"
            onClick={addItem}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            + Add More Items
          </button>
        </div>
      </section>

      {/* Taxes Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Taxes:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="cgst" className="block text-sm font-medium text-gray-600">CGST (%):</label>
            <input
              id="cgst"
              type="number"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              value={cgst}
              onChange={(e) => setCgst(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="sgst" className="block text-sm font-medium text-gray-600">SGST (%):</label>
            <input
              id="sgst"
              type="number"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              value={sgst}
              onChange={(e) => setSgst(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="bg-green-500 text-white w-full py-3 rounded-lg hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default ItemForm;