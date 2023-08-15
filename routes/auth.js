const express = require("express");
const { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword } = require("firebase/auth");
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc ,getDoc } = require("firebase/firestore");
require('dotenv').config(); // This loads the environment variables from .env

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBx5m_a_VToA564dZBn_mjymX-HCBT0uCo",
  authDomain: "yourprint-fe255.firebaseapp.com",
  projectId: "yourprint-fe255",
  storageBucket: "yourprint-fe255.appspot.com",
  messagingSenderId: "234659911880",
  appId: "1:234659911880:web:d88160962efbd4fd566dfd",
  measurementId: "G-MWZ4LG1T5N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const router = express.Router();

// Endpoint for user registration at Port 5000 : http://localhost:5000/api/auth/register

router.post("/register", async (req, res) => {
  let Check = true;
  try {
    const userCred = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);
    const user = userCred.user;
    // Store user data in firestore
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName: req.body.displayName,
      });
    } catch (error) { console.log("Cannot Access the database"); Check = false;}

    console.log("User Registered Successfully");
    res.status(200).json({Check , uid : user.uid});

  } catch (error) {
    console.log(error, "Register Error");
    Check = false;
    res.status(400).json({ error : error.message , Check });
  }
});


// Endpoint for user login at Port 5000 : http://localhost:5000/api/user/login

router.post("/login", async (req, res) => {
  let Check = true;
  try {
    const userCred = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
    const user = userCred.user;
    console.log("User Logged In Successfully");
    res.status(200).json({Check , uid : user.uid});
  } catch (error) {
    console.log(error, "Login Error");
    Check = false;
    res.status(400).json({ error : error.message , Check });
  }
});

//Endpoint to fetch the details of the user at Port 5000 : http://localhost:5000/api/user

router.get("/user/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      res.status(200).json(userData);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error, "Fetch User Error");
    res.status(500).json({ error: "An error occurred while fetching user data" });
  }
})

module.exports = router;
