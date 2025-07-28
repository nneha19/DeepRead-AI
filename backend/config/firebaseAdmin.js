import admin from "firebase-admin";
import { Buffer } from 'buffer'; 
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString()
);


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
