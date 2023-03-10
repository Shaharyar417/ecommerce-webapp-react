import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyAJc2CsL03EuxPoHwlpwUz645CrdV9Wf3s",
    authDomain: "clothing-db-9ede1.firebaseapp.com",
    projectId: "clothing-db-9ede1",
    storageBucket: "clothing-db-9ede1.appspot.com",
    messagingSenderId: "897857484609",
    appId: "1:897857484609:web:44c003248f25cad527d3c0",
    measurementId: "G-EHYNQR76ZK"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    console.log(snapShot);

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error) {
            console.log('error creating user', error.message);
        }

    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider)
export const signInWithRedirect = () => auth.signInWithRedirect(provider);

export default firebase;