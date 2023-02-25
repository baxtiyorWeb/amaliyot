const signUpButton = document.getElementById("send");
// const signInButton = document.getElementById("signIn");
// let google = document.querySelector(".bxl-google-plus");
signUpButton.addEventListener("click", () => {
  sign_up();
  alert("s");
});

// signInButton.addEventListener("click", () => {
// signInWithEmailAndPasswordFunc();
// });
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  signOut,
  signInAnonymously,
  onAuthStateChanged,
  linkWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  update,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcfbkEKW5RjsFzXikxjycfo1nmrlGItG8",
  authDomain: "developer-16e4e.firebaseapp.com",
  projectId: "developer-16e4e",
  storageBucket: "developer-16e4e.appspot.com",
  messagingSenderId: "770168986630",
  appId: "1:770168986630:web:4d9f3b55bb242030183787",
  measurementId: "G-41RRC6WQR7",
};

// initializy app

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth(app);
const database = getDatabase(app);
const token = getAuth(app);
firebase.initializeApp(firebaseConfig);

// google.addEventListener("click", signInGoogle);

// function signInGoogle() {
//   signInWithRedirect(auth, provider);

//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       GetUserInfo();

//       function GetUserInfo() {
//         const user = auth.currentUser;
//       }
//       const user = result.user;
//       if (!user) {
//         window.location = "./user/index.html";
//       }

//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);

//       // ...
//     });
// }

function sign_up() {
  let username = document.querySelector("#name").value;
  let job = document.querySelector("#job").value;
  let yourAge = document.querySelector("#yourAge").value;
  let text = document.querySelector("#text").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let input = document.querySelector("input");
  let img = document.querySelector("#img");
  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref("images/" + file.name);

    storageRef.put(file).on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
    });

    storageRef.getDownloadURL().then(function (url) {
      img.src = url;
      console.log(url);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const dr = new Date();
          update(ref(database, "users/" + user.uid), {
            img: url,
            username: username,
            job: job,
            yourAge: yourAge,
            password: password,
            email: email,
            text: text,
          });
        }
        if (user) {
          if (user !== null) {
            user.providerData.forEach((profile) => {});
          }
        } else {
          //   userName.innerHTML = "no Internet Connection";
          //   userEmail.style.display = "none";
        }
      });
    });

    createUserWithEmailAndPassword(
      auth,
      email,
      password,
      job,
      yourAge,
      text,
      input
    )
      .then((userCredential) => {
        // Signed in
        alert("success");
        const user = userCredential.user;
        username: username;
        job: job;
        yourAge: yourAge;
        password: password;
        email: email;
        text: text;

        // ...
        if (user !== null) {
          const dr = new Date();

          update(ref(database, "users/" + user.uid), {
            username: username,
            job: job,
            yourAge: yourAge,
            password: password,
            email: email,
            text: text,
          });
        }
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(error);
        // ..
      });
  });
}
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  }
  if (user) {
    if (user !== null) {
      user.providerData.forEach((profile) => {});
    }
  } else {
    //   userName.innerHTML = "no Internet Connection";
    //   userEmail.style.display = "none";
  }
});
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let img = document.querySelector("#img");
          img.src = snapshot.val().img;
          let userInfoSection = document.querySelector(".user-info-section");
          let center = document.querySelector(".center");
          userInfoSection.classList.add("show");
          center.classList.add("hide");
          let information = document.querySelector(".information")
          information.innerHTML = `
            <div>${snapshot.val().email}</div>
            <div>${snapshot.val().username}</div>
            <div>${snapshot.val().job}</div>
            <div>${snapshot.val().yourAge}</span>
            <div>${snapshot.val().text}</div>
            <div>${snapshot.val().password}</div>
            <a href = "/index.html" style = "text-decoration: none; color: greenyellow">next page</a>
          `

          // storageRef.then(function(url){
          //     const video = document.createElement('video');
          //         document.body.append(video)
          //         console.log(url);
          //         video.src = url
          // })
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {});
  }
  if (user) {
    if (user !== null) {
      user.providerData.forEach((profile) => {});
    }
  } else {
    //   userName.innerHTML = "no Internet Connection";
    //   userEmail.style.display = "none";
  }
});
let signin = document.querySelector("#signin");
signin.addEventListener("click", () => {
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      alert("login email");
      const user = userCredential.user;
      password: password;
      email: email;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});
let logout = document.querySelector("#logout");

logout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert('logout success')
      window.location = "./register.html"
    })
    .catch((error) => {
      // An error happened.
    });
});
