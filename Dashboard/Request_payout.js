//Register
const Requestpayout_form = document.querySelector("#Requestpayout_form");
Requestpayout_form.addEventListener("submit", (e) => {
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
            se: Requestpayout_form["se"].value,
            Bank: Requestpayout_form["bank"].value,
            Eth: Requestpayout_form["eth"].value,
            Btc: Requestpayout_form["btc"].value,
            Withdrawal_method: "0",
            Total: "0",
            Balance: "0",
          };
          var se = document.querySelector("#se");
          var Bank = document.querySelector("#bank");
          var Eth = document.querySelector("#eth");
          var Btc = document.querySelector("#btc");

          auth.onAuthStateChanged((user) => {
            if (user) {
              firebase
                .database()
                .ref("Withdrawal/" + user.uid)
                .on("value", (snap) => {
                  se.innerHTML = "$" + snap.val().se;
                  Bank.innerHTML = "$" + snap.val().Bank;
                  Eth.innerHTML = "$" + snap.val().Eth;
                  Btc.innerHTML = "$" + snap.val().Btc;
                });
            }
          });

          function showMessage() {
            //Show Alert
            document.querySelector(".alert").style.display = "block";
            Requestpayout_form.reset();

            //Hide Alert
            setTimeout(() => {
              document.querySelector(".alert").style.display = "none";
              showbutton();
            }, 3000);
          }

          function showbutton() {
            //Show Alert
            document.querySelector(".alet").style.display = "block";
          }

          db.ref("Withdrawal/" + In)
            .set(JSON.parse(JSON.stringify(user)))

            .catch((error) => {
              console.log(error.message);
            });

          showMessage();

          firebase
            .database()
            .ref("Withdrawal/" + In)
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
