import { defineStore } from 'pinia'

import { RoutineApi } from "@/api/routine";

import {useFavourites} from "@/store/Favourites";

// import {useUsers} from "@/store/User";

// Rutinas:
//      - id: Identificador de la rutina
//      - name: Nombre de la rutina (*)
//      - detail: URL de la imagen (*)
//      - date: Fecha de creacion de la rutina
//      - score: Cantidad de estrellas de la rutina
//      - isPublic: True por default (*)
//      - difficulty: Nivel de dificultad (Rookie, Beginner, Intermediate, Advanced, Expert) (*)
//      - user: Datos del creador (id, username, avatarUrl, date, lastActivity)
//      - category: Categoria de la rutina (id, name, detail)
//      - cycles: Arreglo de bloques de la rutina
//      - metadata:
//          - slug: link de la rutina
//          - votes: Cantidad de votos que tiene la rutina
//          - tags: Tags asociados a la rutina

const DIFICULTY_LEVELS = {
    ROOKIE: 'rookie',
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert'
};

const example = {
    id: 0,
    name: 'Fulbo',
    detail: require('@/assets/lionel-messi.webp'),
    date: 1602646871112,
    score: 4,
    isPublic: true,
    difficulty: DIFICULTY_LEVELS.ROOKIE,
    user: {
        id: 0,
        username: 'raulsarmiento@mail.com',
        avatarUrl: require('@/assets/avatar.jpg'),
        date: 1602139940660,
        lastActivity: 1602646870971
    },
    category: {
        id: 0,
        name: 'Full body',
        detail: 'Full body'
    },
    metadata: {
        slug: 'fulbo',
        votes: 2340,
        tags: ['Pelota', 'Equipo', 'Fútbol']
    }
};

export const useRoutines = defineStore('routines', {
    state:()=>({
        routines: []
    }),
    getters: {
        // Devuelve todas las rutinas almacenadas en cache
        getRoutines(){
            return this.routines.map((routine) => this.returnRoutineInfo(routine));
        },
        getRoutinesFromCurrentUser(){
            // TODO: Users.js
            // const usersStore = useUsers();
            // const currentUser = usersStore.getCurrentUser();
            // return this.getRoutinesFromUserId(currentUser.id);
            return this.getRoutinesFromUserId(0);
        },
        getFavouriteRoutinesFromCurrentUser(){
            const favouritesStore = useFavourites();
            return favouritesStore.getFavouriteRoutines.map((routine) => this.getRoutineById(routine.id))
        }
    },
    actions: {
        // Dada una rutina, devuelve toda su informacion
        returnRoutineInfo(routine){
            return {
                id:routine.id,
                name:routine.name,
                detail: routine.detail,
                date: routine.date,
                score: routine.score,
                isPublic: routine.isPublic,
                difficulty: routine.difficulty,
                user: routine.user,
                category: routine.category,
                metadata:routine.metadata,
            }
        },
        // Devuelve la rutina por id
        // Devuelve -1 si no existe rutina con dicho id
        getRoutineById(id){
            const routine = this.routines.find((routine) => routine.id === id);
            if(!routine){
                return -1;
            }
            return this.returnRoutineInfo(routine);
        },
        // Devuelve la rutina por nombre
        // Devuelve -1 si no existe rutina con dicho nombre
        getRoutineByName(name){
            const routine = this.routines.find((routine) => routine.name === name);
            if(!routine){
                return -1;
            }
            return this.returnRoutineInfo(routine);
        },
        // Devuelve el indice de la rutina routine en el store
        // -1 si no esta en el store
        getRoutineIndex(routine){
            return this.routines.findIndex((routineInStore) => {
                return routineInStore.id === routine.id
            })
        },
        // Devuelve aquellas rutinas cuyo creador tenga el mismo id que userId
        getRoutinesFromUserId(userId){
            const routines = this.routines.filter((routine) => routine.user.id === userId);
            return routines.map((routine) => this.returnRoutineInfo(routine));
        },
        // Devuelve true si la rutina con id routineId es una rutina del usuario con id userId
        isRoutineFromUserId(userId, routineId){
            const userIdRoutines = this.getRoutinesFromUserId(userId);
            return userIdRoutines.map((routine) => routine.id).includes(routineId);
        },
        // Agrega una nueva rutina al store
        // Es void
        addRoutineToStore(routine) {
            this.routines = Array.from(this.routines);
            this.routines.push(routine);
        },
        // Reemplaza la rutina en el indice index del store por routine
        // Devuelve -1 si index es invalido, 0 en caso de exito
        modifyRoutineByIndexInStore(index, routine) {
            if(index >= this.routines.length || index < 0){
                return -1;
            }
            this.routines[index] = routine;
            return 0;
        },
        // Elimina la rutina en la posicion index
        // Devuelve -1 si index es invalido, 0 en caso de exito
        removeRoutineByIndexInStore(index) {
            if(index >= this.routines.length || index < 0){
                return -1;
            }
            this.routines.splice(index, 1);
            return 0;
        },
        // Elimina las rutinas guardadas en el store y las reemplaza por routines
        // Es void
        replaceAllRoutinesInStore(routines) {
            this.routines = routines;
        },
        // Agrega la routine a la api y, si no estaba, en el store
        // Devuelve la respuesta de la API en caso de exito, -1 en caso de error
        async addRoutineToApi(routine) {
            let result;
            try{
                result = await RoutineApi.add(routine);
            } catch (e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Modifica la rutina routine en la API
        // Devuelve la respuesta de la API o -1 en caso de error
        async modifyRoutineInApi(routine) {
            let result;
            try {
                result = await RoutineApi.modify(routine);
            } catch (e){
                console.log(e);
                return -1;
            }
            return result;
        },
        // Elimina la rutina routine de la Api
        // Devuelve 0 en exito, -1 en caso de error
        async deleteRoutineInApi(routine) {
            let result = 0;
            try {
                await RoutineApi.delete(routine.id);
            } catch(e) {
                console.log(e);
                result = -1;
            }
            return result;
        },
        // Devuelve la rutina cuyo id sea igual a routineId (o -1 en caso de error)
        async getRoutineInApi(routineId) {
            let result;
            try {
                result = await RoutineApi.get(routineId);
            } catch(e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Devuelve todas las rutinas almacenadas en la API (o -1, en caso de error)
        async getRoutinesFromApi(){
            let result;
            try {
                result = await RoutineApi.getAll();
            } catch(e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Guarda las rutinas almacenadas en la Api en el store (lo actualiza)
        // Devuelve 0 en caso de exito, -1 en caso de error
        async fetchRoutines(){
            const apiRoutines = await this.getRoutinesFromApi();
            if(apiRoutines === -1){
                return -1;
            }
            this.replaceAllRoutinesInStore(apiRoutines);
            // TODO: Prueba -----------
            this.addRoutineToStore(example);
            // TODO: Prueba ---------
            return 0;
        },
        // Agrega una rutina a la API y (si no esta) en el store
        // Devuelve la respuesta de la API
        async addRoutine(routine){
            const apiResult = await this.addRoutineToApi(routine);
            if (this.getRoutineIndex(apiResult) === -1)
                this.addRoutineToStore(apiResult);
            return apiResult
        },
        // Modifica la rutina routine en Store y API
        // Devuelve un objeto con la respuesta de la api y del store respectivamente (-1 en caso de error para cada uno)
        async modifyRoutine(routine){
            const apiResult = await this.modifyRoutineInApi(routine);
            const index = this.getRoutineIndex(routine);
            const storeResult = this.modifyRoutineByIndexInStore(index, routine);
            return {api: apiResult, store: storeResult};
        },
        // Elimina la rutina routine en Store y API
        // Devuelve un objeto con la respuesta de la api y del store respectivamente (-1 en caso de error para cada uno)
        async deleteRoutine(routine){
            const apiResult = await this.deleteRoutineInApi(routine);
            const index = this.getRoutineIndex(routine);
            const storeResult = this.removeRoutineByIndexInStore(index);
            return {api: apiResult, store: storeResult}
        }
    },
})