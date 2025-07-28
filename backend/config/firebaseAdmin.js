import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const firebaseServiceAccount = require("../firebaseServiceAccount.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseServiceAccount),
  });
}

export default admin;
