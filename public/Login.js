// listen for auth status changes

// login
const loginForm = document.querySelector("#LoginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm["email"].value;
  const password = loginForm["password"].value;



  // log the user in
  auth
    .signInWithEmailAndPassword(email, password)

    .then((user) => {
      var user = firebase.auth().currentUser;
      
      
      if (user != null) {
        name = user.displayName;
        emailVerified = user.emailVerified;
        console.log(emailVerified);
        if (emailVerified) {
          document.querySelector(".fail").style.display = "block"
          document.getElementById("fail").innerHTML = "Successful";
          window.location.replace("Dashboard/dashboard.html");
        } else {
          document.getElementById("fail").innerHTML = "Please verify your email address.";
          setTimeout(() => {
            document.querySelector(".fail").style.display = "block";
          }, 3000);
        }
      } else {
        window.location.replace("login.html");
      }
      
    })
    .catch((error) => {
      document.querySelector(".fail").style.display = "block"
      document.getElementById("fail").innerHTML = error.message;
      console.log(error.message);
    });

  //reset form
  loginForm.reset();
});
auth.onAuthStateChanged((user) => {
  if (user) {
    getUserData(user.uid);
  } else {
  }
});





function getUserData(uid) {
  firebase
    .database()
    .ref("users/" + uid)
    .on("value", (snap) => {
      console.log(snap.val());
    });
}
