const withdrawalForm = document.querySelector("#withdrawalID");
console.log(withdrawalForm);
withdrawalForm.addEventListener("submit", e=> {
  e.preventDefault();
  
  
  async function createWithdrawal() {

    try {
      var Withdrawal = {
        Bank_Name: withdrawalForm["bank_name"].value,
        Account_Name: withdrawalForm["account_name"].value,
        Account_Number: withdrawalForm["account_number"].value,
        Amount: withdrawalForm["amount"].value,
        SortCode: withdrawalForm["sort_code"].value
        
      }
      writeWithdrawalData(Withdrawal);
    } catch(error) {
      var displayFormError = document.querySelector("#withdrawal_Msg")
      displayFormError.innerHTML = error.message
      }
      
    function writeWithdrawalData(Withdrawal) {
      db.ref("Withdrawal/" + localStorage.uid)
        .set(JSON.parse(JSON.stringify(Withdrawal)))
      
        .catch(error => {
          console.log(error.message);
          var formError = document.querySelector("#withdrawal_Msg")
          formError.innerHTML = error.message
          
          document.querySelector(".Withdrawal").style.display = "block";
          
          //Hide Alert
          setTimeout(() => {
            document.querySelector(".Withdrawal").style.display = "none";
          
          }, 5000);
          
        });
        clearForm();
    }
    function clearForm() {
      withdrawalForm.reset();
      var formSuccess = document.querySelector("#withdrawal_Msg")
      formSuccess.innerHTML = "Successful! An Email will be sent to you shortly."
      
      document.querySelector(".Withdrawal").style.display = "block";
      
      
      //Hide Alert
      setTimeout(() => {
        document.querySelector(".Withdrawal").style.display = "none";
      
      }, 5000);
    }
  }
  createWithdrawal();
})
