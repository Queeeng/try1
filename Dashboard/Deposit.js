const Deposit_form = document.getElementById("Deposit_form")
console.log(Deposit_form)
Deposit_form.addEventListener("submit", e=> {
  e.preventDefault();
  
  var Upload_progress_message_display = document.querySelector(".upload_progress")
    //Getting the selected image
    var image = document.getElementById("image").files[0];
    //Getting the Image Name
    var imageName = image.name;
    //firebase storage reference
    var storageRef = firebase.storage().ref('/images/' + imageName);
    //Uploading image to seleted storage reference
    var uploadTask = storageRef.put(image);
  
    uploadTask.on('state_changed', function(snapshot) {
      //Observe state change events such as progress, pause, resume
      //get taska progress by including tthe number of bytes uploaded and total
      //number of bytes
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("upload is " + progress + " done");
      errorHandler = document.querySelector("#success_alert").innerHTML
      errorHandler = "You file upload is " + progress + " done"
    }, function(error) {
      //Handle errors
      setTimeout(() => {
        document.querySelector(".upload_progress").style.display = "block";
      }, 5000);
      errorHandler = document.querySelector("#success_alert")
      errorHandler.innerHTML = error.message
      console.log(error.message);
    }, function() {
      //Handle successful uploadTask
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log(downloadURL);
        var downloadURLs = {
          url: downloadURL
        }
        function getDownloadURLs(downloadURLs) {
          db.ref("DownloadURLs/" + localStorage.uid)
            .set(JSON.parse(JSON.stringify(downloadURLs)))
        
            .catch(error => {
              console.log(error.message);
              var formError = document.querySelector("#form_error")
              formError.innerHTML = error.message
            });
        
        }
        
      });
    })
    
    async function Deposit() {
      try{
        var Invesmnt_Plan = document.getElementById("Investment");
        var Amt = document.getElementById("amount");
        var Currecy = document.getElementById("currency");
        
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        var currentDate = dateTime.toString();
        console.log(currentDate);
        
        var Depositor = {
          Investment_Plan: Invesmnt_Plan.value,
          Amount_Withdrawn: "$0",
          Transaction_Date: currentDate,
          Transaction_Status: "Pending",
          Amount_Earned: "$0"
          
        }
  
        writeDepositorData(Depositor);
      } catch(error) {
        console.log(error.message);
        var formErrorHandler = document.querySelector("#form_error")
        formErrorHandler.innerHTML = error.message
      }
    }
    function writeDepositorData(Depositor) {
     
      db.ref("Deposit/" + localStorage.uid)
        .set(JSON.parse(JSON.stringify(Depositor)))
      
        .catch(error => {
          console.log(error.message);
          var formError = document.querySelector("#form_error")
          formError.innerHTML = error.message
        });
      
      clearform();
    }
    
    function clearform() {
      Deposit_form.reset();
      var formSuccessMessage = document.querySelector("#form_error")
      formSuccessMessage.innerHTML = "Successful!"
      document.querySelector(".form_errors").style.background ="#4BB543";
      setTimeout(() => {
        document.querySelector(".form_errors").style.display = "block";
        
      }, 5000);
    }
    Deposit();
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid);
        localStorage.setItem("uid", user.uid);
        console.log(user.email);
      }
    });
    
})

 