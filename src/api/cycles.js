import {Api} from "@/api/api";

export {CycleApi}

class CycleApi{
    static getUrl(cycleId,exerciseId){
        return `${Api.baseUrl}/cycles/${cycleId}/exercises/${exerciseId?`/${exerciseId}`:''}`
    }
    static async getExercises(cycleId){
        return await Api.get(CycleApi.getUrl(cycleId),true)
    }
    static async getExercise(cycleId,exerciseId){
        return await Api.get(CycleApi.getUrl(cycleId,exerciseId),true)
    }
// info:{
//     order: 1,
//     duration: 30,
//     repetitions: 0
// }
    static async addExercise(cycleId, exerciseId,info){
        return await Api.post(CycleApi.getUrl(cycleId,exerciseId),true,info)
    }
// info:{
//     order: 1,
//     duration: 30,
//     repetitions: 0
// }
    static async modifyExercise(cycleId, exerciseId,info){
        return await Api.put(CycleApi.getUrl(cycleId,exerciseId),true,info)
    }
    static async deleteExercise(cycleId, exerciseId){
        return await Api.delete(CycleApi.getUrl(cycleId,exerciseId),true)
    }
}