import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import Logo from "../assets/logo.png"
import styles from "./invoiceStyles";

const PageWithWatermark = ({ children, watermarkUrl }) => (
  <Page size="A4" style={styles.page}>
    <Image
      style={styles.watermark}
      src={watermarkUrl}
    />
    {children}
  </Page>
);

const MyDocument = ({ billTo, items, cgst, sgst, subtotal, total, invoiceDetails, watermarkUrl }) => {
  const fontSize = 10;
  const itemsPerPage = 14;
  
  // Calculate total items and pages
  const totalItems = items.length;
  const totalPages = Math.ceil((totalItems + (totalItems > 0 ? 1 : 0)) / itemsPerPage);

  const renderTableHeader = () => (
    <View style={[styles.tableRow, styles.tableHeader]}>
      <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 40, textAlign: 'center' }}>S.No</Text>
      <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 150, textAlign: 'center' }}>PARTICULARS</Text>
      <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 100, textAlign: 'center' }}>HSN Code</Text>
      <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 80, textAlign: 'center' }}> Quantity</Text>
      <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 100, textAlign: 'center' }}>Unit Rate</Text>
      <Text style={{ ...styles.tableCell, padding: 4, width: 100, textAlign: 'center' }}>Amount</Text>
    </View>
  );

  const renderItemsForPage = (pageIndex, itemsPerPage) => {
    const startIdx = pageIndex * itemsPerPage;
    const endIdx = Math.min(startIdx + itemsPerPage, items.length);
    return items.slice(startIdx, endIdx).map((item, idx) => (
      <View key={idx} style={styles.tableRow}>
        <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 40, textAlign: 'center' }}>
          {startIdx + idx + 1}
        </Text>
        <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 150, textAlign: 'center' }}>
          {item.description}
        </Text>
        <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 100, textAlign: 'center' }}>
          {item.hsnCode}
        </Text>
        <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 80, textAlign: 'center' }}>
          {item.quantity}
        </Text>
        <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding: 4, width: 100, textAlign: 'center' }}>
          ₹{Number.isFinite(Number(item.rate)) ? Number(item.rate).toFixed(2) : 'N/A'}
        </Text>
        <Text style={{ ...styles.tableCell, padding: 4, width: 100, textAlign: 'center' }}>
          ₹{Number.isFinite(Number(item.amount)) ? Number(item.amount).toFixed(2) : '0.00'}
        </Text>
      </View>
    ));
  };

  const renderHeader = () => (
    <View style={styles.header(fontSize)}>
      <View>
        <Text style={{fontSize:12}}>GSTIN:<Text style={{fontSize:14,fontWeight:'bold'}}>36AINPJ0953A1ZJ</Text></Text>
        <Image src={Logo} style={styles.logo} /> 
      </View>
      <View style={styles.companyInfo}>
        <Text style={styles.title}>TAX INVOICE</Text>
        <View style={styles.companyBox}>
          <Text style={styles.companyName}>AGASTHYA ENTERPRISES</Text>
          <Text style={{ fontSize: 11, color: 'gray' }}>Off: 1st Floor, 151, SBH Venture 2,</Text>
          <Text style={{ fontSize: 11, color: 'gray' }}>LB Nagar, Hyderabad,Ranga Reddy Dist,</Text>
          <Text style={{ fontSize: 11, color: 'gray' }}>Telangana-500074</Text>
        </View>
      </View>
      <View style={styles.vertical}>
        <Text style={{ marginBottom: 5,fontSize:12 }}>Invoice #:{invoiceDetails.invoiceNumber}</Text>
        <Text style={{ marginBottom: 5,fontSize:12 }}>Date:{invoiceDetails.date}</Text>
        <Text style={{ marginBottom: 5,fontSize:12 }}>Phone:9949993656</Text>
      </View>
    </View>
  );
const renderFooter=()=>{
  <View>
    <Text>Total:</Text>
    <Text>₹{Number.isFinite(Number(total)) ? Number(total).toFixed(2) : '0.00'}</Text>
  </View>
}
  const renderSubtotalSection = () => (
    <View style={styles.subtotalSection(fontSize)}>
      <View style={{flexDirection:'row', fontSize:12, justifyContent:'space-between'}}>
        <View style={{flexDirection:'column', marginTop:8}}>
          <Text>Amount In Words:</Text>
          <Text style={{textDecoration:'underline', width:250}}>totalInWords RUPEES ONLY</Text> 
          <View style={{marginTop:8}}>
            <View>ACCOUNT DETAILS:
              <Text>Bank: FEDERAL BANK</Text>
              <Text>A/C No: 16720200005119</Text>
              <Text>IFSC Code:FDRL0001672</Text>
              <Text>Branch:LB NAGAR</Text>
            </View>
          </View>
        </View>
        <View style={styles.subtotalSection(fontSize)}>
          <View style={styles.summaryRow}>
            <Text>Subtotal:</Text>
            <Text>₹{Number.isFinite(Number(subtotal)) ? Number(subtotal).toFixed(2) : '0.00'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>CGST: </Text>
            <Text>₹{cgst}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>SGST :</Text>
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

  // Generate pages
  const pages = [];
  let currentPage = 0;
  let remainingItems = [...items];

  while (remainingItems.length > 0) {
    const pageItems = remainingItems.slice(0, itemsPerPage);
    const isLastPage = remainingItems.length <= itemsPerPage;
    
    pages.push(
      <PageWithWatermark key={currentPage} watermarkUrl={watermarkUrl}>
        <View style={styles.contentWrapper}>
          {currentPage === 0 && (
            <>
              {renderHeader()}
              <View style={styles.customerInfo}>
                <Text style={styles.sectionTitle}>Bill To:</Text>
                <Text style={{ fontSize:12,marginTop:5 }}>NAME:{billTo.name}</Text>
                <Text style={{ fontSize:12,marginTop:5 }}>Mobile No:{billTo.mobileNo}</Text>
                <Text style={{ fontSize:12, width:250,marginTop:5 }}>ADDRESS:{billTo.address}</Text>
                <Text style={{ fontSize:12,marginTop:5 }}>GSTIN:{billTo.gstin}</Text>
              </View>
            </>
          )}
          
          <View style={styles.section(fontSize)}>
            <View style={styles.table(fontSize)}>
              {renderTableHeader()}
              {renderItemsForPage(currentPage, itemsPerPage)}
            </View>
          </View>
          
          {isLastPage && renderSubtotalSection()}
        </View>
        {renderFooter()}
      </PageWithWatermark>
    );

    remainingItems = remainingItems.slice(itemsPerPage);
    currentPage++;
  }

  return <Document>{pages}</Document>;
};

export default MyDocument;