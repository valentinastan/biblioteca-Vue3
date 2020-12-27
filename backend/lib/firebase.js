
var admin = require("firebase-admin");
var serviceAccount = require("../config/proiect-tic-biblioteca-firebase-adminsdk-s4ww4-4f75738e65.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://proiect-tic-biblioteca.firebaseio.com"
});

module.exports = {
  dbCon: admin.firestore()
}
