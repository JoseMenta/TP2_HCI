import {Api} from "@/api/api";
import {Cycle} from "@/api/cycles";

export {RoutineApi, ACTIONS, TYPES, ApiAction, EditRoutine, NewRoutine, CycleIdMap, DIFICULTY_LEVELS, NEW_ROUTINE_ID};

class RoutineApi {

    static getUrl(slug, page) {
        return `${Api.baseUrl}/routines${slug ? `/${slug}` : ''}${(page === 0 || page) ? `?page=${page}` : ''}`
    }
    static getCycleUrl(routineId,cycleId){
        return `${RoutineApi.getUrl(routineId)}/cycles/${cycleId?`/${cycleId}`:''}`
    }

    static async add(body) {
        return await Api.post(RoutineApi.getUrl(), true, body)
    }

    static async modify(routineId, body){
        return await Api.put(RoutineApi.getUrl(routineId),true, body)
    }

    static async delete(routineId){
        return await Api.delete(RoutineApi.getUrl(routineId),true)
    }

    static async get(routineId){
        return await Api.get(RoutineApi.getUrl(routineId),true)
    }

    static async getAll(page){
        return await Api.get(RoutineApi.getUrl(undefined, page),true)
    }
    static async getCycles(routineId){
        return await Api.get(RoutineApi.getCycleUrl(routineId),true)
    }
    static async addCycle(routineId,info){
        return await Api.post(RoutineApi.getCycleUrl(routineId),true,info)
    }
    static async getCycle(routineId, cycleId){
        return await Api.get(RoutineApi.getCycleUrl(routineId,cycleId),true)
    }
    static async modifyCycle(routineId,cycleId,info){
        return await Api.post(RoutineApi.getCycleUrl(routineId,cycleId),true,info)
    }
    static async deleteCycle(routineId,cycleId){
        return await Api.delete(RoutineApi.getCycleUrl(routineId,cycleId),true)
    }
}

// ----------------------------------------------------------------------------
const ACTIONS = {
    ADD: 'add',
    MODIFY: 'modify',
    DELETE: 'delete',
    // NONE: 'none'
}

const TYPES = {
    ROUTINE: 'routine',
    CYCLE: 'cycle',
    EXERCISE: 'exercise'
}

class ApiAction{
    constructor(type, action, data, clientId, serverId) {
        this.type = type;
        this.action = action;
        this.data = data;
        this.parentId = {
            clientId: clientId,
            serverId: serverId
        }
    }
}

class CycleIdMap{
    constructor(clientId, serverId) {
        this.clientId = clientId;
        this.serverId = serverId;
        this.deleted = false;
    }
}

const DIFICULTY_LEVELS = {
    ROOKIE: {name: 'rookie', value: 1},
    BEGINNER: {name: 'beginner', value: 2},
    INTERMEDIATE: {name: 'intermediate', value: 3},
    ADVANCED: {name: 'advanced', value: 4},
    EXPERT: {name: 'expert', value: 5}
};

const NEW_ROUTINE_ID = 0;

class NewRoutine {
    constructor(){
        this.id = NEW_ROUTINE_ID;
        this.name = '';
        this.detail = '';
        this.score = 0;
        this.isPublic = true;
        this.difficulty = DIFICULTY_LEVELS.ROOKIE;
        this.category = {};
        this.metadata = {
            image: require('@/assets/placeholder.jpg'),
            votes: 0,
            tags: []
        };
        this.nextId = 3;
        this.cycles = Cycle.newInitialRoutine()
    }
}

class EditRoutine{
    constructor(id, name, score, isPublic, difficulty, category, metadata) {
        this.id = id;
        this.name = name;
        this.detail = name;
        this.score = score;
        this.isPublic = isPublic;
        this.difficulty = this.defineDifficulty(difficulty);
        this.category = category;
        this.metadata = metadata;
        this.nextId = 0;
        this.cycles = [];
    }

    defineDifficulty(difficulty){
        switch(difficulty){
            case DIFICULTY_LEVELS.ROOKIE.name:
                return DIFICULTY_LEVELS.ROOKIE;
            case DIFICULTY_LEVELS.BEGINNER.name:
                return DIFICULTY_LEVELS.BEGINNER;
            case DIFICULTY_LEVELS.INTERMEDIATE.name:
                return DIFICULTY_LEVELS.INTERMEDIATE;
            case DIFICULTY_LEVELS.ADVANCED.name:
                return DIFICULTY_LEVELS.ADVANCED;
            default:
                return DIFICULTY_LEVELS.EXPERT.name;
        }
    }
}