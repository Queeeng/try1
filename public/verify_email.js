const Verify_btn = document.getElementById("verify_btn");
Verify_btn.addEventListener("click", e => {
  e.preventDefault();
  
  var user = firebase.auth().currentUser;
  
  user.sendEmailVerification().then(function() {
    const Verification_msg_sent = document.getElementById("display_email_verification_link_sent");
    var user = firebase.auth().currentUser;
    
    
    if (user != null) {
      name = user.displayName;
      emailVerified = user.emailVerified;
      console.log(emailVerified);
      if (emailVerified) {
        Verification_msg_sent.innerHTML = ""
      } else {
        Verification_msg_sent.innerHTML = "A verification email will be sent to your email address shortly"
      }
    }
    
  }).catch(function(error) {
    console.log(error.message);
  });
})