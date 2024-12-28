import  { useState } from 'react';

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

  const handleBillToChange = (e) => {
    const { name, value } = e.target;
    setBillTo((prevState) => ({
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

  // Calculate Subtotal
  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + parseFloat(item.amount || 0), 0);
  };

  // Calculate Total (Subtotal + CGST + SGST)
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const cgstAmount = (parseFloat(cgst) || 0) / 100 * subtotal;
    const sgstAmount = (parseFloat(sgst) || 0) / 100 * subtotal;
    return subtotal + cgstAmount + sgstAmount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subtotal = calculateSubtotal();
    const total = calculateTotal();
    
    console.log('Bill To:', billTo);
    console.log('Items:', items);
    console.log('CGST:', cgst);
    console.log('SGST:', sgst);
    console.log('Subtotal:', subtotal);
    console.log('Total:', total);
  };

  return (
    <div>
      <h1>Item Details Form</h1>
      <form onSubmit={handleSubmit}>
        <h2>Bill To:</h2>
        <div>
          <label htmlFor="name">NAME:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={billTo.name}
            onChange={handleBillToChange}
          />
        </div>

        <div>
          <label htmlFor="mobileNo">Mobile No:</label>
          <input
            id="mobileNo"
            type="text"
            name="mobileNo"
            value={billTo.mobileNo}
            onChange={handleBillToChange}
          />
        </div>

        <div>
          <label htmlFor="address">ADDRESS:</label>
          <input
            id="address"
            type="text"
            name="address"
            value={billTo.address}
            onChange={handleBillToChange}
          />
        </div>

        <div>
          <label htmlFor="gstin">GSTIN:</label>
          <input
            id="gstin"
            type="text"
            name="gstin"
            value={billTo.gstin}
            onChange={handleBillToChange}
          />
        </div>

        <h2>Item Details:</h2>
        {items.map((item, index) => (
          <div key={index}>
            <div>
              <label htmlFor={`description-${index}`}>Description:</label>
              <input
                id={`description-${index}`}
                type="text"
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor={`hsnCode-${index}`}>HSN Code:</label>
              <input
                id={`hsnCode-${index}`}
                type="number"
                value={item.hsnCode}
                onChange={(e) => handleItemChange(index, 'hsnCode', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor={`quantity-${index}`}>Quantity:</label>
              <input
                id={`quantity-${index}`}
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor={`rate-${index}`}>Rate:</label>
              <input
                id={`rate-${index}`}
                type="number"
                value={item.rate}
                onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor={`amount-${index}`}>Amount:</label>
              <input
                id={`amount-${index}`}
                type="number"
                value={item.amount}
                readOnly
              />
            </div>
          </div>
        ))}

        <div>
          <button type="button" onClick={addItem}>
            + Add More Items
          </button>
        </div>

        <h2>Taxes:</h2>
        <div>
          <label htmlFor="cgst">CGST (%):</label>
          <input
            id="cgst"
            type="number"
            value={cgst}
            onChange={(e) => setCgst(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="sgst">SGST (%):</label>
          <input
            id="sgst"
            type="number"
            value={sgst}
            onChange={(e) => setSgst(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* Display Subtotal and Total */}
      <div>
        <h3>Summary:</h3>
        <p>Subtotal: {calculateSubtotal()}</p>
        <p>Total (Including CGST & SGST): {calculateTotal()}</p>
      </div>
    </div>
  );
};

export default ItemForm;
