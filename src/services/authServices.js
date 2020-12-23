import api from '../config/api'



export async function registerUser(userInfo) {
    // call to server to register user
    const response = await api.post("/user/register", userInfo)
    console.log("got user back from server", response)
    return response.data
}

export async function loginUser(userInfo) {
    // call to server to login user
    // return user info if successful and error if not
    const response = await api.post("/user/login", userInfo)
    console.log("got user back from server", response) 
    return response.data
}

export async function logoutUser() {
    // call to server to logout user
    return api.get("/user/logout")
}


export async function updateUserSettings(settingInfo,username) {
    // call to server to register user
    const response = await api.patch("/user/"+username+"account-settings", settingInfo)
    console.log("got user back from server", response)
    return response.data
}  


export async function uploadProfileImage(image,username) {
    // call to server to register user
    const response = await api.post("/user/"+username+"add-profile-picture", image)
    console.log("got user back from server", response)
    return response.data
}  


export async function updatePreference(userInfo,username) {
    // call to server to register user
    const response = await api.post("/preferences/"+username+"edit", userInfo)
    console.log("got user back from server", response)
    return response.data
}  
