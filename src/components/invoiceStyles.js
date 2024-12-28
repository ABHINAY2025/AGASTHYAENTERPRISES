import {  Font } from "@react-pdf/renderer";

Font.register({
  family: "Outfit-Bold",
  src: "/fonts/Outfit-Bold.ttf" // Correct path for the 'public' folder
});
Font.register({
  family: "Outfit-Regular",
  src: "/fonts/Outfit-Regular.ttf"
});
Font.register({
  family: "NotoSans",
  src: "/fonts/NotoSans_ExtraCondensed-Regular.ttf"
});
Font.register({
  family: "times",
  src: "/fonts/Tinos-Regular.ttf"
});


const styles = {
  page: {
    flexDirection: "column",
    paddingVertical:10,
    paddingHorizontal:40,
    fontFamily: "Helvetica",
    height: "100%",
  },
  watermark: {
    position: "absolute",
    width: "50%",  // Adjust size as needed
    height: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-150%, -150%)",
    opacity: 0.1,  // Adjust opacity as needed
    zIndex: -1,    // Ensures watermark stays behind content
  },
  contentWrapper: {
    flex: 1,
    position: "relative",
    zIndex: 1,     // Ensures content stays above watermark
  },
  header: (fontSize) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap:10,
    paddingRight:25,
    marginBottom: 20,
    borderBottom:1
  }),
  companyInfo: {
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginBottom: 2,
    marginLeft:35
  },
  companyBox: {
    padding: 10,
    width:280,
    alignItems: 'center',
    textAlign:'center',
    marginLeft:30,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:'Outfit-Bold',
    color: "#00008B",
  },
  vertical:{
    marginTop:10,
    marginLeft:30,
  },
  customerInfo: {
    marginBottom: 10,
    marginTop:-10,
  },
  sectionTitle: {
    fontSize: 12,
    marginBottom:5
  },
  billTo: (fontSize) => ({
    fontSize: fontSize,
  }),
  billToTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  section: (fontSize) => ({
    fontSize: fontSize,
  }),
  table: (fontSize) => ({
    display: "table",
    width: "100%",
    border: "1px solid black",
    fontSize: fontSize,
    backgroundColor: "white",  // Ensures table is readable over watermark
  }),
  tableRow: {
    flexDirection: 'row',        // Ensures row layout
    borderBottomWidth: 1,       // Maintains the bottom border width
    borderBottomColor: '#000',  // Keeps border color consistent
    borderStyle: 'solid',       // Applies a solid border style (universal for all borders)
    alignItems: 'center',       // Centers items vertically     
  },
  
  tableCell: (fontSize) => ({
    textAlign: "center",
    fontSize: fontSize, // Dynamic font size 
  }),
  tableHeader: {
    backgroundColor: '#f3f4f6',
    fontWeight: 'bold',
  },
  subtotalSection: (fontSize) => ({
    alignSelf: "flex-end",
    position:"relative",
    width: "100%",
    fontSize: fontSize,
    backgroundColor: "white",  // Ensures subtotal is readable over watermark
    padding: 10,  // Makes the container a flexbox
    justifyContent: 'space-between',  // Distributes items with space between them
  }), 
  summaryTotal:{
    borderTop:1
  },
  summaryRow: {
    flexDirection: 'row',
    width: "40%",
    fontFamily:'NotoSans',
    alignSelf:'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  subtotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingRight: 10,
  },
  footer: {
    textAlign: "center",
    paddingTop: 10,
    position:"relative",
    borderTop: "1px solid black",
    backgroundColor: "white",  // Ensures footer is readable over watermark
  },
  terms: {
    fontSize: 10,
    borderTop:1,
    paddingTop:10,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  companyNameFooter: {
    fontSize: 12,
    textAlign: 'left', // Align company name to the left
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:30,
    width: '100%', // Ensure the section spans the full width
  },
  leftSignature: {
    width: '48%', // Occupies 50% of the width
    textAlign: 'left',
    fontSize:14
  },
  rightSignature: {
    width: '48%', // Occupies 50% of the width
    textAlign: 'right',
    flexDirection:'column',
    fontSize:14,
  },
  footerText: {
    fontSize: 10,
    color: "gray",
  },
  logo: {
    width: 120,
    height: 120,
    marginTop:-20,
    marginBottom:-40,
    marginLeft:-10,
    objectFit: 'contain',
  },
};
export default styles;