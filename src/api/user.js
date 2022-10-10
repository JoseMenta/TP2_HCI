import {Api} from "@/api/api";

export {UserApi, Credentials}

class UserApi{
    static getUrl(slug){
        return `${Api.baseUrl}/users${slug? `/${slug}`:''}`
    }
    // body:{
//     username: "johndoe",
//     password: "1234567890",
//     firstName: "John",
//     lastName: "Doe",
//     gender: "male",
//     birthdate: 284007600000,
//     email: "johndoe@email.com",
//     phone: "98295822",
//     avatarUrl: "https://flic.kr/p/3ntH2u",
//     metadata: null
// }
    static async create(body){
        return await Api.post(UserApi.getUrl(),false,body)
    }
    static async login(credentials,controller){
        return await Api.post(UserApi.getUrl('login'),false,credentials,controller)
    }

    static async logout(controller){
        return await Api.post(UserApi.getUrl('logout'),true,controller)
    }
// info:{
//     email: "johndoe@email.com",
//     code: "F429F5"
// }
    static async verifyEmail(info){
        return await Api.post(UserApi.getUrl('verify_email'),false,info)
    }
// info:{
//     email: "johndoe@email.com"
// }
    static async resendVerification(info){
        return await Api.post(UserApi.getUrl('resend_verification'),false,info)
    }

    static async getCurrentUser(controller){
        return await Api.get(UserApi.getUrl('current'),true,controller)
    }

    static async getAll(){
        return await Api.get(UserApi.getUrl(), true)
    }
// info:{
//     firstName: "John",
//     lastName: "Doe",
//     gender: "male",
//     birthdate: 284007600000,
//     phone: "98295822",
//     avatarUrl: "https://flic.kr/p/3ntH2u",
//     metadata: null
// }
    static async modifyCurrentUser(info){
        return await Api.put(UserApi.getUrl('current'),true,info)
    }
    static async deleteCurrentUser(){
        return await Api.delete(UserApi.getUrl('current'),true)
    }
    static async getCurrentUserRoutines(){
        return await Api.get(UserApi.getUrl('current/routines'),true)
    }
    static async getOtherUser(userId){
        return await Api.get(UserApi.getUrl(`${userId}`), true)
    }
    static async getOtherUserRoutines(userId){
        return await Api.get(UserApi.getUrl(`${userId}/routines`),true)
    }
    static async getCurrentExecutions(){
        return await Api.get(UserApi.getUrl('current/executions'),true)
    }
    //Obtiene las reviews de un usuario con la informacion de la rutina que valoro
    static async getCurrentReviews(){
        return await Api.get(UserApi.getUrl('current/reviews'),true)
    }
}

class Credentials{
    constructor(username,password) {
        this.username = username
        this.password = password
    }
}