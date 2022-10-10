import {Api} from "@/api/api";

export {RoutineApi}

class RoutineApi {

    static getUrl(slug) {
        return `${Api.baseUrl}/routines${slug ? `/${slug}` : ''}`
    }
    static getCycleUrl(routineId,cycleId){
        return `${RoutineApi.getUrl(routineId)}/cycles/${cycleId?`/${cycleId}`:''}`
    }
    static getSportUrl(routineId,sportId){
        return `${RoutineApi.getUrl(routineId)}/sport/${sportId?`/${sportId}`:''}`
    }
    static async add(body) {
        return await Api.post(RoutineApi.getUrl(), true, body)
    }

    // body:{
    // "name": "7 x 4 Challenge",
    // "detail": "Full Body 7 x 4 Challenge",
    // "isPublic": true,
    // "difficulty": "rookie",
    // "category": {
    //     "id": 1
    // },
    // "metadata": null
// }
    static async modify(routineId, body){
        return await Api.put(RoutineApi.getUrl(routineId),true, body)
    }

    static async delete(routineId){
        return await Api.delete(RoutineApi.getUrl(routineId),true)
    }

    static async get(routineId){
        return await Api.get(RoutineApi.getUrl(routineId),true)
    }

    static async getAll(){
        return await Api.get(RoutineApi.getUrl(),true)
    }
    static async getCycles(routineId){
        return await Api.get(RoutineApi.getCycleUrl(routineId),true)
    }
// info:{
//     name: "Fast Warmup",
//     detail: "Fast Warmup",
//     type: "warmup",
//     order: 1,
//     repetitions: 1,
//     metadata: null
// }
    static async addCycle(routineId,info){
        return await Api.post(RoutineApi.getCycleUrl(routineId),true,info)
    }
    static async getCycle(routineId, cycleId){
        return await Api.get(RoutineApi.getCycleUrl(routineId,cycleId),true)
    }
//     info:{
//     name: "Fast Warmup",
//     detail: "Fast Warmup",
//     type: "warmup",
//     order: 1,
//     repetitions: 1,
//     metadata: null
// }
    static async modifyCycle(routineId,cycleId,info){
        return await Api.post(RoutineApi.getCycleUrl(routineId,cycleId),true,info)
    }
    static async deleteCycle(routineId,cycleId){
        return await Api.delete(RoutineApi.getCycleUrl(routineId,cycleId),true)
    }
    static async getSports(routineId){
        return await Api.get(RoutineApi.getSportUrl(routineId),true)
    }
    static async addSport(routineId,sportId){
        return await Api.post(RoutineApi.getSportUrl(routineId,sportId),true)
    }
    static async removeSport(routineId,sportId){
        return await Api.delete(RoutineApi.getSportUrl(routineId,sportId),true)
    }
}