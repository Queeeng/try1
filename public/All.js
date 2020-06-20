// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBTYSvmA8whvcXyLMNUsxMu_0jRJ4pNbxU",
  authDomain: "epfx-75788.firebaseapp.com",
  databaseURL: "https://epfx-75788.firebaseio.com",
  projectId: "epfx-75788",
  storageBucket: "epfx-75788.appspot.com",
  messagingSenderId: "770637531424",
  appId: "1:770637531424:web:7f554833644fa42ba6af45",
  measurementId: "G-ERQ27ZCBGL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//make auth and firestore references
const auth = firebase.auth();
const db = firebase.database();

auth.onAuthStateChanged(user => {
  if (user) {
    console.log("user logged in: ", user.email + " " + "&" + " " + user.uid);
    console.log(localStorage.getItem("uid"));
  } else {
    console.log("user logged out");
  }
});
console.log(localStorage.uid);