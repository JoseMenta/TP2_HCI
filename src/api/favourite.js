import {Api} from "@/api/api";

export {FavouriteApi}

class FavouriteApi{
    static getUrl(slug, page){
        return `${Api.baseUrl}/favourites${(slug) ? `/${slug}`:''}${(page === 0 || page) ? `?page=${page}` : ''}`
    }
    //devuelve las rutinas favoritas del usuario
    static async getFavourites(page){
        return await Api.get(FavouriteApi.getUrl(undefined, page),true)
    }
    //agrega una nueva rutina a las favoritas del usuario
    static async addFavourite(routineId){
        return await Api.post(FavouriteApi.getUrl(routineId),true,{})
    }
    //Elimina una rutina de las favoritas del usuario
    static async deleteFavourite(routineId){
        return await Api.delete(FavouriteApi.getUrl(routineId),true,{})
    }
}