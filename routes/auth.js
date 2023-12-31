const express = require("express");
const { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword } = require("firebase/auth");
const app = require("../firebase_config");
const { getFirestore, doc, setDoc ,getDoc } = require("firebase/firestore");
require('dotenv').config(); // This loads the environment variables from .env


const auth = getAuth(app);
const db = getFirestore(app);

const router = express.Router();

// Endpoint for user registration at Port 5000 : http://localhost:3000/api/auth/register

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
        isadmin: false,
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


// Endpoint for user login at Port 5000 : http://localhost:3000/api/user/login

router.post("/login", async (req, res) => {
  let Check = true;
  try {
    const userCred = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
    const user = userCred.user;
    console.log("User Logged In Successfully");
    res.status(200).json({Check , uid : user.uid , isadmin : user.isadmin});
  } catch (error) {
    console.log(error, "Login Error");
    Check = false;
    res.status(400).json({ error : error.message , Check });
  }
});

//Endpoint to fetch the details of the user at Port 5000 : http://localhost:3000/api/user

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
