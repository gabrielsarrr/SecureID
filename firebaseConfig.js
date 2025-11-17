import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { firebaseCredenciales } from "./credenciales";

console.log("Credenciales cargadas:", firebaseCredenciales);

const app = initializeApp(firebaseCredenciales);

export const auth = getAuth(app);
export const db = getFirestore(app);
