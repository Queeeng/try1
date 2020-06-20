const tbody = document.querySelector("#tbody_id");
  db.ref("Deposit/" + localStorage.uid)
    .on("value", snap => {
      setUp(snap.val());
  
  
  
    })
  
  
  
  //set info
  
  
  const setUp = (data) => {
    console.log(data.Amount);
    var td1 = document.getElementById("item1");
    var td2 = document.getElementById("item2");
    var td3 = document.getElementById("item3");
    var td4 = document.getElementById("item4");
    
  
  //inputting the values
  td1.innerHTML = data.Amount;
  td2.innerHTML = data.Transaction_Status;
  td3.innerHTML = data.Withdrawn;
  td4.innerHTML = data.Transaction_Date;
  
  
  
   
   
  var rowDisplay = document.getElementById("firtRow");
  var tdRow = rowDisplay.innerHTML;
  
  

  localStorage.setItem("Html String1", tdRow);
  }
 
  db.ref("Webpage/" + localStorage.uid)
    .on("value", snap => {
      var id = localStorage.uid;
      console.log(id);
      var secondRowString = snap.val();
      console.log(secondRowString);
  
      var secondRowId = document.getElementById("secondRow");
      secondRowId.innerHTML = secondRowString;
      
      localStorage.setItem("SecondRow", secondRowString);
    
    })
    
  db.ref("SecondRow/" + localStorage.uid).on("value", snap => {
    var thirdRowString = snap.val();
    var thirdRowId = document.getElementById("thirdRow");
    thirdRowId.innerHTML = thirdRowString;
    localStorage.setItem("ThirdRow", thirdRowString);
  })
  
  db.ref("newThirdRow/" + localStorage.uid).on("value", snap => {
    var fourthRowString = snap.val();
    var fourthRowId = document.getElementById("fourthRow");
    fourthRowId.innerHTML = fourthRowString;
    localStorage.setItem("fourthRow", fourthRowString);
  })
    
  
  //set info
  const tableRowInfo = document.querySelector(".tab_row");
  
  
  $(function() {
    $('tbody').sortable;
    
    $('#addRow').click(function() {
      $('tbody').append(html);
    });
    
    $(document).on('click', '.remove', function() {
      $(this).parents('tr').remove();
    })
    
    
  })