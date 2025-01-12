import { getLocalStorageWithTime } from "../helpers"

// Reducer track state of a user
const userReducer = (state = getLocalStorageWithTime('access_token') ? JSON.parse(getLocalStorageWithTime('access_token')) : null, action) => {
    console.log('1')
    switch (action.type) {
        case 'LOGIN':
            console.log('login')
            return action.payload
        case 'LOGOUT':
            console.log('logout')
            return null
        default:
            console.log('default')
            return getLocalStorageWithTime('access_token')
    }
}

export default userReducer;