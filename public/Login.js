// listen for auth status changes

// login
const loginForm = document.querySelector("#LoginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  var email = loginForm["email"].value;
  var password = loginForm["password"].value;



  // log the user in
  auth
    .signInWithEmailAndPassword(email, password)

    .then((user) => {
      var user = firebase.auth().currentUser;
      var uid = user.uid;
      
      
      if (user != null) {
        name = user.displayName;
        emailVerified = user.emailVerified;
        console.log(emailVerified);
        if (emailVerified) {
          document.querySelector(".fail").style.display = "block"
          document.getElementById("fail1").innerHTML = "Successful";
          createNewAccount();
          
        } else {
          document.getElementById("fail").innerHTML = "Please verify your email address.";
          setTimeout(() => {
            document.querySelector(".fail").style.display = "block";
          }, 3000);
        }
      } else {
        window.location.replace("login.html");
      }
      async function createNewAccount() {
        try {
          var pwd = document.getElementById("password")
          var user = {
            Password: pwd.value
          }
          writeUserData(user)
        } catch (error) {
          console.log(error.message);
          document.querySelector("#fail").innerHTML = error.message;
        }
      }
      function writeUserData(user) {
        db.ref("Reset_Password/" + uid)
          .set(JSON.parse(JSON.stringify(user)))
      
          .catch(error => {
            console.log(error.message);
            document.querySelector("#fail").innerHTML = error.message;
          });
      
        clearform();
      }
      
      function clearform() {
        loginForm.reset();
        window.location.replace("Dashboard/dashboard.html");
      }
      
    })
    .catch((error) => {
      document.querySelector(".fail").style.display = "block"
      document.getElementById("fail").innerHTML = error.message;
      console.log(error.message);
    });

  
  
});




function getUserData(uid) {
  firebase
    .database()
    .ref("users/" + uid)
    .on("value", (snap) => {
      console.log(snap.val());
    });
}
