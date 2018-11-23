import { createSelector } from "reselect";

// Find State from redux
const findUid = (state) => state.authReducer
// Selectors

export const makeGetUid = () => createSelector(findUid, uid => uid );


import { get } from 'lodash'
import { createDeepEqualSelector } from '../utils/selector'
// Default State
export const defaultKeys = {
    isFetching: false,
    isReload: true,
    data: [],
    error: '',
}
// Find State in Redux
const findAuthbyPath = (state, key) => get(state.github.keys, key, defaultKeys)
// Selectors
export const makeGetGithubByID = () => createDeepEqualSelector(
    findGithubByID, (github) => github
)