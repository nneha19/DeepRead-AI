import admin from "firebase-admin";

export const register = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) return res.status(400).json({ message: "No token provided" });

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decoded;
    
    return res.status(201).json({
      message: "User verified & registered",
      user: { uid, email, name, picture },
    });
  } catch (err) {
    console.error("Firebase Register Error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const login = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) return res.status(400).json({ message: "No token provided" });

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decoded;

    return res.status(200).json({
      message: "User verified & logged in",
      user: { uid, email, name, picture },
    });
  } catch (err) {
    console.error("Firebase Login Error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const logout = async (req, res) => {
  try {
    const { uid } = req.body;
    await admin.auth().revokeRefreshTokens(uid);
    return res.status(200).json({ message: "User logged out (tokens revoked)" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Logout failed" });
  }
};
