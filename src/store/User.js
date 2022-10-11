import { defineStore } from "pinia";
import { UserApi } from "@/api/user";
import { Api } from "@/api/api";

//Esto nos sirve para mantener la sesion iniciada
 const SECURITY_TOKEN_KEY = "security-token";

export const useUsers = defineStore("users", {
    state: () => ({
        user:{},
        token: null,
        newUser:{
            username:'',
            firstName:'',
            lastName:'',
            birthdate:'',
            email:'',
            password:''
        }, //para agregar un usuario
        name:''
    }),
    getters: {
        // // Devuelve true si el usuario esta logueado, false si no
        // isLoggedIn() {
        //     return this.token != null;
        // },
        // getUser(){
        //     return this.user;
        // }
    },
    actions: {
        // Verifica si la sesion del usuario se mantiene
        // initialize() {
        //     //Vemos si esta guardada la autenticacion
        //     const token = localStorage.getItem(SECURITY_TOKEN_KEY);
        //     if (token) {
        //         this.setToken(token);
        //     }
        // },
        async createUser(){
            console.log(this.newUser.firstName)
            console.log(this.newUser.lastName)
            console.log(this.newUser.birthdate)
            console.log(this.newUser.email)
            console.log(this.newUser.password)
            if(this.newUser.firstName&&this.newUser.lastName&&this.newUser.birthdate&&this.newUser.email&&this.newUser.password){
                const user =  await UserApi.create(this.newUser)
                this.user = user
                return user
            }
            throw {error:'missing arguments',
            args:this.newUser}
        },
        // Actualiza el usuario
        // setUser(user) {
        //     this.user = user;
        // },
        // // Actualiza el token para la API
        setToken(token) {
            this.token = token;
            Api.token = token;
        },
        // // Actualiza el token en el localStorage y en la API
        updateToken(token, rememberMe) {
            if (rememberMe)
                localStorage.setItem(SECURITY_TOKEN_KEY, token);
            this.setToken(token);
        },
        // // Elimina el token del localStorage y de la API
        // removeToken() {
        //     localStorage.removeItem(SECURITY_TOKEN_KEY);
        //     this.setToken(null);
        // },
        // // Se loguea a la API (y puede mantener la sesion si rememberMe = true)
        // // Devuelve -1 en caso de error, 0 si pudo loguearse y 1 si los datos son invalidos
        async login(credentials, rememberMe) {
            try {
                const result = await UserApi.login(credentials);
                console.log(result.token);
                this.updateToken(result.token, rememberMe);
            } catch(e){
                console.log(e);
                if(e.code === 400){
                    return 1;
                }
                return -1;
            }
            return 0;
        },
        // // Cierra sesion de la API (y lo elimina del localStorage)
        // // Devuelve -1 en caso de error, 0 si pudo loguearse
        // async logout() {
        //     try {
        //         await UserApi.logout();
        //         this.removeToken();
        //     } catch(e) {
        //         console.log(e);
        //         return -1;
        //     }
        //     return 0;
        // },
        // // Devuelve la información del usuario
        // // Devuelve -1 en caso de error
        // async getCurrentUser() {
        //     if (this.user)
        //         return this.user;
        //     try {
        //         const result = await UserApi.getCurrentUser();
        //         this.setUser(result);
        //         return result;
        //     } catch (e){
        //         console.log(e);
        //         return -1;
        //     }
        // },
        // // Devuelve la información de un usuario por su id
        // // Devuelve -1 en caso de error
        async getUserById(id){
            try {
                const result = await UserApi.getOtherUser(id)
                return result;
            } catch (e) {
                console.log(e);
                return -1;
            }
        },
        // // Reenvia el mail de verificación a email
        // // Devuelve 0 en caso de exito, -1 en caso de error
        // async resendVerification(email) {
        //     try {
        //         await UserApi.resendVerification({email: email});
        //         return 0;
        //     } catch(e) {
        //         console.log(e);
        //         return -1;
        //     }
        // },
        // // Verifica la cuenta
        // // Devuelve 0 en caso de exito, -1 en caso de error y 1 si los datos son invalidos
        async verifyEmail(email, code) {
            try {
                await UserApi.verifyEmail({email: email, code: code});
                return 0;
            } catch(e) {
                console.log(e);
                if(e.code === 400){
                    return 1;
                }
                return -1;
            }
        },
        // // Actualiza el usuario en la API y en el store
        // // Devuelve el resultado de la API, o -1 en caso de error
        // async modifyCurrentUser(user){
        //     let result;
        //     try {
        //         result = await UserApi.modifyCurrentUser(user);
        //         this.setUser(result);
        //     } catch (e){
        //         console.log(e);
        //         return -1;
        //     }
        //     return result;
        // },
        // // Devuelve las rutinas creadas por el usuario, o -1 en caso de error
        // async getCurrentUserRoutines() {
        //     let result;
        //     try {
        //         result = await UserApi.getCurrentUserRoutines();
        //     } catch(e){
        //         console.log(e);
        //         return -1;
        //     }
        //     return result;
        // },
        // // Devuelve las rutinas creadas por el usuario con nombre name
        // // Devuelve -1 en caso de error, 1 si el usuario no existe
        // async getUserRoutinesByName(name){
        //     let users;
        //     try {
        //         users = await UserApi.getAll();
        //     } catch(e){
        //         console.log(e);
        //         return -1;
        //     }
        //     const user = users.find((user) => {
        //         return (user.firstName + ' ' + user.lastName) === name
        //     })
        //     if(!user){
        //         return 1;
        //     }
        //     let result;
        //     try {
        //         result = UserApi.getCurrentUserRoutines(user.id);
        //     } catch(e) {
        //         console.log(e);
        //         return -1;
        //     }
        //     return result;
        // }

    },
});
