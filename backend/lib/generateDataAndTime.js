exports.currentDateAndTime = () => {
  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  return datetime
}

exports.secondsToDate = (given_seconds) => {
  var currentdate = new Date(given_seconds * 1000); 
  var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  return datetime
}

exports.getTimestamp = () => {
  let FieldValue = require("firebase-admin").firestore.FieldValue;
  return FieldValue.serverTimestamp()
}