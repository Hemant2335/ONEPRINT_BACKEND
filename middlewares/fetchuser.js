const {doc ,getDoc , db } = require("firebase/firestore");

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
        console.log("Some error Occurred");   
    }
}

module.exports = fetchuser;