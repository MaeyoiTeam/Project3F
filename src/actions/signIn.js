import {FETCH_USER_FAIL,FETCH_USER_SUCCESS} from '../constants';
import firebase from '../config/firebase'
import {updateDataUser} from './api';
import { NavigationActions } from 'react-navigation'
export const signOut = () => dispatch => {
    firebase.auth().signOut().then(() => {
        dispatch({
                type: FETCH_USER_FAIL
            });
    }).catch((err) => {
        console.log(err);
    })
}

export const signInWithFacebook = () => async dispatch => {

    try {
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('345061262917638', {
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
        })
        if (result.type === 'success') {
            const provider = firebase.auth.GoogleAuthProvider;
            const credential = provider.credential(null, result.accessToken);
            const data = firebase.auth().signInAndRetrieveDataWithCredential(credential);
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
            console.log("Work")
            updateDataUser(user.uid, user.providerData[0]).then((result)=>{
            dispatch({
                    type: FETCH_USER_SUCCESS,
                    payload:{   uid:user.uid,
                        displayName: result.displayName,
                        photoURL: result.photoURL+"?width=512",
                        email: result.email,
                        levelQ:result.levelQ
                    }
                })}
                );
                
        } else {
             dispatch(NavigationActions.navigate({routeName:"SignIn"}));
            dispatch({
                type: FETCH_USER_FAIL
            });
        }
    });
};