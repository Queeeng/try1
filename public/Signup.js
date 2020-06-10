const signupForm = document.querySelector("#SignupForm");
console.log(signupForm);
signupForm.addEventListener("submit", e => {
  e.preventDefault();
  //Get Users Info
  var email = signupForm["email"].value;
  var password = signupForm["password"].value;

  async function createNewAccount() {
    try {
      const userAuth = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      var user = {
        ref: signupForm["under_reference"].value,
        name: signupForm["Name"].value,
        username: signupForm["username"].value,
        email: signupForm["email"].value,
        password: signupForm["password"].value,
        retypepassword: signupForm["retypepassword"].value
      };
      writeUserData(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  auth.onAuthStateChanged(user => {
    if (user) {
      console.log(user.uid);
      localStorage.setItem("uid", user.uid);
      console.log(user.email);
    }
  });

  function clearform() {
    signupForm.reset();
    redirect();
  }

  function redirect() {
    window.location.replace("Dashboard/dashboard.html");
  }

  function writeUserData(user) {
    db.ref("users/" + localStorage.uid)
      .set(JSON.parse(JSON.stringify(user)))

      .catch(error => {
        console.log(error.message);
      });

    clearform();
  }

  auth.onAuthStateChanged(user => {
    if (user) {
      getUserData(user);
    }
  });

  function getUserData(user) {
    firebase
    .database()
      .ref("users/" + localStorage.uid)
      .on("value", snap => {
        console.log(snap.val());
      });
  }
  createNewAccount();
});
