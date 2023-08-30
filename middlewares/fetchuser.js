const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc } = require("firebase/firestore");


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
  const db = getFirestore(app);
  
  const fetchuser = async (req, res, next) => {
      const uid = req.params.uid;
      console.log(uid);
  
      if (!uid) {
          return res.status(401).send({ error: "Please Authenticate using a valid uid" });
      }
  
      try {
          const userDocRef = doc(db, "users", uid);
          const userDocSnap = await getDoc(userDocRef);
  
          if (!userDocSnap.exists()) {
              return res.status(404).send({ error: "User not found" });
          }
  
          console.log(userDocSnap.data()); // This will log the user data
          next();
      } catch (error) {
          console.error(error);
          res.status(500).send({ error: "Internal Server Error" });
      }
  };

module.exports = fetchuser;