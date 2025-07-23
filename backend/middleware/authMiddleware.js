import admin from "firebase-admin";


const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, "base64").toString("utf8")
);

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
});

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;