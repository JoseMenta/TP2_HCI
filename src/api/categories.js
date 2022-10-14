import {Api} from "@/api/api";

export {CategoriesApi}

class CategoriesApi{
    static getUrl(slug){
        return `${Api.baseUrl}/categories${slug? `/${slug}`:''}`
    }

    static async getAll(){
        return await Api.get(CategoriesApi.getUrl(),true)
    }
    static async add(info){
        return await Api.post(CategoriesApi.getUrl(),true,info)
    }
    static async get(categoryId){
        return await Api.get(CategoriesApi.getUrl(categoryId),true)
    }
    static async modify(info){
        return Api.put(CategoriesApi.getUrl(info.id),true,info)
    }
    static async delete(categoryId){
        return Api.delete(CategoriesApi.getUrl(categoryId),true)
    }


}