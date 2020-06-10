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
      if (user) {
        console.log(user);
        window.location.replace("/Dashboard/dashboard.html");
      } else {
        showalert();
        document.querySelector("#fail").innerHTML = error.message;
      }
    })
    .catch((error) => {
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
