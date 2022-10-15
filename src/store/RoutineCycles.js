        import {defineStore} from "pinia";

import {RoutineCyclesApi} from "@/api/cycles";
import {CycleExercise} from "@/api/exercise";

import {useRoutines} from "@/store/Routines";


// const ACTIONS = {
//     ADD: 'add',
//     MODIFY: 'modify',
//     DELETE: 'delete'
// }


// const CycleTypeNames = [{name: CycleTypes.WARMUP}, {name: CycleTypes.EXERCISE}, {name: CycleTypes.COOLDOWN}];


// TODO: PRUEBA --------------------------------------------------------------
// const example = {
//     totalCount: 4,
//     orderBy: 'id',
//     direction: 'asc',
//     content: [
//         {
//             id: 0,
//             name: 'Fast Warmup',
//             detail: 'Fast Warmup',
//             type: 'warmup',
//             order: 1,
//             repetitions: 3,
//             metadata: {}
//         },
//         {
//             id: 1,
//             name: 'Exercise 1',
//             detail: 'Exercise 1',
//             type: 'exercise',
//             order: 2,
//             repetitions: 5,
//             metadata: {}
//         },
//         {
//             id: 2,
//             name: 'Exercise 2',
//             detail: 'Exercise 2',
//             type: 'exercise',
//             order: 3,
//             repetitions: 3,
//             metadata: {}
//         },
//         {
//             id: 3,
//             name: 'Relaxing Cooldown',
//             detail: 'Relaxing Cooldown',
//             type: 'cooldown',
//             order: 4,
//             repetitions: 4,
//             metadata: {}
//         }
//     ],
//     size: 10,
//     page: 0,
//     isLastPage: true
// };
// TODO: PRUEBA --------------------------------------------------------------

export const useRoutineCycles = defineStore('routineCyclesStore', {
    state: () => ({
        cycles: {}
    }),
    getters: {
        // Devuelve los ciclos del ejercicio
        getCycles(){
            if(!this.cycles.content){
                return [];
            }
            return this.cycles.content.sort((cycle1, cycle2) => cycle1.order - cycle2.order);
        }
    },
    actions: {
        // Dado el id de un ciclo, devuelve la informacion del mismo
        // Devuelve -1 si no existe
        getCycleById(cycleId){
            if(!this.cycles.content){
                return -1;
            }
            const cycle = this.cycles.content.find((cycle) => cycle.id === cycleId);
            if(cycle === -1){
                return cycle;
            }
            return cycle;
        },
        // Devuelve el indice del ciclo con id cycleId
        // Devuelve -1 si no lo encuentra
        getCycleIndex(cycleId){
            if(!this.cycles.content){
                return -1;
            }
            return this.cycles.content.findIndex((cycle) => cycle.id === cycleId);
        },
        // Agrega un ciclo de la rutina al store
        addCycleToStore(cycle){
            if(!this.cycles.content){
                this.cycles.totalCount = 0;
                this.cycles.content = [];
            }
            this.cycles.totalCount++;
            this.cycles.content.push(cycle);
        },
        // Modifica el ciclo en el store
        // Devuelve 0 si pudo, -1 si no pudo
        modifyCycleFromStore(cycle){
            if(!this.cycles.content){
                return -1;
            }
            const cycleIndex = this.getCycleIndex(cycle.id);
            if(cycleIndex === -1){
                return -1;
            }
            this.cycles.content[cycleIndex] = cycle;
        },
        // Elimina el ciclo del store
        // Devuelve 0 si pudo, -1 si no pudo
        removeCycleFromStore(cycle){
            if(!this.cycles.content){
                return -1;
            }
            const cycleIndex = this.getCycleIndex(cycle.id);
            if(cycleIndex === -1){
                return -1;
            }
            this.cycles.content.splice(cycleIndex, 1);
        },
        // Actualiza el contenido del store (SE PIERDE LA INFORMACION ANTERIOR)
        updateStore(cyclesInfo){
            this.cycles = cyclesInfo;
        },
        // Obtiene todas los ciclo de la rutina
        // Devuelve el resultado de la API en caso de exito, -1 en caso de error
        async getAllRoutineCycles(routineId, page){
            let result;
            try {
                result = await RoutineCyclesApi.getRoutineCycles(routineId, page);
            } catch (e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Obtiene la informacion de un ciclo por su ID
        // Devuelve el resultado de la API en caso de exito, -1 en caso de error
        async getRoutineCycleByIdFromApi(routineId, cycleId){
            let result;
            try {
                result = await RoutineCyclesApi.getRoutineCycle(routineId, cycleId);
            } catch (e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Agrega un ciclo a la rutina
        // Devuelve la respuesta de la API en caso de exito, -1 en caso de error
        async addRoutineCycleToApi(routineId, cycle){
            let result;
            try {
                result = await RoutineCyclesApi.addCycle(routineId, cycle);
            } catch (e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Modifica un ciclo en la rutina
        // Devuelve la respuesta de la API en caso de exito, -1 en caso de error
        async modifyRoutineCycleToApi(routineId,cycleId,cycle){
            let result;
            try {
                result = await RoutineCyclesApi.modifyCycle(routineId, cycleId, cycle );
            } catch (e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Elimina un ciclo de la rutina
        // Devuelve la respuesta de la API en caso de exito, -1 en caso de error
        async removeRoutineCycleFromApi(routineId, cycleId){
            let result;
            try {
                result = await RoutineCyclesApi.deleteCycle(routineId, cycleId);
            } catch (e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Actualiza el store con los ciclos de la rutina con id routineId
        // Devuelve -1 en caso de error, 0 en caso de exito
        async fetchRoutineCycles(routineId) {
            let apiResult, result, page = 0;
            do {
                apiResult = await this.getAllRoutineCycles(routineId, page)
                if(apiResult === -1){
                    return -1;
                }
                if(page === 0){
                    result = apiResult;
                } else {
                    apiResult.content.forEach((routine) => result.content.push(routine));
                }
                page++;
            } while(!apiResult.isLastPage);
            this.updateStore(result);
            return 0;
        },
        // Agrega un ciclo de la rutina a la API y al store
        // Devuelve un objeto con el resultado de la operacion en la API (api) y en el store (store)
        async addCycleToRoutine(routineId, cycle){
            const apiResult = await this.addRoutineCycleToApi(routineId, cycle);
            if(apiResult === -1){
                return {api: apiResult, store: -1};
            }
            this.addCycleToStore(apiResult);
            return {api: apiResult, store: 0};
        },
        // Actualiza un ciclo de la rutina a la API y al store
        // Devuelve un objeto con el resultado de la operacion en la API (api) y en el store (store)
        async modifyCycleInRoutine(routineId,cycleId, cycle){
            const apiResult = await this.modifyRoutineCycleToApi(routineId,cycleId, cycle);
            if(apiResult === -1){
                return {api: apiResult, store: -1};
            }
            const storeResult = this.modifyCycleFromStore(apiResult);
            return {api: apiResult, store: storeResult};
        },
        // Elimina un ciclo de la rutina a la API y al store
        // Devuelve un objeto con el resultado de la operacion en la API (api) y en el store (store)
        async removeCycleRoutine(routineId,cycleId,cycle){
            const apiResult = await this.removeRoutineCycleFromApi(routineId, cycleId);
            if(apiResult === -1){
                return {api: apiResult, store: -1};
            }
            const storeResult = this.removeCycleFromStore(cycle);
            return {api: apiResult, store: storeResult};
        },

        // ------------------------------------------------------------------------------------
        // Agrega un nuevo ejercicio al final de la rutina
        // Retorna -1 si el ejercicio ya se agrego al ciclo, 0 si no hubo errores
        addExerciseToCycle(cycleId, exerciseId, duration, repetitions){
            const cycle = this.getCycleById(cycleId);
            if(cycle.exercises.length > 0 && cycle.exercises.find((exercise) => exercise.data.id === exerciseId)){
                return -1;
            }
            const exercise = new CycleExercise(exerciseId, cycle.nextExerciseOrder++, duration, repetitions)
            cycle.exercises.push(exercise);

            const routinesStore = useRoutines();
            routinesStore.addNewCycleExercise(cycleId, exercise);
            return 0;
        },

        // Obtiene los ejercicios del ciclo con id cycleId
        getCycleExercises(cycleId){
            const cycle = this.getCycleById(cycleId);
            return cycle.exercises;
        },

        // Elimina el ejercicio con id exerciseId del ciclo con id cycleId
        // Retorna 0 en caso de exito, -1 si el ejercicio no existe en el ciclo
        removeExerciseFromCycle(cycleId, exerciseId){
            const cycle = this.getCycleById(cycleId);
            const exerciseIndex = cycle.exercises.findIndex((exercise) => exercise.data.id === exerciseId);
            if(exerciseIndex === -1){
                return -1;
            }
            cycle.exercises.splice(exerciseIndex, 1);

            const routinesStore = useRoutines();
            routinesStore.deleteCycleExercise(cycleId, exerciseId);
            return 0;
        },

        modifyExerciseFromCycle(cycleId, exerciseId, duration, repetitions){
            const cycle = this.getCycleById(cycleId);
            const exerciseIndex = cycle.exercises.findIndex((exercise) => exercise.data.id === exerciseId);
            if(exerciseIndex === -1){
                return -1;
            }
            cycle.exercises[exerciseIndex].duration = duration;
            cycle.exercises[exerciseIndex].repetitions = repetitions;
            return 0;
        }
    }
})