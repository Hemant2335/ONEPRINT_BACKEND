const {doc ,getDoc ,  getFirestore } = require("firebase/firestore");
const { initializeApp } = require("firebase/app");


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

const fetchuser = async(req, res, next) => {
    const uid = req.params.uid;
    console.log(uid);
    if (!uid)
    {
        res.status(401).send({error:"Please Authenticate using a valid uid"})
    }
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        console.log(userDoc);
        next(); 
    } catch (error) {
        res.status(500).send({error:"Internal Server Error"});
        console.log("Some error Occurred");   
    }
}

module.exports = fetchuser;