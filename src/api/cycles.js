import {Api} from "@/api/api";

export {RoutineCyclesApi, ExerciseCycleApi, Cycle};

// Handler para la ciclos de una rutina
class RoutineCyclesApi {
    static getUrl(routineId, cycleId, page){
        return `${Api.baseUrl}/routines/${routineId}/cycles${ (cycleId) ? `/${cycleId}` : ''}${(page === 0 || page) ? `?page=${page}` : ''}`
    }

    static async getRoutineCycles(routineId, page) {
        return await Api.get(RoutineCyclesApi.getUrl(routineId, undefined, page), true);
    }

    static async getRoutineCycle(routineId, cycleId) {
        return await Api.get(RoutineCyclesApi.getUrl(routineId, cycleId), true);
    }

    static async addCycle(routineId, cycleInfo){
        return await Api.post(RoutineCyclesApi.getUrl(routineId), true, cycleInfo);
    }

    static async modifyCycle(routineId, cycleId, cycleInfo) {
        return await Api.put(RoutineCyclesApi.getUrl(routineId, cycleId), true, cycleInfo);
    }

    static async deleteCycle(routineId, cycleId) {
        return await Api.delete(RoutineCyclesApi.getUrl(routineId, cycleId), true);
    }
}

// Handler para los ejercicios de un ciclo
class ExerciseCycleApi{
    static getUrl(cycleId,exerciseId, page){
        return `${Api.baseUrl}/cycles/${cycleId}/exercises${exerciseId?`/${exerciseId}`:''}${(page === 0 || page) ? `?page=${page}` : ''}`
    }
    static async getExercises(cycleId, page){
        return await Api.get(ExerciseCycleApi.getUrl(cycleId, undefined, page),true)
    }
    static async getExercise(cycleId,exerciseId){
        return await Api.get(ExerciseCycleApi.getUrl(cycleId,exerciseId),true)
    }
    static async addExercise(cycleId, exerciseId,info){
        return await Api.post(ExerciseCycleApi.getUrl(cycleId,exerciseId),true,info)
    }
    static async modifyExercise(cycleId, exerciseId,info){
        return await Api.put(ExerciseCycleApi.getUrl(cycleId,exerciseId),true,info)
    }
    static async deleteExercise(cycleId, exerciseId){
        return await Api.delete(ExerciseCycleApi.getUrl(cycleId,exerciseId),true)
    }
}

export const CycleTypes = {
    WARMUP: 'warmup',
    EXERCISE: 'exercise',
    COOLDOWN: 'cooldown'
}

class Cycle {
    constructor(id, name, detail, type, order, repetitions, metadata, exercises, nextExerciseOrder) {
        this.id = id;
        this.name = name;
        this.detail = detail;
        this.type = type;
        this.order = order;
        this.repetitions = repetitions;
        this.metadata = metadata;
        this.exercises = exercises;
        this.nextExerciseOrder = nextExerciseOrder;
    }

    // Devuelve los ciclos de una rutina nueva
    static newInitialRoutine(){
        return [
            new Cycle(0, '', '', CycleTypes.WARMUP, 1, 3, {deletable: false}, [], 1),
            new Cycle(1, '', '', CycleTypes.EXERCISE, 2, 3, {deletable: false}, [], 1),
            new Cycle(2, '', '', CycleTypes.COOLDOWN, 3, 3, {deletable: false}, [], 1),
        ];
    }

    static newRoutineCycle() {
        return new Cycle(-1, '', '', CycleTypes.EXERCISE, -1, 3, {deletable: true}, [], 1);
    }
}