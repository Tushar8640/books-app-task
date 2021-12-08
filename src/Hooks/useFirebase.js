import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import athentication from "Firebase/firebase.inti";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

athentication();
const useFirebase = () => {
  let history = useHistory();
  const direction1 =()=> history.push("/loginsuccess")
  const direction2 =()=> history.push("/registersuccess")
  const [status, setStatus] = useState(null);
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();

  const signInwithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const registerUser = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = { email, displayName: name };
        setUser(newUser);

        // send name to firebase after creation
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});
        // history.replace('/');
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        const url = "https://registertest.free.beeceptor.com/init";
        axios
          .post(url, {
            uid: `${user?.uid}`,
            email: `${user?.email}`,
          })
          .then((response) => {
            setStatus(response.data);
           
          })
          .finally(status && direction1()  );
      });
  };

  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("user is logged in");
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        const url = "https://registertest.free.beeceptor.com/init";
        axios
          .post(url, {
            uid: `${user?.uid}`,
            email: `${user?.email}`,
          })
          .then((response) => {
            setStatus(response.data);
          }).finally(status && direction2());
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => console.log("sign Out"));
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const uid = user.uid;
      } else {
        // User is signed out
        // ...
        console.log("user is Sign Out");
      }
    });
  }, []);

  return { signInwithGoogle, user, registerUser, loginUser, logout, status };
};

export default useFirebase;
