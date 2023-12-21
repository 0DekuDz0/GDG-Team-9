import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue, child, get, once } from "firebase/database";

const allUser = [];

const firebaseConfig = {
    apiKey: "AIzaSyB-mPHAT4OWPoGLXOqOZEPfcfCumFCOuiU",
    authDomain: "dash-event-gdg-team9.firebaseapp.com",
    databaseURL: "https://dash-event-gdg-team9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dash-event-gdg-team9",
    storageBucket: "dash-event-gdg-team9.appspot.com",
    messagingSenderId: "1066512603354",
    appId: "1:1066512603354:web:fb6ecb21621a28a4466de3"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase();

const userData = ref(db, 'users/');

onValue(userData, (snapshot) => {
    const users = snapshot.val();

    // Check if users data is not null
    if (users) {
        // Loop through each user
        Object.keys(users).forEach((userId) => {
            const user = users[userId];
            if(user.role === 'admin'){return}
            // Access the 'name' and 'email' properties
            const name = user.username;
            const email = user.email;
            const number = user.phoneNumber;
            // Use the 'name' and 'email' properties as needed
            const li = document.createElement("li");
            li.innerHTML = `
            <p>Name: ${name}  <br> E-mail: ${email} <br> Number: ${number}</p>
            <input type="checkbox" > </input>
        `;
            const userInfo = {
                name: name,
                email: email,
                checked: false,
                currentLi: li
            }
            allUser.push(userInfo)
            document.getElementById('list').appendChild(li);
        });
    }
});



const btnSendEmail = document.getElementById("send-email");
btnSendEmail.addEventListener('click', () => {
    allUser.forEach((usr) => {
        usr.checked = true
        usr.currentLi.querySelector('input').checked = true;
    });

    const emailForm = document.createElement("div");
    emailForm.innerHTML = `
    <form id="send-email-form" class="email-form">
        <label for="subject">Subject</label>
        <input type="text" id="subject">
        <label for="email-content">Email Content</label>
        <textarea name="email-content" id="email-content" cols="30" rows="10"></textarea>
        <button type="submit" id="confirm-send-email" class="btn1">Send</button>
    </form>`;
    emailForm.className =" visible";

    const body = document.querySelector("body")
    body.append(emailForm);

    const sendEmailForm = document.getElementById('send-email-form')
    sendEmailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        emailForm.className='invisible';
        const templateId = 'template_c0g4ykj'; // Replace with your actual EmailJS template ID
        const subject = document.getElementById("subject").value;
        const content = document.getElementById("email-content").value
        // Email content
        allUser.forEach((usr) => {
            console.log(usr.email)
            const emailParams = {
                from_name: "GDG Team 9",
                reply_to: subject,
                message: content,
                to_name: usr.name,
                email: usr.email, // Replace with your recipient's email address
                // Replace with your recipient's email address
            };

            emailjs.send('service_xjscfhk', templateId, emailParams,"3Lmf6VpLM_s2a5ZXq")
                .then(response => {
                    console.log('Email sent successfully:', response);
                })
                .catch(error => {
                    console.error('Failed to send email:', error);
                });
        });
    });
});
