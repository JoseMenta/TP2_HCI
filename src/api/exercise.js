import {Api} from "@/api/api";

export {ExerciseApi, Exercise, Video}

class ExerciseApi {

    static getUrl(slug) {
        return `${Api.baseUrl}/exercises${slug ? `/${slug}` : ''}`
    }
    static getImageUrl(exerciseId, imageId){
        return `${ExerciseApi.getUrl(exerciseId)}/images${imageId?`/${imageId}`:''}`
    }
    static getVideoUrl(exerciseId,videoId){
        return `${ExerciseApi.getUrl(exerciseId)}/videos${videoId?`/${videoId}`:''}`
    }
// body{
//     name: "Jumping Jacks",
//     detail: "Jumping Jacks",
//     type: "exercise",
//     metadata: null
// }
    static async addExercise(body) {
        return await Api.post(ExerciseApi.getUrl(), true, body)
    }
    static async modifyExercise(exercisesId, body){
        return await Api.put(ExerciseApi.getUrl(exercisesId),true, body)
    }
    static async deleteExercise(exercisesId){
        return await Api.delete(ExerciseApi.getUrl(exercisesId),true)
    }
    static async getExercise(exercisesId){
        return await Api.get(ExerciseApi.getUrl(exercisesId),true)
    }
    static async getAll(){
        return await Api.get(ExerciseApi.getUrl(),true)
    }
    //FUNCIONES SOBRE LAS IMAGENES
//     body:{
//     number: 1,
//     url: "https://flic.kr/p/23K29gx"
// }
    static async getImages(exerciseId){
        return await Api.get(ExerciseApi.getImageUrl(exerciseId),true)
    }
    static async addImage(exerciseId, img){
        return await Api.get(ExerciseApi.getImageUrl(exerciseId),true, img)
    }
    static async getImage(exerciseId, imageId){
        return await Api.get(ExerciseApi.getImageUrl(exerciseId,imageId),true)
    }
    static async modifyImage(exerciseId, img){
        return await Api.post(ExerciseApi.getImageUrl(exerciseId),true, img)
    }
    static async deleteImage(exerciseId,imageId){
        return await Api.delete(ExerciseApi.getImageUrl(exerciseId,imageId),true)
    }
// body:{
//     number: 1,
//     url: "https://www.youtube.com/watch?v=XYZ"
// }
    static async getVideos(exerciseId){
        return await Api.post(ExerciseApi.getVideoUrl(exerciseId),true)
    }
    static async addVideo(exerciseId,video){
        return await Api.post(ExerciseApi.getVideoUrl(exerciseId),true, video)
    }
    static async getVideo(exerciseId, videoId){
        return await Api.get(ExerciseApi.getVideoUrl(exerciseId,videoId),true)
    }
    static async modifyVideo(exerciseId, videoId,video){
        return await Api.put(ExerciseApi.getVideoUrl(exerciseId,videoId),true,video)
    }
    static async removeVideo(exerciseId,videoId){
        return await Api.delete(ExerciseApi.getVideoUrl(exerciseId,videoId),true)
    }
}


class Exercise {
    constructor(name, detail,type, metadata) {
        this.name = name;
        this.detail = detail;
        this.type = type;
        this.metadata = metadata
    }
}

class Video {
    constructor(number, url) {
        this.number = number;
        this.url = url;
    }
}