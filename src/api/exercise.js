import {Api} from "@/api/api";

export {ExerciseApi}

class ExerciseApi {

    static getUrl(slug) {
        return `${Api.baseUrl}/exercises${slug ? `/${slug}` : ''}`
    }
    static getImageUrl(exerciseId, imageId){
        return `${ExerciseApi.getUrl(exerciseId)}/images${imageId?`/${imageId}`:''}`
    }
    static getVideoUrl(exerciseId,videoId){
        return `${ExerciseApi.getUrl(exerciseId)}/videos/${videoId?`/${videoId}`:''}`
    }
// body{
//     name: "Jumping Jacks",
//     detail: "Jumping Jacks",
//     type: "exercise",
//     metadata: null
// }
    static async add(body) {
        return await Api.post(ExerciseApi.getUrl(), true, body)
    }

//     body:{
//     name: "Jumping Jacks",
//     detail: "Jumping Jacks",
//     type: "exercise",
//     metadata: null
// }
    static async modify(exercisesId, body){
        return await Api.put(ExerciseApi.getUrl(exercisesId),true, body)
    }

    static async delete(exercisesId){
        return await Api.delete(ExerciseApi.getUrl(exercisesId),true)
    }

    static async get(exercisesId){
        return await Api.get(ExerciseApi.getUrl(exercisesId),true)
    }

    static async getAll(){
        return await Api.get(ExerciseApi.getUrl(),true)
    }
    static async getImages(exerciseId){
        return await Api.get(ExerciseApi.getImageUrl(exerciseId),true)
    }
// body:{
//     number: 1,
//     url: "https://flic.kr/p/23K29gx"
// }
    static async addImage(exerciseId, body){
        return await Api.get(ExerciseApi.getImageUrl(exerciseId),true,body)
    }
    static async getImage(exerciseId, imageId){
        return await Api.get(ExerciseApi.getImageUrl(exerciseId,imageId),true)
    }
// body:{
//     number: 1,
//     url: "https://flic.kr/p/23K29gx"
// }
    static async modifyImage(exerciseId, imageId,body){
        return await Api.post(ExerciseApi.getImageUrl(exerciseId,imageId),true,body)
    }
    static async deleteImage(exerciseId,imageId){
        return await Api.delete(ExerciseApi.getImageUrl(exerciseId,imageId),true)
    }
    static async getVideos(exerciseId){
        return await Api.get(ExerciseApi.getVideoUrl(exerciseId),true)
    }
// body:{
//     number: 1,
//     url: "https://www.youtube.com/watch?v=XYZ"
// }
    static async addVideo(exerciseId,body){
        return await Api.post(ExerciseApi.getVideoUrl(exerciseId),true,body)
    }
    static async getVideo(exerciseId, videoId){
        return await Api.post(ExerciseApi.getVideoUrl(exerciseId,videoId),true)
    }
// body:{
//     number: 1,
//     url: "https://www.youtube.com/watch?v=XYZ"
// }
    static async modifyVideo(exerciseId, videoId,body){
        return await Api.put(ExerciseApi.getVideoUrl(exerciseId,videoId),true,body)
    }
    static async removeVideo(exerciseId,videoId){
        return await Api.delete(ExerciseApi.getVideoUrl(exerciseId,videoId),true)
    }
}