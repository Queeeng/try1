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











var Deposit = document.getElementById("DepositID"),
  var Balance = document.getElementById("BalanceID");
var Profit = document.getElementById("ProfitID");
var Credit = document.getElementById("CreditID");


Deposit.innerHTML = snap.val().Deposit;
Balance.innerHTML = snap.val().Balance;
Profit.innerHTML = snap.val().Profit;
Credit.innerHTML = snap.val().Credit;