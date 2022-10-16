import {Api} from "@/api/api";

export {ReviewApi}

class ReviewApi{
    static getUrl(routineId,page){
        return `${Api.baseUrl}/reviews${routineId ?`/${routineId}`:''}${(page === 0 || page) ? `?page=${page}` : ''}`;
    }
    static async getRoutineReviews(routineId,page){
        return await Api.get(ReviewApi.getUrl(routineId,page),true)
    }
// info:{
//     score: 10,
//     review: "Best routine ever!!!"
// }
    static async addReview(routineId,info){
        return await Api.post(ReviewApi.getUrl(routineId),true,info)
    }
}