const logout = document.querySelector("#Logout");
logout.addEventListener("click", e => {
  e.preventDefault();
  auth.signOut();
  window.location.replace("../Signup/form.html");
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    firebase
      .database()
      .ref("users/" + user.uid)
      .on("value", snap => {
        console.log(snap.val());
        console.log(document.getElementById("User's_Name").innerHTML);
        var info = snap.val().username;
        document.getElementById("User").innerHTML = info;
      });
  } else {
    window.location.replace("../Signup/form.html");
  }
});
