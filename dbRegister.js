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

onAuthStateChanged(auth, (user) => {
  if (user) {
    let img = document.querySelectorAll("#user-img");
    let userNames = document.querySelectorAll("#user-name");
    let userJob = document.querySelectorAll("#user-job");
    const uid = user.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          img.forEach((item, index) => {
            item.src = snapshot.val().img;
            console.log(item.src);
          });
          userJob.forEach((item, index) => {
            item.innerHTML = snapshot.val().job;
          });

          let center = document.querySelector(".center");
          let r = userNames.forEach((item, index) => {
            item.innerHTML = snapshot.val().username;
            console.log(item);
          });

          userInfoSection.classList.add("show");
          center.classList.add("hide");
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
