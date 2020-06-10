auth.onAuthStateChanged((user) => {
  if (user) {
    firebase
      .database()
      .ref("users/" + user.uid)
      .on("value", (snap) => {
        console.log(snap.val());
        console.log(document.getElementById("td51").innerHTML);
        var info = snap.val().email;
        var username = document.getElementById("td5");
        var Deposits = document.getElementById("td51");
        var Balance = document.getElementById("td52");
        var Profit = document.getElementById("td53");
        var Credit = document.getElementById("td54");
        var Withdrawal = document.getElementById("td55");
        
        var Trading_Percentage = document.getElementById("td56");
      });
    firebase
      .database()
      .ref("Investments/" + user.uid)
      .on("value", (snap) => {
        console.log(snap.val());
        var username  = document.querySelector("#td55");
        "Account  Bearer" + "<br>"+ snap.val().username;
        var Deposits = document.querySelector("#td51");
        Deposits.innerHTML = "Deposits" + "<br>" + "$" + snap.val().Deposits;
        var Balance = document.querySelector("#td52");
        Balance.innerHTML = "Balance" + "<br>" + "$" + snap.val().Balance;
        var Profit = document.querySelector("#td53");
        Profit.innerHTML = "Profit" + "<br>" + "$" + snap.val().Profit;
        var Credit = document.querySelector("#td54");
        Credit.innerHTML = "Credit" + "<br>" + "$" + snap.val().Credit;
        var Withdrawal = document.querySelector("#td55");
        Withdrawal.innerHTML =
          "Withdrawal" + "<br>" + "$" + snap.val().Withdrawal;
        
        var Trading_Percentage = document.querySelector("#td56");
        Trading_Percentage.innerHTML =
          "Trading  Percentage" + "<br>" + "%" + snap.val().Trading_Percentage;

          document.getElementById("td5").style.color = "white";
        document.getElementById("td5").style.fontWeight = "bold";

        document.getElementById("td51").style.color = "white";
        document.getElementById("td51").style.fontWeight = "bold";

        document.getElementById("td52").style.color = "white";
        document.getElementById("td52").style.fontWeight = "bold";

        document.getElementById("td53").style.color = "white";
        document.getElementById("td53").style.fontWeight = "bold";

        document.getElementById("td54").style.color = "white";
        document.getElementById("td54").style.fontWeight = "bold";

        document.getElementById("td55").style.color = "white";
        document.getElementById("td55").style.fontWeight = "bold";

        document.getElementById("td56").style.color = "white";
        document.getElementById("td56").style.fontWeight = "bold";
      });
  } else {
    window.location.replace("../user/Login.html");
  }
});
