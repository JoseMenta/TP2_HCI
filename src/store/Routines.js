import { defineStore } from 'pinia'

import { RoutineApi } from "@/api/routine";

import {useFavourites} from "@/store/Favourites";
import {useUsers} from "@/store/User";
import {useCategories} from "@/store/Categories";
import {useRoutineCycles} from "@/store/RoutineCycles";
import {useCycleExercises} from "@/store/CycleExercises";

import {Cycle, CycleTypes} from "@/api/cycles";

const categoriesStore = useCategories();

const routineCyclesStore = useRoutineCycles();

const cycleExercisesStore = useCycleExercises();

// import {useUsers} from "@/store/User";

// Rutinas:
//      - id: Identificador de la rutina
//      - name: Nombre de la rutina (*)
//      - detail: URL de la imagen (*)
//      - date: Fecha de creacion de la rutina
//      - score: Cantidad de estrellas de la rutina
//      - isPublic: True por default (*)
//      - difficulty: Nivel de dificultad (Rookie, Beginner, Intermediate, Advanced, Expert) (*)
//      - user: Datos del creador (id, username, avatarUrl, date, lastActivity)
//      - category: Categoria de la rutina (id, name, detail)
//      - cycles: Arreglo de bloques de la rutina
//      - metadata:
//          - slug: link de la rutina
//          - votes: Cantidad de votos que tiene la rutina
//          - tags: Tags asociados a la rutina

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

export const DIFICULTY_LEVELS = {
    ROOKIE: {name: 'rookie', value: 1},
    BEGINNER: {name: 'beginner', value: 2},
    INTERMEDIATE: {name: 'intermediate', value: 3},
    ADVANCED: {name: 'advanced', value: 4},
    EXPERT: {name: 'expert', value: 5}
};

export const NEW_ROUTINE_ID = -1;

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


export const useRoutines = defineStore('routines', {
    state:()=>({
        routines: [],
        editingRoutine: {},
        actions: [],
        cycleIdMaps: []
    }),
    getters: {
        // Devuelve todas las rutinas almacenadas en cache
        getRoutines(){
            if(!this.routines.content){
                return [];
            }
            return this.routines.content;
        },
        // Devuelve la rutinas creadas por el usuario logueado
        getRoutinesFromCurrentUser(){
            const usersStore = useUsers();
            return this.getRoutinesFromUserId(usersStore.user.id);
            // return this.getRoutinesFromUserId(0);
        },
        // Devuelve las rutinas favoritas del usuario actual
        getFavouriteRoutinesFromCurrentUser(){
            const favouritesStore = useFavourites();
            return favouritesStore.getFavouriteRoutines.map((routine) => this.getRoutineById(routine.id))
        }
    },
    actions: {
        // Devuelve la rutina por id
        // Devuelve -1 si no existe rutina con dicho id
        getRoutineById(id){
            if(!this.routines.content){
                return -1;
            }
            const routine = this.routines.content.find((routine) => routine.id === id);
            if(!routine){
                return -1;
            }
            return routine;
        },
        // Devuelve la rutina por nombre
        // Devuelve -1 si no existe rutina con dicho nombre
        getRoutineByName(name){
            if(!this.routines.content){
                return -1;
            }
            const routine = this.routines.content.find((routine) => routine.name === name);
            if(!routine){
                return -1;
            }
            return routine;
        },
        // Devuelve el indice de la rutina routine en el store
        // -1 si no esta en el store
        getRoutineIndex(routine){
            if(!this.routines.content){
                return -1;
            }
            return this.routines.content.findIndex((routineInStore) => {
                return routineInStore.id === routine.id
            })
        },
        // Devuelve aquellas rutinas cuyo creador tenga el mismo id que userId
        getRoutinesFromUserId(userId){
            if(!this.routines.content){
                return [];
            }
            return this.routines.content.filter((routine) => routine.user.id === userId);
        },
        // Devuelve true si la rutina con id routineId es una rutina del usuario con id userId
        isRoutineFromUserId(userId, routineId){
            const userIdRoutines = this.getRoutinesFromUserId(userId);
            return userIdRoutines.map((routine) => routine.id).includes(routineId);
        },
        // Agrega una nueva rutina al store
        // Es void
        addRoutineToStore(routine) {
            if(!this.routines.content){
                this.routines.content = [];
            }
            this.routines.content.push(routine);
        },
        // Reemplaza la rutina en el indice index del store por routine
        // Devuelve -1 si index es invalido, 0 en caso de exito
        modifyRoutineByIndexInStore(index, routine) {
            if(index >= this.routines.content.length || index < 0){
                return -1;
            }
            this.routines.content[index] = routine;
            return 0;
        },
        // Elimina la rutina en la posicion index
        // Devuelve -1 si index es invalido, 0 en caso de exito
        removeRoutineByIndexInStore(index) {
            if(index >= this.routines.content.length || index < 0){
                return -1;
            }
            this.routines.content.splice(index, 1);
            return 0;
        },
        // Elimina las rutinas guardadas en el store y las reemplaza por routines
        // Es void
        replaceAllRoutinesInStore(data) {
            this.routines = data;
        },
        // Agrega la routine a la api y, si no estaba, en el store
        // Devuelve la respuesta de la API en caso de exito, -1 en caso de error
        async addRoutineToApi(routine) {
            let result;
            try{
                result = await RoutineApi.add(routine);
            } catch (e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Modifica la rutina routine en la API
        // Devuelve la respuesta de la API o -1 en caso de error
        async modifyRoutineInApi(routineBody) {
            let result;
            try {
                result = await RoutineApi.modify(routineBody.id, routineBody);
            } catch (e){
                console.log(e);
                return -1;
            }
            return result;
        },
        // Elimina la rutina routine de la Api
        // Devuelve 0 en exito, -1 en caso de error
        async deleteRoutineInApi(routine) {
            let result = 0;
            try {
                await RoutineApi.delete(routine.id);
            } catch(e) {
                console.log(e);
                result = -1;
            }
            return result;
        },
        // Devuelve la rutina cuyo id sea igual a routineId (o -1 en caso de error)
        async getRoutineInApi(routineId) {
            let result;
            try {
                result = await RoutineApi.get(routineId);
            } catch(e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Devuelve todas las rutinas almacenadas en la API (o -1, en caso de error)
        async getRoutinesFromApi(){
            let result;
            try {
                result = await RoutineApi.getAll();
            } catch(e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Guarda las rutinas almacenadas en la Api en el store (lo actualiza)
        // Devuelve 0 en caso de exito, -1 en caso de error
        async fetchRoutines(){
            const apiRoutines = await this.getRoutinesFromApi();
            if(apiRoutines === -1){
                return -1;
            }
            this.replaceAllRoutinesInStore(apiRoutines);
            return 0;
        },
        // Agrega una rutina a la API y (si no esta) en el store
        // Devuelve un objeto con la respuesta de la api y del store respectivamente (-1 en caso de error para cada uno)
        async addRoutine(routine){
            const apiResult = await this.addRoutineToApi(routine);
            if(apiResult === -1){
                return {api: -1, store: -1};
            }
            if (this.getRoutineIndex(apiResult) === -1)
                this.addRoutineToStore(apiResult);
            return {api:apiResult, store: 0}
        },
        // Modifica la rutina routine en Store y API
        // Devuelve un objeto con la respuesta de la api y del store respectivamente (-1 en caso de error para cada uno)
        async modifyRoutine(routineBody){
            const apiResult = await this.modifyRoutineInApi(routineBody);
            if(apiResult === -1){
                return {api: -1, store: -1};
            }
            const index = this.getRoutineIndex(routineBody);
            const storeResult = this.modifyRoutineByIndexInStore(index, routineBody);
            return {api: apiResult, store: storeResult};
        },
        // Elimina la rutina routine en Store y API
        // Devuelve un objeto con la respuesta de la api y del store respectivamente (-1 en caso de error para cada uno)
        async deleteRoutine(routine){
            const apiResult = await this.deleteRoutineInApi(routine);
            if(apiResult === -1){
                return {api: -1, store: -1};
            }
            const index = this.getRoutineIndex(routine);
            const storeResult = this.removeRoutineByIndexInStore(index);
            return {api: apiResult, store: storeResult}
        },

        // -----------------------------------------------------------------------------------------------
        // Deja el estado preparado para crear una nueva rutina
        createNewRoutine() {
            this.actions = [];
            this.editingRoutine = new NewRoutine();
            this.editingRoutine.category = categoriesStore.getCategories[0];

            // Indicamos que vamos a crear una nueva rutina y vamos a agregar 3 ciclos
            this.actions.push(new ApiAction(TYPES.ROUTINE, ACTIONS.ADD, this.editingRoutine));
            this.actions.push(new ApiAction(TYPES.CYCLE, ACTIONS.ADD, this.editingRoutine.cycles[0], this.editingRoutine.id));
            this.actions.push(new ApiAction(TYPES.CYCLE, ACTIONS.ADD, this.editingRoutine.cycles[1], this.editingRoutine.id));
            this.actions.push(new ApiAction(TYPES.CYCLE, ACTIONS.ADD, this.editingRoutine.cycles[2], this.editingRoutine.id));

            // Dado que son ciclos nuevos, no tienen un id de servidor
            this.cycleIdMaps = [
                new CycleIdMap(this.editingRoutine.cycles[0].id),
                new CycleIdMap(this.editingRoutine.cycles[1].id),
                new CycleIdMap(this.editingRoutine.cycles[2].id),
            ];

            // Guardamos en el store de ciclos, los ciclos a editar
            routineCyclesStore.cycles = {
                content: this.editingRoutine.cycles
            }
        },
        // Agrega un nuevo ciclo a la rutina
        addNewCycle(){
            let moveOrder = false;
            let index = 0;
            // Colocamos el nuevo ciclo en la posicion correcta (justo antes de los ejercicios COOLDOWN)
            // Tambien movemos aquellos que iran despues
            for(let cycle of this.editingRoutine.cycles){
                if(!moveOrder && cycle.type === CycleTypes.COOLDOWN){
                    let newCycle = Cycle.newRoutineCycle();
                    newCycle.order = cycle.order;
                    newCycle.id = this.editingRoutine.nextId++;
                    this.editingRoutine.cycles.splice(index, 0, newCycle);
                    // Indicamos que vamos a agregar un nuevo ciclo
                    this.actions.push(new ApiAction(TYPES.CYCLE, ACTIONS.ADD, newCycle, this.editingRoutine.id));
                    // Agregamos un nuevo mapeo de ids de ciclo (Como es un nuevo ciclo, no tiene id de servidor)
                    this.cycleIdMaps.push(new CycleIdMap(newCycle.id))
                    moveOrder = true;
                }
                if(moveOrder){
                    cycle.order++;
                    // // En el caso de una rutina ya creada, si el bloque aun no tuvo ningun efecto, se indica que se modificara su información
                    // if(cycle.action === ACTIONS.NONE){
                    //     this.actions.push(new ApiAction(TYPES.CYCLE, ACTIONS.MODIFY, cycle, this.editingRoutine.id));
                    // }
                }
                index++;
            }
            // Actualizamos los ciclos que se deben mostrar
            routineCyclesStore.cycles = {
                content: this.editingRoutine.cycles
            }
        },
        // Elimina el ciclo con id cycleId de la rutina
        deleteCycle(cycleId){
            let reduceOrder = false;
            let index = 0;
            for(let cycle of this.editingRoutine.cycles){
                if(reduceOrder){
                    cycle.order--;
                    // En el caso de una rutina ya creada, si el bloque aun no tuvo ningun efecto, se indica que se modificara su información
                    // if(cycle.action === ACTIONS.NONE){
                    //     this.actions.push(new ApiAction(TYPES.CYCLE, ACTIONS.MODIFY, cycle, this.editingRoutine.id));
                    // }
                }
                if(cycle.id === cycleId){
                    reduceOrder = true;
                    this.editingRoutine.cycles.splice(index, 1);
                    // Ya sea que el ciclo ya existia en la API o que se crea en esta iteracion, esta accion permitira eliminarlo
                    // Si bien depende de que la llamada a la API no falle, el manejo es mas sencillo que eliminando su accion en
                    // el arreglo (en el caso de que sea un ciclo nuevo)
                    this.actions.push(new ApiAction(TYPES.CYCLE, ACTIONS.DELETE, cycle, this.editingRoutine.id));
                }
                index++;
            }
            // Actualizamos los ciclos que se deben mostrar
            routineCyclesStore.cycles = {
                content: this.editingRoutine.cycles
            }
        },
        // Agrega el ejercicio exercise al ciclo con id cycleId
        addNewCycleExercise(cycleId, exercise){
            // Buscamos el mapeo de id del ciclo cuyo id de cliente es cycleId
            const cycleIdMap = this.cycleIdMaps.find((cycleIdMap) => cycleIdMap.clientId === cycleId);
            // Si no tiene serverId (es un ciclo nuevo), entonces no indicamos que tenemos un id de servidor del padre
            if(!cycleIdMap.serverId){
                this.actions.push(new ApiAction(TYPES.EXERCISE, ACTIONS.ADD, exercise, cycleId));

            }
            // En cambio, si el ciclo ya fue creado (tiene un id en la API), se lo agregamos
            else {
                this.actions.push(new ApiAction(TYPES.EXERCISE, ACTIONS.ADD, exercise, cycleId, cycleIdMap.serverId))
            }
            console.log(this.actions)
        },

        // Elimina el ejercicio con id exerciseId del ciclo con id cycleId
        deleteCycleExercise(cycleId, exerciseId){
            // Buscamos el mapeo de id del ciclo cuyo id de cliente es cycleId
            const cycleIdMap = this.cycleIdMaps.find((cycleIdMap) => cycleIdMap.clientId === cycleId);
            // Si no tiene serverId (es un ciclo nuevo), entonces no indicamos que tenemos un id de servidor del padre
            if(!cycleIdMap.serverId){
                this.actions.push(new ApiAction(TYPES.EXERCISE, ACTIONS.DELETE, exerciseId, cycleId));
            }
            // En cambio, si el ciclo ya fue creado (tiene un id en la API), se lo agregamos
            else {
                this.actions.push(new ApiAction(TYPES.EXERCISE, ACTIONS.DELETE, exerciseId, cycleId, cycleIdMap.serverId))
            }
            console.log(this.actions)
        },

        // Realiza las operaciones necesarias para guardar la rutina y su informacion en la API
        async executeActions(){
            for(let action of this.actions){
                if(action.type === TYPES.ROUTINE){
                    action.data.difficulty = action.data.difficulty.name;
                    action.data.detail = action.data.name;
                    if(action.action===ACTIONS.ADD){
                        const ans = await this.addRoutine(action.data);
                        this.editingRoutine.id = ans.api.id
                    } else if(action.action === ACTIONS.MODIFY){
                        await this.modifyRoutine(action.data)
                    }
                }
                else if(action.type === TYPES.CYCLE){
                    const mapping = this.cycleIdMaps.find((cycle) => cycle.clientId === action.data.id);
                    if(action.action === ACTIONS.ADD){
                        const ans = await routineCyclesStore.addCycleToRoutine(this.editingRoutine.id,action.data)
                        mapping.serverId = ans.api.id
                    }else if(action.action === ACTIONS.MODIFY){
                        await routineCyclesStore.modifyCycleInRoutine(this.editingRoutine.id,mapping.serverId,action.data)
                    }else if(action.action === ACTIONS.DELETE){
                        // Para evitar problemas de agregar o modificar ejercicios de un ciclo, si se elimina un ciclo,
                        // entonces las operaciones sobre sus ejercicios no se aplican
                        mapping.deleted = true;
                        await routineCyclesStore.removeCycleRoutine(this.editingRoutine.id,mapping.serverId,action.data)
                    }
                }else{
                    const mapping = this.cycleIdMaps.find((cycle)=> cycle.clientId === action.parentId.clientId)
                    if(!mapping.deleted){
                        if(action.action === ACTIONS.ADD){
                            await cycleExercisesStore.addExerciseToCycleInApi(mapping.serverId,action.data.data.id,action.data)
                        }else if(action.action === ACTIONS.MODIFY){
                            await cycleExercisesStore.modifyExerciseFromCycleInApi(mapping.serverId,action.data.data.id,action.data)
                        }else if(action.action === ACTIONS.DELETE){
                            await cycleExercisesStore.deleteExerciseFromCycleInApi(mapping.serverId,action.data.data.id)
                        }
                    }
                }
            }
            await this.fetchRoutines();
            console.log(this.routines);
        },
    },
})