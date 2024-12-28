import { useEffect, useState } from 'react';
import db from './firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const DisplayData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "invoices"));
      const dataList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        loading: false,  // Initialize loading state as false, assuming data is already fetched
      }));
      setData(dataList);
      setLoading(false);
    };

    fetchData();
  }, []);

  const toggleAccordion = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this invoice?");
    
    if (confirmed) {
      try {
        await deleteDoc(doc(db, "invoices", id));
        setData(data.filter(invoice => invoice.id !== id));  // Remove the deleted invoice from the state
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    } else {
      console.log("Deletion canceled");
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Invoices</h1>
      {data.map((invoice, index) => (
        <div key={invoice.id} style={{ border: '1px solid #ddd', margin: '10px 0', borderRadius: '8px' }}>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#f0f8ff',
              cursor: 'pointer',
              fontWeight: 'bold',
              borderRadius: '8px 8px 0 0',
            }}
            onClick={() => toggleAccordion(index)}
          >
            Invoice Number: {invoice.invoiceDetails?.invoiceNumber} - Customer Name: {invoice.billTo?.name}
          </div>
          {expandedIndex === index && (
            <div style={{ padding: '15px', backgroundColor: '#f9f9f9' }}>

              <div style={{ backgroundColor: '#e6f7ff', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>
                <h3>Invoice Details</h3>
                <p><strong>Date:</strong> {invoice.invoiceDetails?.date}</p>
                <p><strong>Desp Through:</strong> {invoice.invoiceDetails?.DespThrough}</p>
              </div>

              <div style={{ backgroundColor: '#e8f8e1', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>
                <h3>Bill To</h3>
                <p><strong>Address:</strong> {invoice.billTo?.address}</p>
                <p><strong>GSTIN:</strong> {invoice.billTo?.gstin}</p>
                <p><strong>Mobile No:</strong> {invoice.billTo?.mobileNo}</p>
              </div>

              {/* Check if invoice.items exists and has data */}
              <div style={{ backgroundColor: '#fff9e6', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>
                <h3>Items</h3>
                {(invoice.items && invoice.items.length > 0) ? (
                  <ul>
                    {invoice.items.map((item, idx) => (
                      <li key={idx}>
                        <strong>Description:</strong> {item.description} | <strong>HSN Code:</strong> {item.hsnCode} | 
                        <strong>Quantity:</strong> {item.quantity} | <strong>Rate:</strong> {item.rate} | 
                        <strong>Amount:</strong> {item.amount}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No items available.</p>
                )}
              </div>

              <div style={{ backgroundColor: '#f2f2f2', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>
                <h3>Tax Details</h3>
                <p><strong>CGST:</strong> {invoice.cgst} | <strong>CGST Amount:</strong> {invoice.cgstAmount}</p>
                <p><strong>SGST:</strong> {invoice.sgst} | <strong>SGST Amount:</strong> {invoice.sgstAmount}</p>
              </div>

              <div style={{ backgroundColor: '#f7fff7', padding: '12px', borderRadius: '8px' }}>
                <h3>Summary</h3>
                <p><strong>Subtotal:</strong> {invoice.subtotal}</p>
                <p><strong>Total:</strong> {invoice.total}</p>
              </div>
              <button
                onClick={() => handleDelete(invoice.id)}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  marginBottom: '15px',
                  fontWeight: 'bold',
                }}
              >
                Delete Invoice
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayData;
