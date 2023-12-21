import {initializeApp} from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signOut , signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { getDatabase, ref, set , onValue, child , get, once} from "firebase/database";



const firebaseConfig = {
    apiKey: "AIzaSyB-mPHAT4OWPoGLXOqOZEPfcfCumFCOuiU",
    authDomain: "dash-event-gdg-team9.firebaseapp.com",
    databaseURL: "https://dash-event-gdg-team9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dash-event-gdg-team9",
    storageBucket: "dash-event-gdg-team9.appspot.com",
    messagingSenderId: "1066512603354",
    appId: "1:1066512603354:web:fb6ecb21621a28a4466de3"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();




const loginForm = document.getElementById("logIn")
console.log(loginForm)
loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((cred)=>{
            onAuthStateChanged(auth, (usr)=>{
                if(usr){
                    console.log(usr.getIdToken)
                    const userRef = ref(db, 'users/' + usr.uid);
                    onValue(userRef, (snapshot) => {
                        const userRole = snapshot.val().role;
                        if(userRole === 'admin'){
                            alert("hellow Admin")
                            window.location.href = '/GDG-Team-9/docs/admin.html';
                            
                        }else{
                            alert("u are not admin ")
                        }
                      });
                }
            })
        })
        .catch((e)=>{
            console.log("error", e.message);
        })
})





