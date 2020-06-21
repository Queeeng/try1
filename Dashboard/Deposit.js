const Deposit_form = document.getElementById("Deposit_form")
console.log(Deposit_form)

Deposit_form.addEventListener("submit", e => {
  
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
    try {
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
        Amount: Amt.value,
        Transaction_Date: currentDate,
        Transaction_Status: "Pending",
        Withdrawn: "$0"
  
      }
      
      var personInfo = {
        Deposit: Amt.value,
        Balance: "$0",
        Profit: "$0",
        Credit: "$0"
      }
      personDeposit(personInfo);
      
      function readRow() {
        localStorage.getItem("Html String");
        var string = localStorage.getItem("Html String");
        localStorage.setItem("newString", string);
        writeDepositorData(Depositor);
      }
      
      function personDeposit(personInfo) {
        var uid = localStorage.uid;
        db.ref("Deposit_Information/" + uid)
          .set(JSON.parse(JSON.stringify(personInfo)))
      
          .catch(error => {
            console.log(error.message);
            var formError = document.querySelector("#form_error")
            formError.innerHTML = error.message
          });
        readRow();
        console.log(uid)
      }
  
    } catch (error) {
      console.log(error.message);
      var formErrorHandler = document.querySelector("#form_error")
      formErrorHandler.innerHTML = error.message
    }
  }
  
  function thirdRow() {
    var thirdRowStorageData = localStorage.getItem("thirdRow");
    localStorage.setItem("newThirdRow", thirdRowStorageData);
  }
  
  function secondRow() {
    var secondRowStorageData = localStorage.getItem("SecondRow");
    localStorage.setItem("newSecondRow", secondRowStorageData);
    thirdRow();
  }
  
  
  
  function writeDepositorData(Depositor) {
    var uid = localStorage.uid;
    db.ref("Deposit/" + uid)
      .set(JSON.parse(JSON.stringify(Depositor)))
  
      .catch(error => {
        console.log(error.message);
        var formError = document.querySelector("#form_error")
        formError.innerHTML = error.message
      });
    console.log(uid)
    secondRow();
    clearform();
  }
  
  function clearform() {
    Deposit_form.reset();
    var formSuccessMessage = document.querySelector("#form_error")
    formSuccessMessage.innerHTML = "Successful"
    
  }
  
  Deposit();
  
  let html = '';
  let html1 = '';
  let html2 = '';
  const tr = localStorage.getItem("Html String1");
  const tr1 = localStorage.getItem("newSecondRow");
  const tr2 = localStorage.getItem("newThirdRow");
  html += tr;
  html1 += tr1;
  html2 += tr2;
  console.log(tr);
  console.log(tr1);
  console.log(tr2);
  var secondRow = document.getElementById("secondRow");
  
  if (html != null) {
    function saveToFirebase2(html2) {
      db.ref("ThirdRow/" + localStorage.uid).set(JSON.parse(JSON.stringify(html2)))
      
        .catch(error => {
          console.log(error.message);
        });
    
    }
    
    function saveToFirebase1(html1) {
      db.ref("SecondRow/" + localStorage.uid).set(JSON.parse(JSON.stringify(html1)))
      
      .catch(error => {
        console.log(error.message);
      });
      saveToFirebase2(html2)
    }
    
    function saveToFirebase(html) {
      db.ref("Webpage/" + localStorage.uid)
        .set(JSON.parse(JSON.stringify(html)))
    
        .catch(error => {
          console.log(error.message);
    
        });
        saveToFirebase1(html1);
    }
    saveToFirebase(html);
  }
  
  
})

