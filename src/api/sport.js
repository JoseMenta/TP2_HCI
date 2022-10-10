import {Api} from "@/api/api";

export {SportApi}

class SportApi{
    static getUrl(id) {
        return `${Api.baseUrl}/sports/${id? `/${id}`:''}`
    }

    static async add(sport,controller){
        return await Api.post(SportApi.getUrl(),true,sport,controller)
    }

    static async modify(sport,controller){
        //uso put para modificar
        return await Api.put(SportApi.getUrl(sport.id),true,sport,controller)
    }

    static async delete(id,controller){
        return await Api.delete(SportApi.getUrl(id),true,controller)
    }

    static async get(id,controller){
        return await Api.get(SportApi.getUrl(id),true,controller)
    }

    static async getAll(controller){
        return await Api.get(SportApi.getUrl(),true,controller)
    }
}
// const sport1 = new Sport(1,2,3)
// const sport2 = JSON.parse('{id:1,name:2}')//no da lo mismo que lo de arriba
// //esto es un objeto generico
// class Sport{
//     constructor(id,name,detail){
//         this.id=id
//         this.name = name
//         this.detail = detail
//     }
// }