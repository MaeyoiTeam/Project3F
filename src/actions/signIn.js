import {FETCH_USER_FAIL,FETCH_USER_SUCCESS,FETCH_USER} from '../constants';
import firebase from '../config/firebase'
import {updateDataUser,updateToken,onOffNotification} from './api';
import { NavigationActions } from 'react-navigation'
import { Button } from 'react-native-elements';
import * as Expo from 'expo';

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

export const signInWithGoogle = ()  => {
    try {
        return async (dispatch) => {
            const result = await Expo.Google.logInAsync({
                androidClientId: '895255967672-7h7v7t5r97c3cpj8rijahirbcqjjcifv.apps.googleusercontent.com',
                iosClientId: '895255967672-bg7pp8ojou3cfrsjqcssm0s6km3nvevq.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            })
        if (result.type === 'success') {
            const provider = firebase.auth.GoogleAuthProvider;
            const credential = provider.credential(null, result.accessToken);
            const data = firebase.auth().signInAndRetrieveDataWithCredential(credential);
            console.log("Work")
        }
        }
        
        
    } catch (e) {
        return {
            error: true
        };
    }
}

export const authChanged = () => async dispatch => {
try{
        firebase.auth().onAuthStateChanged(user => {
        if (user) {
//TODO add UserAchievement
            const token = updateToken(user.uid);
            updateDataUser(user.uid, user.providerData[0]).then((result)=>{
                let questListdone = {};
                if(result.quest!=null){
                    if (result.quest.done != null){
                const quest = result.quest.done;
                Object.keys(quest).map((key) => {
                questListdone = {
                            [key]: Object.keys(quest[key]),
                            ...questListdone
                        }
                    });
                }
            }
            dispatch({
                    type: FETCH_USER_SUCCESS,
                    payload:{   uid:user.uid,
                        displayName: result.displayName,
                        photoURL: result.photoURL+"?width=256",
                        email: result.email,
                        levelQ:result.levelQ,
                        quest: questListdone,
                        star:result.star,
                        achieve:result.achieve,
                        walkStacks:result.walkStacks,
                        pushToken:token,
                        isShowNotification:result.isShowNotification,
                    }
                })}
                );
        } else {
             dispatch(NavigationActions.navigate({routeName:"SignIn"}));
        }
    });
}
catch (e) {
    return {
        error: true
    };
}
};


export const updateIsShowNotification = (user,permission) =>async dispatch => {
    onOffNotification(user,permission).then(result=>dispatch({type: FETCH_USER_SUCCESS,
        payload:result
    }))
}
