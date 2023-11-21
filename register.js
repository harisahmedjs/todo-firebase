import {  createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth,db} from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";



const form = document.querySelector('#form')
const email = document.querySelector('#email')
const password= document.querySelector('#pass')
const name=document.querySelector('#name')


form.addEventListener('submit', (e) => {
  e.preventDefault()
  // console.log(email.value);
  // console.log(password.value);
  // console.log(name.value);
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(async (res) => {
      const user = res.user;
      console.log("User created:", user);

      try {
          // Add user data to Firestore
          const userDocRef = await addDoc(collection(db, "users"), {
              name: name.value,
              email: email.value,
              id: user.uid,
          });

          console.log("User document added:", userDocRef.id);

          // Clear input fields
          email.value = '';
          name.value = '';
          password.value = '';
      } catch (error) {
          console.error("Error adding user to Firestore:", error);
      }
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user:", errorMessage);
  });
})