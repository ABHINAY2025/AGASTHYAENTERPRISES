import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import Logo from "../assets/logo.png";
import styles from "./invoiceStyles";

const PageWithWatermark = ({ children, watermarkUrl }) => (
  <Page size="A4" style={styles.page}>
    <Image style={styles.watermark} src={watermarkUrl} />
    {children}
  </Page>
);

const MyDocument = ({ billTo, items, cgst, sgst, subtotal, total, invoiceDetails, watermarkUrl, Totalwords }) => {
  const fontSize = 10;
  const itemsPerPage = 15;
console.log("lll"+Array.isArray(items))
if(items.length>0){
  console.log(items.length)
}
  const renderTableHeader = () => (
    <View style={[styles.tableRow, styles.tableHeader]}>
      <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 40, textAlign: 'center' }}>S.No</Text>
      <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 150, textAlign: 'center' }}>PARTICULARS</Text>
      <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 100, textAlign: 'center' }}>HSN Code</Text>
      <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 80, textAlign: 'center' }}>Quantity</Text>
      <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 100, textAlign: 'center' }}>Unit Rate</Text>
      <Text style={{ ...styles.tableCell, padding: 4, width: 100, textAlign: 'center' }}>Amount</Text>
    </View>
  );

  const renderItemsForPage = (pageIndex) => {
    const startIdx = pageIndex * itemsPerPage;
    const endIdx = Math.min(startIdx + itemsPerPage, items.length);
    return items.slice(startIdx, endIdx).map((item, idx) => (
      <View key={idx} style={styles.tableRow}>
        <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 40, textAlign: 'center' }}>{idx + 1}</Text>
        <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 150, textAlign: 'center' }}>{item.description}</Text>
        <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 100, textAlign: 'center' }}>{item.hsnCode}</Text>
        <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 80, textAlign: 'center' }}>{item.quantity}</Text>
        <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 100, textAlign: 'center' }}>
          ₹{Number.isFinite(Number(item.rate)) ? Number(item.rate).toFixed(2) : 'N/A'}
        </Text>
        <Text style={{ ...styles.tableCell, padding: 4, width: 100, textAlign: 'center' }}>
          ₹{Number.isFinite(Number(item.amount)) ? Number(item.amount).toFixed(2) : '0.00'}
        </Text>
      </View>
    ));
  
  };

  const renderSubtotalSection = () => (
    <View style={styles.subtotalSection(fontSize)}>
      <View style={{ flexDirection: 'row', fontSize: 12, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'column', marginTop: 8 }}>
          <Text>Amount In Words:</Text>
          <Text style={{ marginTop: 4, fontSize: 11, width: 300 }}>{Totalwords} RUPEES ONLY</Text>
          <View style={{ marginTop: 8 }}>
            <Text>ACCOUNT DETAILS:</Text>
            <Text>Bank: FEDERAL BANK</Text>
            <Text>A/C No: 16720200005119</Text>
            <Text>IFSC Code: FDRL0001672</Text>
            <Text>Branch: LB NAGAR</Text>
          </View>
        </View>
        <View style={{ width: '100%' }}>
          <View style={styles.summaryRow}>
            <Text>Subtotal:</Text>
            <Text>₹{Number.isFinite(Number(subtotal)) ? Number(subtotal).toFixed(2) : '0.00'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>CGST:</Text>
            <Text>₹{cgst}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>SGST:</Text>
            <Text>₹{sgst}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text>Total:</Text>
            <Text>₹{Number.isFinite(Number(total)) ? Number(total).toFixed(2) : '0.00'}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <View style={styles.terms}>
        <Text style={styles.sectionTitle}>Terms and Conditions:</Text>
        {[
          '1• Delivery charges will be always charged extra.',
          '2• Once material delivered will not be taken back or exchanged.',
          '3• No Claim will be admitted after delivery.',
          '4• Subject to Hyderabad Jurisdiction',
        ].map((term, index) => (
          <Text key={index}>{term}</Text>
        ))}
        <Text style={{ marginTop: 10 }}>Received the above mentioned material in good condition and</Text>
        <Text>as per order</Text>
      </View>
      <View style={styles.signatureSection}>
        <View style={styles.leftSignature}>
          <Text>Receiver signature</Text>
        </View>
        <View style={styles.rightSignature}>
          <Text>Authorized Signature</Text>
        </View>
      </View>
    </View>
  );

  return (
    <Document>
      <PageWithWatermark watermarkUrl={watermarkUrl}>
        <View style={styles.contentWrapper}>
          {/* Header Section */}
          <View style={styles.header(fontSize)}>
            <View>
              <Text style={{ fontSize: 12 }}>GSTIN: <Text style={{ fontSize: 14, fontWeight: 'bold' }}>36AINPJ0953A1ZJ</Text></Text>
              <Image src={Logo} style={styles.logo} />
            </View>
            <View style={styles.companyInfo}>
              <Text style={styles.title}>TAX INVOICE</Text>
              <View style={styles.companyBox}>
                <Text style={styles.companyName}>AGASTHYA ENTERPRISES</Text>
                <Text style={{ fontSize: 11, color: 'gray' }}>Off: 1st Floor, 151, SBH Venture 2,</Text>
                <Text style={{ fontSize: 11, color: 'gray' }}>LB Nagar, Hyderabad, Ranga Reddy Dist,</Text>
                <Text style={{ fontSize: 11, color: 'gray' }}>Telangana-500074</Text>
              </View>
            </View>
            <View style={styles.vertical}>
              <Text style={{ marginBottom: 5, fontSize: 12 }}>Invoice #: {invoiceDetails.invoiceNumber}</Text>
              <Text style={{ marginBottom: 5, fontSize: 12 }}>Date: {invoiceDetails.date}</Text>
              <Text style={{ marginBottom: 5, fontSize: 12 }}>Phone: 9949993656</Text>
            </View>
          </View>
          {/* Customer Info Section */}
          <View style={styles.customerInfo}>
            <Text style={styles.sectionTitle}>Bill To:</Text>
            <Text style={{ fontSize: 12, marginTop: 5 }}>NAME: {billTo.name}</Text>
            <Text style={{ fontSize: 12, marginTop: 5 }}>Mobile No: {billTo.mobileNo}</Text>
            <Text style={{ fontSize: 12, width: 250, marginTop: 5 }}>ADDRESS: {billTo.address}</Text>
            <Text style={{ fontSize: 12, marginTop: 5 }}>GSTIN: {billTo.gstin}</Text>
          </View>
          {/* Table Section */}
          <View style={styles.section(fontSize)}>
            <View style={styles.table(fontSize)}>
              {renderTableHeader()}
              {renderItemsForPage(0)}
            </View>
          </View>
          {items.length <= itemsPerPage && renderSubtotalSection()}
        </View>
        {items.length <= itemsPerPage && renderFooter()}
      </PageWithWatermark>

      {/* Additional Pages for Items */}
      {Array(Math.ceil(items.length / itemsPerPage) - 1)
        .fill()
        .map((_, pageIndex) => (
          <PageWithWatermark key={pageIndex} watermarkUrl={watermarkUrl}>
            <View style={styles.contentWrapper}>
              <View style={styles.section(fontSize)}>
                <View style={styles.table(fontSize)}>
                  {renderTableHeader()}
                  {renderItemsForPage(pageIndex + 1)}
                </View>
              </View>
              {pageIndex + 2 === Math.ceil(items.length / itemsPerPage) && renderSubtotalSection()}
            </View>
            {pageIndex + 2 === Math.ceil(items.length / itemsPerPage) && renderFooter()}
          </PageWithWatermark>
        ))}
    </Document>
  );
};

export default MyDocument;
