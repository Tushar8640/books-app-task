import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const athentication = () => {
  initializeApp(firebaseConfig);
};
export default athentication;
