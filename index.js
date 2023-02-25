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

let closeMenu = document.querySelector(".close-menu .fa-times");
let aside = document.querySelector(".side-bar");
let closeMenuBlock = document.querySelector(".close-menu");
let openMenu = document.querySelector(".bx-menu");
let linkAfter = document.querySelectorAll(".navbar a");
let footer = document.querySelector(".footer");
let sectionBlock = document.querySelectorAll(".quick-select .container .block");
let block = document.querySelectorAll("section .container .block");
let boxContainer = document.querySelectorAll(".courses .box-container");
let lightDarkMode = document.querySelector(".cog-btn");
let sideBar = document.querySelectorAll(".side-bar .navbar a");
openMenu.style.display = "none";
closeMenu.addEventListener("click", () => {
  aside.classList.toggle("aside-close");
  closeMenuBlock.classList.toggle("close-toggle");
  closeMenu.style.display = "none";
  openMenu.style.display = "block";
  linkAfter.forEach((item, index) => {
    item.classList.add("link-add-after");
  });
  footer.classList.add("footer-full");
  sectionBlock.forEach((item, index) => {
    item.classList.add("footer-full");
  });
  block.forEach((item, index) => {
    item.classList.add("footer-full");
  });
  boxContainer.forEach((item, index) => {
    item.classList.add("box-container-full");
  });
});
openMenu.addEventListener("click", () => {
  aside.classList.remove("aside-close");
  closeMenuBlock.classList.remove("close-toggle");
  openMenu.style.display = "none";
  closeMenu.style.display = "block";
  linkAfter.forEach((item, index) => {
    item.classList.remove("link-add-after");
  });
  footer.classList.remove("footer-full");
  sectionBlock.forEach((item, index) => {
    item.classList.remove("footer-full");
  });
  block.forEach((item, index) => {
    item.classList.remove("footer-full");
  });

  boxContainer.forEach((item, index) => {
    item.classList.remove("box-container-full");
  });
});

let bottomLine = document.createElement("div");
bottomLine.classList.add("bottom-line");
bottomLine.style.position = "absolute";
bottomLine.style.width = "10px";
sideBar.forEach((item, index) => {
  item.addEventListener("mousemove", (e) => {
    item.style.position = "relative";
    item.append(bottomLine);
    bottomLine.style.left = e.pageX - 0 + "px";
  });
  item.addEventListener("mouseleave", (e) => {
    item.style.position = "relative";
    item.append(bottomLine);
    bottomLine.style.display = "none";
  });
  item.addEventListener("mouseenter", (e) => {
    item.style.position = "relative";
    item.append(bottomLine);
    bottomLine.style.left = e.pageX - 0 + "px";
    bottomLine.style.display = "flex";
  });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const enableDark = () => {
      if (user) {
        const uid = user.uid;
        const dr = new Date();
        lightDarkMode.classList.replace("bx-cog", "fa-sun");
        // document.body.classList.remove("dark");
        // localStorage.setItem("dark-mode", "disabled");
        lightDarkMode.addEventListener("click", ()=>{
          update(ref(database, "users/" + user.uid), {
            dark: "dark",
          });
        })
      }
      // localStorage.setItem("dark-mode", "enabled");
    };
    enableDark()

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          document.body.className = snapshot.val().dark;
          if(document.body.classList.contains("dark")){
            lightDarkMode.addEventListener("click", ()=>{
              update(ref(database, "users/" + user.uid), {
                dark: "dark",
              });
            })
          // }
          // if (darkmode === "disabled") {
          //   document.body.className = "light";
          // }
        } else {
          console.log("No data available");
        }
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
