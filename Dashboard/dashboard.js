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
      .ref("Deposit_Information/" + user.uid)
      .on("value", snap => {
        
        var Depo = document.getElementById("DepositID");
          var Bala = document.getElementById("BalanceID");
        var Prof = document.getElementById("ProfitID");
        var Cred = document.getElementById("CreditID");
        
        Depo.innerHTML = "$" + snap.val().Deposit;
         Bala.innerHTML = snap.val().Balance;
        Prof.innerHTML = snap.val().Profit;
        Cred.innerHTML = snap.val().Credit;
        
        
      
        Balance1 = snap.val().Balance;
        Profit1 = snap.val().Profit;
        Credit1 = snap.val().Credit;
        console.log(snap.val());
        
      });
      
      
  } else {
    window.location.replace("../login.html");
  }
});
