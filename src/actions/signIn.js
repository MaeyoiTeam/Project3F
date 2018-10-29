import {FETCH_USER,FETCH_USER_FAIL,FETCH_USER_SUCCESS} from '../constants';
import firebase from '../config/firebase'
import loadData,{updateDataUser} from './api';
export const signOut = () => dispatch => {
    firebase.auth().signOut().then(() => {
        console.log("SignOut");
        dispatch({
                type: FETCH_USER_FAIL
            });
    }).catch((err) => {
        console.log(err);
    })
}

export const signInWithFacebook = () => async dispatch => {

    try {
        const {
            type,
            token
        } = await Expo.Facebook.logInWithReadPermissionsAsync('345061262917638', {
            permissions: ['public_profile']
        });
        if (type === 'success') {
            // Build Firebase credential with the Facebook access token.
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            // Sign in with credential from the Facebook user.
            const data = firebase.auth().signInAndRetrieveDataWithCredential(credential);
        }
    } catch (e) {
        return {
            error: true
        };
    }
}

export const signInWithGoogle = async () => {
    try {
        const result = await Expo.Google.logInAsync({
            androidClientId: '895255967672-7h7v7t5r97c3cpj8rijahirbcqjjcifv.apps.googleusercontent.com',
            iosClientId: '895255967672-bg7pp8ojou3cfrsjqcssm0s6km3nvevq.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });
        if (result.type === 'success') {
            const provider = firebase.auth.GoogleAuthProvider;
            const credential = provider.credential(null, result.accessToken);
            return firebase.auth().signInAndRetrieveDataWithCredential(credential);
        } else {
            return {
                cancelled: true
            };
        }
    } catch (e) {
        return {
            error: true
        };
    }
}

export const fetchUser = () => dispatch => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            updateDataUser(user.uid, user.providerData[0]);
                dispatch({
                    type: FETCH_USER_SUCCESS,
                    payload:{ uid:user.uid,
                        displayName:user.providerData[0].displayName,
                        photoURL:user.providerData[0].photoURL,
                        email:user.providerData[0].email
                    }
                });
        } else {
            console.log("Work")
            dispatch({
                type: FETCH_USER_FAIL
            });
        }
    });
};