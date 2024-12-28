
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import Logo from "../assets/Agasthya Enterprises (1).png"

const items = [
  { description: "Item 1", hsnCode: 2, quantity: 10,rate:123,amount:123 },
  { description: "Item 1", hsnCode: 2, quantity: 10,rate:123,amount:123 },
  { description: "Item 1", hsnCode: 2, quantity: 10,rate:123,amount:123 },
  { description: "Item 1", hsnCode: 2, quantity: 10,rate:123,amount:123 },
  { description: "Item 1", hsnCode: 2, quantity: 10,rate:123,amount:123 },
  { description: "Item 1", hsnCode: 2, quantity: 10,rate:123,amount:123 },
  
];

const watermarkUrl = Logo;
function Privew() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>PDF Example in React</h1>
      {/* PDFViewer renders the PDF in a viewer */}
      <PDFViewer width="100%" height="600">
        <MyDocument items={items} watermarkUrl={watermarkUrl} />
      </PDFViewer>
    </div>
  )
}

export default Privew
