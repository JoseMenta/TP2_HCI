import {defineStore} from "pinia";

import {FavouriteApi} from "@/api/favourite";

// TODO: Prueba -----------------------------------------------------------------------------

const example = {
    totalCount: 1,
    orderBy: 'id',
    direction: 'asc',
    content: [
        {
            id: 0,
            name: 'Fulbo',
            detail: require('@/assets/lionel-messi.webp'),
            created: 1602646871112,
            score: 4,
            isPublic: true,
            difficulty: 'rookie',
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
            }
        }
    ],
    size: 10,
    page: 0,
    isLastPage: true
};

// TODO: Prueba -----------------------------------------------------------------------------

export const useFavourites = defineStore('favourites', {
    state: () => ({
        favourites: {}
    }),
    getters: {
        getFavourites(){
            return this.favourites;
        },
        getFavouriteRoutines(){
            if(!this.favourites.content){
                return [];
            }
            return this.favourites.content;
        },
    },
    actions: {
        // Devuelve el indice de la rutina routine, -1 si no esta
        getFavouriteRoutineIndex(routine){
            if(!this.favourites.content) {
                return -1;
            }
            return this.favourites.content.findIndex((routineInStore) => {
                return routineInStore.id === routine.id
            });
        },
        // Agrega una rutina a la lista de favoritos
        // Es void
        addFavouriteInStore(routine) {
            this.favourites.totalCount++;
            if(!this.favourites.content){
                this.favourites.content = [];
            }
            this.favourites.content.push(routine);
        },
        // Elimina una rutina de la lista de favoritos
        // Devuelve 0 en caso de exito y -1 en caso de error
        removeFavouriteFromStore(routine) {
            const routineIndex = this.getFavouriteRoutineIndex(routine);
            if(routineIndex === -1){
                return -1;
            }
            this.favourites.content.splice(routineIndex, 1);
            return 0;
        },
        // Actualiza los favoritos en el store
        // Devuelve 0 en caso de exito, -1 en caso de error
        updateFavouritesInStore(favourites){
            this.favourites = favourites;
            return 0;
        },
        // Busca las rutinas favoritas del usuario
        // Devuelve las rutinas en caso de exito, devuelve -1 en caso de error
        async getFavouritesFromApi(){
            let result;
            try {
                result = await FavouriteApi.getFavourites();
            } catch (e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Agrega la rutina con id routineId a la lista de favoritos del usuario
        // Retorna el resultado en caso de exito, -1 en caso de error
        async addFavouriteRoutineToApi(routineId){
            let result;
            try {
                result = await FavouriteApi.addFavourite(routineId);
            } catch (e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Elimina la rutina con id routineId de la lista de favoritos del usuario
        // Retorna el resultado en caso de exito, -1 en caso de error
        async removeFavouriteRoutineToApi(routineId){
            let result;
            try {
                result = await FavouriteApi.deleteFavourite(routineId);
            } catch (e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Añade un favorito a la API y (si no esta) al store
        // Devuelve el resultado de la API
        async addFavourite(routine){
            const apiResult = await this.addFavouriteRoutineToApi(routine.id);
            if(this.getFavouriteRoutineIndex(routine) === -1){
                this.addFavouriteInStore(routine);
            }
            return apiResult;
        },
        // Remueve un favorito y actualiza la lista de favoritos
        // Devuelve -1 en caso de error, 0 en caso de exito
        async removeFavourite(routine) {
            const apiResult = await this.removeFavouriteRoutineToApi(routine.id);
            const storeResult = this.removeFavouriteFromStore(routine);
            return {api: apiResult, store: storeResult};
        },
        // Obtiene las rutinas favoritas del usuario y actualiza el store
        // Devuelve -1 en caso de error, 0 en caso de exito
        async fetchFavourites(){
            const favourites = await this.getFavouritesFromApi();
            // TODO: Prueba
            this.favourites = example;
            // TODO: Prueba
            if(favourites === -1){
                return favourites;
            }
            this.updateFavouritesInStore(favourites);

            return 0;
        },
        // Devuelve true si routineId es una rutina favorita del usuario, false si no
        isRoutineFavourite(routineId){
            if(!this.favourites.content){
                return false;
            }
            return this.favourites.content.map((routine) => routine.id).includes(routineId);
        }
    }
})