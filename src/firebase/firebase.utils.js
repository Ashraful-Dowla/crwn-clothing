import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBwcjIGPu8dFc7RdXc5NaB4wuIU_8GvV2k",
    authDomain: "crwn-db-8f38b.firebaseapp.com",
    databaseURL: "https://crwn-db-8f38b.firebaseio.com",
    projectId: "crwn-db-8f38b",
    storageBucket: "crwn-db-8f38b.appspot.com",
    messagingSenderId: "32593660237",
    appId: "1:32593660237:web:0fec99816d400cdeeecf04"
};


export const createUserProfileDocument = async (userAuth, additionalData) =>{
    //console.log(userAuth);
    if(!userAuth) return ;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};


firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account '});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;