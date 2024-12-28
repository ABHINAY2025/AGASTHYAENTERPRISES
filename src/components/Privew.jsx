import { useLocation } from 'react-router-dom';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './MyDocument';
import Logo from '../assets/Agasthya Enterprises (1).png';
import toWords from "@jstb/num-to-words-indian";


function Privew() {
  const location = useLocation();
  const { formData } = location.state || {}; // Retrieve the data from state
  const watermarkUrl = Logo;


  if (!formData) {
    return <p>No data found!</p>; // Handle the case where no data is passed
  }
  const { billTo, items, cgst, sgst, subtotal, total,cgstAmount,sgstAmount, invoiceDetails } = formData;

  console.log(formData);

const Totalwords = toWords(total).toUpperCase();;
console.log("words"+Totalwords)
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>PDF Example in React</h1>
      {/* PDFViewer renders the PDF in a viewer */}
      <PDFViewer width="100%" height="600">
        <MyDocument
          billTo={billTo}
          items={items}
          cgst={cgst}
          sgst={sgst}
          subtotal={subtotal}
          total={total}
          sgstAmount={sgstAmount}
          cgstAmount={cgstAmount}
          watermarkUrl={watermarkUrl}
          Totalwords={Totalwords}
          invoiceDetails={invoiceDetails} // Pass invoice details to MyDocument
        />
      </PDFViewer>
    </div>
  );
}

export default Privew;
