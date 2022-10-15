import {defineStore} from "pinia";

import {FavouriteApi} from "@/api/favourite";

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
        async getFavouritesFromApi(page){
            let result;
            try {
                result = await FavouriteApi.getFavourites(page);
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
            let apiResult, result, page = 0;
            do {
                apiResult = await this.getFavouritesFromApi(page);
                if(apiResult === -1){
                    return -1;
                }
                if(page === 0){
                    result = apiResult;
                } else {
                    apiResult.content.forEach((routine) => result.content.push(routine));
                }
                page++;
            } while(!apiResult.isLastPage);
            this.updateFavouritesInStore(result);
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