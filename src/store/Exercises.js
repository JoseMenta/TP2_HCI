import { defineStore } from 'pinia'

import {ExerciseApi} from "@/api/exercise";

export const useExercises = defineStore('exercises', {
    state:() => ({
        // exercises: [
        //     {
        //         id: 1,
        //         name: 'Burpees',
        //         detail: 'Es un ejercicio muy dificil',
        //         type: 'exercise',
        //         date: null,
        //         image:require('@/assets/Burpee.jpg'),
        //         metadata: null
        //     }, {
        //         id: 2,
        //         name: 'Abdominales',
        //         detail: 'Hay que sacar gluteos',
        //         type: 'exercise',
        //         date: null,
        //         image:require('@/assets/estiramiento.png'),
        //         metadata: null
        //     },
        //     {
        //         id: 3,
        //         name: 'Descanso simple',
        //         detail: 'Simplemente hay que descansar',
        //         type: 'rest',
        //         date: null,
        //         image:require('@/assets/estiramiento.png'),
        //         metadata: null
        //     },
        //     {
        //         id: 4,
        //         name: 'Dominadas',
        //         detail: 'Cuesta una banda',
        //         type: 'exercise',
        //         date: null,
        //         image:require('@/assets/Burpee.jpg'),
        //         metadata: null
        //     },
        //     {
        //         id: 5,
        //         name: 'Descanso con elongacion',
        //         detail: 'Descancar y elongar los musculos trabajados',
        //         type: 'rest',
        //         date: null,
        //         image:require('@/assets/estiramiento.png'),
        //         metadata: null
        //     }
        // ],
        exercises:[]
    }),
    getters: {
        // getExercises() {
        //     return this.exercises
        // },
        // getExerciseById(id) {
        //     const exercise = this.exercises.find((ex) => ex.id === id)
        //     if(!exercise){
        //         return -1;
        //     }
        //     /*          Exercises{
        //                     "id": 1,
        //                     "name": "Jumping Jacks",
        //                     "detail": "Jumping Jacks",
        //                     "type": "exercise",
        //                     "date": 1620062203228,
        //                     "metadata": null
        //                 }*/
        //     return {
        //         id: exercise.id,
        //         name: exercise.name,
        //         detail: exercise.detail,
        //         type: exercise.type,
        //         date: exercise.date,
        //         metadata: exercise.metadata,
        //     }
        // },
        // // Devuelve el indice del ejercicio exercise en el store
        // // -1 si no esta en el store
        // getExerciseIndex(exercise){
        //     return this.exercise.findIndex((exerciseInStore) => {
        //         return exerciseInStore.id === exercise.id
        //     })
        // }

    },
    actions: {
        getExerciseIndex(exercise){
            return this.exercise.findIndex((exerciseInStore) => {
                return exerciseInStore.id === exercise.id
            })
        },
        // Agrega un nuevo ejercicio al store
        // Es void
        addExerciseToStore(exercise) {
            this.exercise.push(exercise);
        },
        // Reemplaza el ejercicio en el indice index del store por exercise
        // Devuelve -1 si index es invalido, 0 en caso de exito
        modifyExerciseInStoreByIndex(index, exercise) {
            if(index >= this.exercise.length || index < 0){
                return -1;
            }
            this.exercise[index] = exercise;
            return 0;
        },
        // Elimina el exercicio en la posicion index
        // Devuelve -1 si index es invalido, 0 en caso de exito
        removeExerciseByIndexFromStore(index) {
            if(index >= this.exercise.length || index < 0){
                return -1;
            }
            this.exercise.splice(index, 1);
            return 0;
        },
        // Elimina los exercicios guardadas en el store y las reemplaza por exercise
        // Es void
        //Esta es peligrosa
        replaceAllExerciseFromStore(exercise) {
            this.exercise = exercise;
        },
        // Agrega el exercicio a la api y, si no estaba, en el store
        // Devuelve la respuesta de la API en caso de exito, -1 en caso de error
        async addExerciseToApi(exercise) {
            try{
                const result = await ExerciseApi.add(exercise);
                return result
            } catch (e) {
                console.log(e);
                return -1;
            }
        },
        getExerciseByIdFromStore(exerciseId){
            return this.exercises.find((ex)=>ex.id===exerciseId)
        },
        async fetchExerciseById(exerciseId){
            try{
                const result = await ExerciseApi.get(exerciseId)
                this.addExerciseToStore(result)
                return result
            }catch (e){
                console.log(e)
                return -1
            }
        },
        // Modifica el exercicio exercise en la API
        // Devuelve la respuesta de la API o -1 en caso de error
        async modifyExerciseInApi(exercise) {
            let result;
            try {
                result = await ExerciseApi.modify(exercise.id, exercise);
            } catch (e){
                console.log(e);
                return -1;
            }
            return result;
        },
        // Elimina el exercicio routine de la Api
        // Devuelve 0 en exito, -1 en caso de error
        async deleteExerciseFromApi(exercise) {
            let result = 0;
            try {
                await ExerciseApi.delete(exercise.id);
            } catch(e) {
                console.log(e);
                result = -1;
            }
            return result;
        },
        // Devuelve el ejercicio cuyo id sea igual a exerciseId (o -1 en caso de error)
        async getExerciseFromApi(exerciseId) {
            let result;
            try {
                result = await ExerciseApi.get(exerciseId);
            } catch(e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Devuelve todaos los exercicios almacenadas en la API (o -1, en caso de error)
        async getExercisesFromApi(){
            let result;
            try {
                result = await ExerciseApi.getAll();
            } catch(e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Guarda los exercicios almacenadas en la Api en el store (lo actualiza)
        // Devuelve 0 en caso de exito, -1 en caso de error
        async fetchExercises(){
            try {
                const apiExercise = await this.getRoutinesFromApi();
                this.replaceAllRoutinesInStore(apiExercise);
            } catch (e) {
                console.log(e);
                return -1;
            }
            return 0;
        },
        // Agrega un exercicio a la API y (si no esta) en el store
        // Devuelve la respuesta del store
        async addExerciseToApiAndStore(exercise){
            const apiExercise = await this.addExerciseToApi(exercise);
            if (this.getExerciseIndex(apiExercise) === -1)
                this.addExerciseToStore(apiExercise);
            return apiExercise
        },
        // Modifica el exercicio routine en Store y API
        // Devuelve un objeto con la respuesta de la api y del store respectivamente (-1 en caso de error para cada uno)
        async modifyExerciseInApiAndStore(exercise){
            const apiResult = await this.modifyRoutineInApi(exercise);
            if(apiResult === -1){
                return {api: apiResult, store: -1};
            }
            const index = this.getRoutineIndex(apiResult);
            const storeResult = this.modifyRoutineByIndexInStore(index, apiResult);
            return {api: apiResult, store: storeResult};
        },
        // Elimina el ejercicio exercise en Store y API
        // Devuelve un objeto con la respuesta de la api y del store respectivamente (-1 en caso de error para cada uno)
        async deleteExerciseFromApiAndStore(exercise){
            const apiResult = await this.deleteExerciseFromApi(exercise);
            if(apiResult === -1){
                return {api: apiResult, store: -1};
            }
            const index = this.getExerciseIndex(apiResult);
            const storeResult = this.removeExerciseByIndexFromStore(index);
            return {api: apiResult, store: storeResult}
        },
        //todas funciones wrappers de las funciones de la ExerciseApi
        async getImages(exerciseId){
            return await ExerciseApi.getImages(exerciseId);
        },
        async addImage(exerciseId, body){
            return await ExerciseApi.addImage(exerciseId, body);
        },
        async getImage(exerciseId, imgId){
            return await ExerciseApi.getImage(exerciseId, imgId);
        },
        async modifyImage(exerciseId, imgId){
            return await ExerciseApi.modifyImage(exerciseId, imgId);
        },
        async deleteImage(exerciseId,imageId){
            return await ExerciseApi.deleteImage(exerciseId, imageId);
        },
        async getVideos(exerciseId){
            return await ExerciseApi.getVideos(exerciseId);
        },
        async addVideo(exerciseId,body){
            return await ExerciseApi.addVideo(exerciseId,body);
        },
        async getVideo(exerciseId, videoId){
            return await ExerciseApi.getVideo(exerciseId, videoId);
        },
        async modifyVideo(exerciseId, videoId,body){
            return await ExerciseApi.modifyVideo(exerciseId, videoId,body);
        },
        async removeVideo(exerciseId,videoId){
            return await ExerciseApi.removeVideo(exerciseId,videoId);
        }
    },
})