const { getFirestore, doc, getDoc } = require("firebase/firestore");
const app = require("../firebase_config");
  
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