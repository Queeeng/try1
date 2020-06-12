auth.onAuthStateChanged(user => {
  if (user) {
    firebase
      .database()
      .ref("users/" + user.uid)
      .on("value", snap => {
        console.log(snap.val());
        console.log(document.getElementById("User's_Name").innerHTML);
        var info = snap.val().username;
        
        document.getElementById("User's_Name").innerHTML =
          "Welcome" + "," + " " + info;
      });
    firebase
      .database()
      .ref("Investments/" + user.uid)
      .on("value", snap => {
        console.log(snap.val());
        var TotalEarningsDisplay = document.querySelector("#Totalearnings");
        TotalEarningsDisplay.innerHTML = "$" + snap.val().Profits;
      });
  } else {
    window.location.replace("../login.html");
  }
});
