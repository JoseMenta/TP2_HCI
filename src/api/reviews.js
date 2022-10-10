import {Api} from "@/api/api";

export {ReviewApi}

class ReviewApi{
    static getUrl(routineId){
        return `${Api.baseUrl}/reviews/${routineId ?`/${routineId}`:''}`
    }
    static async getRoutineReviews(routineId){
        return await Api.get(ReviewApi.getUrl(routineId),true)
    }
// info:{
//     score: 10,
//     review: "Best routine ever!!!"
// }
    static async addReview(routineId,info){
        return await Api.post(ReviewApi.getUrl(routineId),true,info)
    }
}