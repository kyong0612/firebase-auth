import {initializeApp} from "firebase/app"
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
} from "firebase/auth"

main()

async function main () {
  try {
    const el = {
      sectionSignin: document.querySelector('#sectionSignin'),
      sectionUser: document.querySelector('#sectionUser'),
      sectionSignout: document.querySelector('#sectionSignout'),

      buttonSignin: document.querySelector('#buttonSignin'),
      buttonSignout: document.querySelector('#buttonSignout'),

      uid: document.querySelector('#uid'),
    }

    const response = await fetch('firebase-config.json') // <1>
    const firebaseConfig = await response.json()
    const app = initializeApp(firebaseConfig) // <2>
    const auth = getAuth(app) // <3>

    onAuthStateChanged(auth, (user) => { // <4>
      if (user) {
        el.sectionSignin.style.display = 'none'
        el.sectionUser.style.display = 'block'
        el.sectionSignout.style.display = 'block'
        el.uid.innerHTML = user.uid
      } else {
        el.sectionSignin.style.display = 'block'
        el.sectionUser.style.display = 'none'
        el.sectionSignout.style.display = 'none'
      }
    })

    el.buttonSignin.addEventListener('click', async (event) => { // <5>
      try {
        event.preventDefault()

        const provider = new GoogleAuthProvider()
        await signInWithRedirect(auth, provider)
      } catch (err) {
        el.errorMessage.innerHTML = err.message
        console.error(err)
      }
    })

    el.buttonSignout.addEventListener('click', async (event) => { // <6>
      try {
        event.preventDefault()
        await signOut(auth)
      } catch (err) {
        console.error(err)
      }
    })
  } catch (err) {
    console.error(err)
  }
}
