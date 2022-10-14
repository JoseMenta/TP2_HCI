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
        getExercises() {
            // Si hay error, y no se guarda nada en exercises, devuelve un arreglo vacio
            if(!this.exercises.content){
                return [];
            }
            return this.exercises.content;
        },

    },
    actions: {

        //FUnciones usando el Store No son Await porque ya no usa la conexion al servidor
        getExerciseIndex(exercise){
            if(!this.exercises.content){
                return -1;
            }
            return this.exercises.content.findIndex((exerciseInStore) => {
                return exerciseInStore.id === exercise.id
            })
        },
        addExerciseToStore(exercise) {
            if(!this.exercises.content){
                this.exercises.content = [];
            }
            this.exercises.content.push(exercise);
        },
        // Devuelve -1 si index es invalido, 0 en caso de exito
        modifyExerciseByIndexInStore(index, exercise) {
            if(!this.exercises.content ||  index >= this.exercises.content.length || index < 0){
                return -1;
            }
            this.exercises.content[index] = exercise;
            console.log(this.exercises.content[index])
            return 0;
        },
        // Devuelve -1 si index es invalido, 0 en caso de exito
         removeExerciseByIndexFromStore(index) {
            if(!this.exercises.content){
                return -1;
            }
            if(index >= this.exercises.content.length || index < 0){
                return -1;
            }
             this.exercises.content.splice(index, 1);
            //delete(this.exercises.content.index)
             console.log("ejercicios:")
             console.log(this.exercises.content)

            return 0;
        },
        getExerciseByIdFromStore(exerciseId){
            if(!this.exercises.content){
                return -1;
            }
            return this.exercises.content.find((ex)=>ex.id===exerciseId)
        },
        // OJO! PELIGROSA Elimina los exercicios guardadas en el store y las reemplaza por store
        replaceAllExercisesFromStore(store) {
            this.exercises = store;
        },


        //FUNCIONES CON LA API, AHORA SI SON async
        // Agrega el exercicio a la api y, si no estaba, en el store
        // Devuelve la respuesta de la API en caso de exito, -1 y error por conosla en caso de error
        async addExerciseToApi(exercise) {
            try{
                const result = await ExerciseApi.addExercise(exercise);
                console.log("addExercise > addExerciceToApi")
                console.log(result)
                return result;
            } catch (e) {
                console.log(e);
                return -1;
            }
        },
        async fetchExerciseById(exerciseId){
            try{
                const result = await ExerciseApi.getExercise(exerciseId)
                this.addExerciseToStore(result)
                return result
            }catch (e){
                console.log(e)
                return -1
            }
        },
        // Modifica el exercicio exercise en la API
        // Devuelve la respuesta de la API o -1 en caso de error
        async modifyExerciseInApi(id, exercise) {
            let result;
            try {
                console.log(id)
                console.log(exercise)
                result = await ExerciseApi.modifyExercise(id, exercise);
            } catch (e){
                console.log(e);
                return -1;
            }
            return result;
        },

        async modifyExerciseInApi2(id, exercise) {
            let result;
            try {
                result = await ExerciseApi.modifyExercise(id, exercise);
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
                await ExerciseApi.deleteExercise(exercise.id);
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
                result = await ExerciseApi.getExercise(exerciseId);
            } catch(e) {
                console.log(e);
                return -1;
            }
            return result;
        },


        // Devuelve todos los exercicios almacenadas en la API (o -1, en caso de error)
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
                const apiExercise = await this.getExercisesFromApi();
                this.replaceAllExercisesFromStore(apiExercise);
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

        // Modifica el exercicio en Store y API
        // Devuelve un objeto con la respuesta de la api y del store respectivamente (-1 en caso de error para cada uno)
        async modifyExerciseInApiAndStore(id, exercise){
            const apiResult = await this.modifyExerciseInApi(id, exercise);
            if(apiResult === -1){
                return {api: apiResult, store: -1};
            }
            const index = this.getExerciseIndex(apiResult);
            const storeResult = this.modifyExerciseByIndexInStore(index, apiResult);
            return {api: apiResult, store: storeResult};
        },
        // Elimina el ejercicio exercise en Store y API
        // Devuelve un objeto con la respuesta de la api y del store respectivamente (-1 en caso de error para cada uno)
        async deleteExerciseFromApiAndStore(exercise){
            const apiResult = await this.deleteExerciseFromApi(exercise);
            if(apiResult === -1){
                return {api: apiResult, store: -1};
            }
            const index = this.getExerciseIndex(exercise);
            const storeResult = this.removeExerciseByIndexFromStore(index);
            return {api: apiResult, store: storeResult}
        },
        //todas funciones wrappers de las funciones de la ExerciseApi
        async getImages(exerciseId){
            return await ExerciseApi.getImages(exerciseId);
        },
        async addImage(exerciseId, img){
            return await ExerciseApi.addImage(exerciseId, img);
        },
        async getImage(exerciseId, imgId){
            return await ExerciseApi.getImage(exerciseId, imgId);
        },
        async modifyImage(exerciseId, img){
            return await ExerciseApi.modifyImage(exerciseId, img);
        },
        async deleteImage(exerciseId,imageId){
            return await ExerciseApi.deleteImage(exerciseId, imageId);
        },
        async getVideos(exerciseId){
            return await ExerciseApi.getVideos(exerciseId);
        },
        async addVideo(exerciseId, body){
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

