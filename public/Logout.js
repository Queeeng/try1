const logout = document.querySelector("#logout_btn");
logout.addEventListener("click", e => {
  e.preventDefault();
  auth.signOut();
  window.location.replace("../login.html");
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
    window.location.replace("../login.html");
  }
});
