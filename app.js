import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  signOut,
  linkWithPopup,
} from "firebase/auth";
import { firebaseConfig } from "./firebase-config.js";

main();

async function main() {
  try {
    const el = {
      sectionSignin: document.querySelector("#sectionSignin"),
      sectionUser: document.querySelector("#sectionUser"),
      sectionSignout: document.querySelector("#sectionSignout"),

      buttonGoogleSignin: document.querySelector("#buttonGoogleSignin"),
      buttonGithubLink: document.querySelector("#buttonGithubLink"),
      buttonSignout: document.querySelector("#buttonSignout"),

      jwt: document.querySelector("#jwt"),
    };
    const app = initializeApp(firebaseConfig); // <2>
    const auth = getAuth(app); // <3>

    onAuthStateChanged(auth, (user) => {
      if (user) {
        el.sectionSignin.style.display = "none";
        el.sectionUser.style.display = "block";
        el.sectionSignout.style.display = "block";
        el.jwt.innerHTML = "Bearer " + user.accessToken;
      } else {
        el.sectionSignin.style.display = "block";
        el.sectionUser.style.display = "none";
        el.sectionSignout.style.display = "none";
      }
    });

    el.buttonGoogleSignin.addEventListener("click", async (event) => {
      // <5>
      try {
        event.preventDefault();

        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
      } catch (err) {
        el.errorMessage.innerHTML = err.message;
        console.error(err);
      }
    });

    el.buttonGithubLink.addEventListener("click", async (event) => {
      try {
        event.preventDefault();

        const provider = new GithubAuthProvider();

        await linkWithPopup(auth.currentUser, provider).then((result) => {
          // Accounts successfully linked.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const user = result.user;
          console.log("session user", user);
        });
      } catch (err) {
        // el.errorMessage.innerHTML = err.message;
        console.error(err);
      }
    });

    el.buttonSignout.addEventListener("click", async (event) => {
      // <6>
      try {
        event.preventDefault();
        await signOut(auth);
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
}
