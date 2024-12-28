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

const MyDocument = ({ billTo, items, cgst, sgst, subtotal, total, sgstAmount,cgstAmount,invoiceDetails, watermarkUrl,Totalwords }) => {
  const fontSize = 10;
  const itemsPerPage = 15;
  
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
  
    return items.slice(startIdx, endIdx).map((item, idx) => {
      // Calculate padding based on whether the row belongs to a page before the current page
      const padding = pageIndex !== currentPage ? 8 : 4; // Use larger padding for pages before the current page
  
      return (
        <View key={idx} style={styles.tableRow}>
          <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding, width: 40, textAlign: 'center' }}>
            {startIdx + idx + 1}
          </Text>
          <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding, width: 150, textAlign: 'center' }}>
            {item.description}
          </Text>
          <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding, width: 100, textAlign: 'center' }}>
            {item.hsnCode}
          </Text>
          <Text style={{ ...styles.tableCell, borderRight: '1px solid black', padding, width: 80, textAlign: 'center' }}>
            {item.quantity}
          </Text>
          <Text
            style={{
              ...styles.tableCell,
              borderRight: '1px solid black',
              fontFamily: 'NotoSans',
              padding,
              width: 100,
              textAlign: 'center',
            }}
          >
            ₹{Number.isFinite(Number(item.rate)) ? Number(item.rate).toFixed(2) : 'N/A'}
          </Text>
          <Text
            style={{
              ...styles.tableCell,
              padding,
              width: 100,
              fontFamily: 'NotoSans',
              textAlign: 'center',
            }}
          >
            ₹{Number.isFinite(Number(item.amount)) ? Number(item.amount).toFixed(2) : '0.00'}
          </Text>
        </View>
      );
    });
  };
  
  
  const renderHeader = () => (
    <View
      style={[
        styles.header(fontSize),
        // items.length > 16 ? { marginBottom: 20 } : {}, // Apply marginTop if more than 16 items
      ]}
    >
      <View>
        <Text style={{ fontSize: 11 }}>
          GSTIN:
          <Text style={{ fontSize: 13 ,fontFamily:'Outfit-Bold' }}>36AINPJ0953A1ZJ</Text>
        </Text>
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
        <Text style={{ marginBottom: 5, fontSize: 12 , }}>
          Invoice #: <Text style={{color:'red', fontFamily:'Outfit-Regular',fontSize:'16'}}>{invoiceDetails.invoiceNumber}</Text>
        </Text>
        <Text style={{ marginBottom: 5, fontSize: 12 }}>Date: {invoiceDetails.date}</Text>
        <Text style={{ marginBottom: 5, fontSize: 12 }}>Phone: 9949993656</Text>
      </View>
    </View>
  );
  

  const renderFooter = () => (
    <View style={{ width: '123%', height: 7, flexDirection: 'row', position:'absolute', marginLeft:-100,bottom:0 }}>
          <View style={{ width: '50%', height: '100%', backgroundColor: 'red' }}></View>
           <View style={{ width: '50%', height: '100%', backgroundColor: 'blue' }}></View>
    </View>
  );
  const hardcodedTerms = [
    '1• Delivery charges will be always charged extra.',
    '2• Once material delivered will not be taken back or exchanged.',
    '3• No Claim will be admitted after delivery.',
    '4• Subject to Hyderabad Jurisdiction',
  ]
  const renderSubtotalSection = () => (
    <View style={styles.subtotalSection(fontSize)}>
      <View style={{flexDirection:'row', fontSize:12, justifyContent:'space-between'}}>
        <View style={{flexDirection:'column', marginTop:8}}>
          <Text style={{fontSize:10}}>Amount In Words:</Text>
          <Text style={{fontSize:10,textDecoration:'underline', width:250}}>{Totalwords} RUPEES ONLY</Text> 
          <View style={{marginTop:8, paddingBottom:2,fontSize:10}}>
              <Text style={{paddingBottom:2}}>ACCOUNT DETAILS:</Text>
              <Text style={{paddingBottom:2}}>Bank: FEDERAL BANK</Text>
              <Text style={{paddingBottom:2}}>A/C No: 16720200005119</Text>
              <Text style={{paddingBottom:2}}>IFSC Code:FDRL0001672</Text>
              <Text >Branch:LB NAGAR</Text>
          </View>
        </View>
        <View style={{width:'100%',paddingTop:10}}>
          <View style={styles.summaryRow}>
            <Text>Subtotal:</Text>
            <Text>₹{Number.isFinite(Number(subtotal)) ? Number(subtotal).toFixed(2) : '0.00'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>CGST:{"("+cgst+")"}%</Text>
            <Text>₹{cgstAmount}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>SGST :{"("+sgst+")"}%</Text>
            <Text>₹{sgstAmount}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text>Total:</Text>
            <Text>₹{Number.isFinite(Number(total)) ? Number(total).toFixed(2) : '0.00'}</Text>
          </View>
        </View>
      </View>
      <View style={styles.terms}>
            <View>
            <Text style={styles.sectionTitle}>Terms and Conditions:</Text>
            {hardcodedTerms.map((term, index) => (
              <Text key={index}>{term}</Text>
            ))}
            <Text style={{marginTop:10}}>Received the above mentioned materiale in good condition and</Text>
            <Text>as per order</Text>
            </View>
            <Text style={styles.companyNameFooter}>For,<Text style={{  fontSize:13,fontFamily:'Outfit-Bold' }}>AGASTHYA ENTERPRISES</Text></Text>
          </View>
          {/* Company Name and Authorized Signature side by side */}
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

  // Generate pages
  const pages = [];
  let currentPage = 0;
  let pageIndex = 0; 
  let remainingItems = [...items];

  while (remainingItems.length > 0) {
    const pageItems = remainingItems.slice(0, itemsPerPage);
    const isLastPage = remainingItems.length <= itemsPerPage;
    const isCurrentPage = currentPage === 0;
    
  
    pages.push(
      <PageWithWatermark key={currentPage} watermarkUrl={watermarkUrl}>
        {renderHeader()}
  
        <View
          style={[
            styles.contentWrapper,
            !isCurrentPage && styles.centeredPage, // Center pages before the current page
          ]}
        >
          {isCurrentPage && (
            <View
              style={[
                styles.customerInfo,
                items.length > 16 ? { marginBottom: 60 } : {}, // Apply marginBottom dynamically
              ]}
            >
              <Text style={styles.sectionTitle}>Bill To:</Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <Text style={{ fontSize: 12, marginTop: 5 }}>NAME: {billTo.name}</Text>
                  <Text style={{ fontSize: 12, marginTop: 5 }}>Mobile No: {billTo.mobileNo}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 12, width: 250, marginTop: 5 }}>ADDRESS: {billTo.address}</Text>
                  <Text style={{ fontSize: 12, marginTop: 5 }}>GSTIN: {billTo.gstin}</Text>
                </View>
              </View>
            </View>
          )}
  <View
  style={[
    styles.section(fontSize),
    currentPage !== pageIndex && styles.centeredPage, // Apply centering for non-current pages
  ]}
>
  <View style={styles.table(fontSize)}>
    {renderTableHeader()}
    {renderItemsForPage(pageIndex, itemsPerPage)} {/* Use pageIndex here */}
  </View>
</View>
          {isLastPage && renderSubtotalSection()}
</View>
  
        {renderFooter()}
      </PageWithWatermark>
    );
  
    remainingItems = remainingItems.slice(itemsPerPage);
    currentPage++;
    pageIndex++;
  }
  

  return <Document>{pages}</Document>;
};

export default MyDocument;
