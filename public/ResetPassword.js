const ResetPassword = document.querySelector("#ResetPassword_btn");
ResetPassword.addEventListener("click", e =>{
  e.preventDefault();
  
  var emailAddress = document.querySelector("#email").value;
  var auth = firebase.auth();

  auth.sendPasswordResetEmail(emailAddress).then(function() {
    document.querySelector("#message").innerHTML = "An email has been sent to you. Please check to verify your email address"
  }).catch(function(error) {
   document.querySelector("#message").innerHTML = error.message;
  });
})