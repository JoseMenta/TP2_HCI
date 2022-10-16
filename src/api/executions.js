import {Api} from "@/api/api";

export {ExecutionApi}

class ExecutionApi{
    static getUrl(routineId,page){
        return `${Api.baseUrl}/executions${routineId ?`/${routineId}`:''}${(page === 0 || page) ? `?page=${page}` : ''}`
    }
    static async getExecutions(routineId,page){
        return await Api.get(ExecutionApi.getUrl(routineId,page),true)
    }
// info:{
//     duration: 25 //lo vamos a tomar como los segundos
//     wasModified: false
// }
    static async addExecution(routineId,info){
        return await Api.post(ExecutionApi.getUrl(routineId),true,info)
    }
}