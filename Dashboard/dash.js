//Register
const Newinvestmentform = document.querySelector("#newinvestment_form");
Newinvestmentform.addEventListener("submit", (e) => {
  e.preventDefault();

  // feel free to change the object keys to match your data model
  //Get Users Info

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid);
      var In = user.uid;
      console.log(In);
      async function createNewAccount() {
        try {
          var user = {
            Invest_capital: Newinvestmentform["td51"].value,
            Bal: Newinvestmentform["td52"].value,
            Profit: Newinvestmentform["td53"].value,
            cre: Newinvestmentform["td54"].value,
            With: Newinvestmentform["td55"].value,
            Tp: Newinvestmentform["td56"].value,
            Total: "0",
            Deposits: "0",
            Balance: "0",
            Profit: "0",
            Credit: "0",
            Withdrawal: "0",
            Trading_Percentage: "0",
          };
          var Deposits = document.querySelector("#td51");
          var Balance = document.querySelector("#td52");
          var Profit = document.querySelector("#td53");
          var Credit = document.querySelector("#td54");
          var Withdrawal = document.querySelector("#td55");
          var Trading_Percentage = document.querySelector("#td56");

          auth.onAuthStateChanged((user) => {
            if (user) {
              firebase
                .database()
                .ref("Investments/" + user.uid)
                .on("value", (snap) => {
                  Deposits.innerHTML = "$" + snap.val().Invest_capital;
                  Balance.innerHTML = "$" + snap.val().Bal;
                  Profit.innerHTML = "$" + snap.val().Profit;
                  Credit.innerHTML = "$" + snap.val().cre;
                  Withdrawal.innerHTML = "$" + snap.val().With;
                  Trading_Percentage.innerHTML = "$" + snap.val().Tp;
                });
            }
          });

          function showMessage() {
            //Show Alert
            document.querySelector("#alert").style.display = "block";
            Newinvestmentform.reset();

            //Hide Alert
            setTimeout(() => {
              document.querySelector("#alert").style.display = "none";
              showbutton();
            }, 3000);
          }

          function showbutton() {
            //Show Alert
            document.querySelector("#alet").style.display = "block";
          }

          db.ref("Investments/" + In)
            .set(JSON.parse(JSON.stringify(user)))

            .catch((error) => {
              console.log(error.message);
            });

          showMessage();

          firebase
            .database()
            .ref("Investments/" + In)
            .on("value", (snap) => {
              console.log(snap.val().Invest_capital);
            });
        } catch (error) {
          console.log(error.message);
        }
      }

      function getUserData(uid) {}
      createNewAccount();

      getUserData(user.uid);
      console.log(user.email);
    }
  });
});
