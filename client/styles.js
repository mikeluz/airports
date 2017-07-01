const styles = {};

styles.table = {
  display: 'table',
  textAlign: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '20%'
};

styles.inputStyle = {
  display: 'table-cell',
  padding: '2px',
  margin: '2px',
  zIndex: '6'
};

styles.headerStyle = {
  marginTop: "0px",
  marginBottom: '2px',
  padding: "5px",
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "rgba(252, 123, 42, 0.9)"
};

styles.predictiveDropdownStyles = {
  fontSize: "10pt",
  listStyle: "none",
  width: "400px",
  margin: "0px",
  cursor:"pointer",
};

styles.inputContainerStyle = {
  height: "100vh",
  position: "relative",
  margin: "auto",
  width: "100%",
  backgroundColor: "rgba(252, 123, 42, 0.1)",
  zIndex: "5"
};

styles.mapStyle = {
  height: "100vh",
  position: "absolute",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0"
};

styles.mapContainerStyle = {
  height: "100%"
};

styles.btnStyle = {
  padding: "10px",
  backgroundColor: "white",
  left: "10%",
  position: "absolute",
  border: "none",
  top: "7px",
  bottom: "auto",
  borderRadius: "20px"
};

styles.badInputWarning = {
  position: "absolute",
  width: "100%",
  margin: "auto",
  textAlign: "center",
  backgroundColor: "red",
  color: "white",
  marginTop: "10px",
  marginBottom: "10px",

}

module.exports = styles;