import {defineStore} from "pinia";

import {ExerciseCycleApi} from "@/api/cycles";

import {useExercises} from "@/store/Exercises";
const exercisesStore = useExercises();

export const useCycleExercises = defineStore('cycleExercises', {
    // Estructura: Arreglo de ciclos de una misma rutina
    //      - cycles: Arreglo de ciclos
    //          - cycle: Un ciclo
    //              - id: ID del ciclo
    //              - data: Informacion del ciclo
    state: () => ({
        cycles: [],
        exerciseSelectedId: -1
    }),
    getters: {
        // Devuelve la informacion del ejercicio cuyo id este almacenado en exerciseSelectedId
        getExerciseSelectedIdData(){
            if(this.exerciseSelectedId === -1){
                return {};
            }
            return exercisesStore.getExerciseByIdFromStore(this.exerciseSelectedId);
        }
    },
    actions: {
        // Establece el nuevo valor de exerciseSelectedId en el store
        setExerciseSelectedId(id){
            this.exerciseSelectedId = id;
        },
        setExerciseSelectedIdAsRest(){
            const restCard = exercisesStore.getRestExercise;
            this.setExerciseSelectedId(restCard.id);
        },
        // Devuelve los ejercicios del ciclo con id cycleId
        // Devuelve undefined si no existe
        getCycle(cycleId){
            return this.cycles.find((cycle) => cycle.id === cycleId).data;
        },
        // Devuelve el indice del ejercicio con id exerciseId en el ciclo con id cycleId
        // Devuelve -1 si no existe
        findExerciseIndexInCycle(cycleId, exerciseId){
            const cycle = this.getCycle(cycleId);
            if(!cycle){
                return -1;
            }
            return cycle.content.findIndex((exercise) => exercise.id === exerciseId);
        },
        // Agrega el ejercicio exercise al ciclo con id cycleId
        // Devuelve -1 en caso de error, 0 en caso de exito
        addExerciseToCycleInStore(cycleId, exercise){
            const cycle = this.getCycle(cycleId);
            if(!cycle){
                return -1;
            }
            cycle.totalCount++;
            cycle.content.push(exercise);
            return 0;
        },
        // Elimina el ejercicio exercise del ciclo con id cycleId
        // Devuelve -1 en caso de error, 0 en caso de exito
        deleteExerciseFromCycleInStore(cycleId, exerciseId){
            const cycle = this.getCycle(cycleId);
            if(!cycle){
                return -1;
            }
            const exerciseIndex = this.findExerciseIndexInCycle(cycleId, exerciseId);
            if(exerciseIndex === -1){
                return -1;
            }
            cycle.content.splice(exerciseIndex, 1);
            return 0;
        },
        // Modifica el ejercicio exercise del ciclo con id cycleId
        // Devuelve -1 en caso de error, 0 en caso de exito
        modifyExerciseFromCycleInStore(cycleId, exercise){
            const cycle = this.getCycle(cycleId);
            if(!cycle){
                return -1;
            }
            const exerciseIndex = this.findExerciseIndexInCycle(cycleId, exercise.id);
            if(exerciseIndex === -1){
                return -1;
            }
            cycle.content[exerciseIndex] = exercise;
            return 0;
        },
        // Borra los datos del store
        restartStore(){
            this.cycles = []
        },
        // Agrega el ejercicio con id exerciseId al ciclo con id cycleId en la API
        // data almacena su orden de ejecución, el tiempo y la cantidad de repeticiones
        // Devuelve el resultado en caso de exito, -1 en caso de error
        async addExerciseToCycleInApi(cycleId, exerciseId, data){
            let result;
            try {
                result = await ExerciseCycleApi.addExercise(cycleId, exerciseId, data);
            } catch (e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Modifica los datos de ejecucion del ejercicio con id exerciseId en el ciclo con id cycleId en la api
        // Devuelve el resultado de la API en caso de exito, -1 en caso de error
        async modifyExerciseFromCycleInApi(cycleId, exerciseId, data){
            let result;
            try {
                result = await ExerciseCycleApi.modifyExercise(cycleId, exerciseId, data);
            } catch (e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Elimina el ejercicio con id exerciseId del ciclo con id cycleId
        // Devuelve 0 en caso de exito, -1 en caso de error
        async deleteExerciseFromCycleInApi(cycleId, exerciseId){
            try {
                await ExerciseCycleApi.deleteExercise(cycleId, exerciseId)
            } catch (e) {
                console.log(e);
                return -1;
            }
            return 0;
        },
        // OJO: Para evitar problemas, primero se debe limpiar el store con restartStore
        // Agrega los ejercicios del ciclo con id cycleId al store
        async fetchCycleExercises(cycleId){
            let result;
            try {
                result = await ExerciseCycleApi.getExercises(cycleId);
            } catch (e) {
                console.log(e);
                return -1;
            }
            this.cycles.push({id: cycleId, data: result});
            return 0;
        },
        // Agrega el ejercicio con id exerciseId al ciclo con id cycleId con la informacion data al Store y API
        // Devuelve un objeto con la respuesta de la api y del store respectivamente (-1 en caso de error para cada uno)
        async addExerciseToCycle(cycleId, exerciseId, data){
            let apiResult;
            try {
                apiResult = await this.addExerciseToCycleInApi(cycleId, exerciseId, data)
            } catch (e){
                console.log(e);
                return {api: -1, store: -1};
            }
            const storeResult = this.addExerciseToCycleInStore(cycleId, apiResult);
            return {api: apiResult, store: storeResult};
        },
        // Modifica el ejercicio con id exerciseId al ciclo con id cycleId con la informacion data al Store y API
        // Devuelve un objeto con la respuesta de la api y del store respectivamente (-1 en caso de error para cada uno)
        async modifyExerciseFromCycle(cycleId, exerciseId, data){
            let apiResult;
            try {
                apiResult = await this.modifyExerciseFromCycleInApi(cycleId, exerciseId, data);
            } catch (e) {
                console.log(e);
                return {api: -1, store: -1};
            }
            const storeResult = this.modifyExerciseFromCycleInStore(cycleId, apiResult);
            return {api: apiResult, store: storeResult};
        },
        // Elimina el ejercicio con id exerciseId del ciclo con id cycleId en el Store y la API
        // Devuelve un objeto con la respuesta de la api y del store respectivamente (-1 en caso de error para cada uno)
        async deleteExerciseFromCycle(cycleId, exerciseId){
            let apiResult;
            try {
                apiResult = await this.deleteExerciseFromCycleInApi(cycleId, exerciseId);
            } catch (e) {
                console.log(e);
                return {api: -1, store: -1};
            }
            const storeResult = this.deleteExerciseFromCycleInStore(cycleId, exerciseId);
            return {api: apiResult, store: storeResult};
        }
    }
})