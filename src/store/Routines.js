import { defineStore } from 'pinia'

import { RoutineApi, ApiAction, ACTIONS, NewRoutine, TYPES, CycleIdMap, EditRoutine } from "@/api/routine";

import {useFavourites} from "@/store/Favourites";
import {useUsers} from "@/store/User";
import {useCategories} from "@/store/Categories";
import {useRoutineCycles} from "@/store/RoutineCycles";
import {useCycleExercises} from "@/store/CycleExercises";

import {Cycle, CycleTypes} from "@/api/cycles";
import {CycleExercise} from "@/api/exercise";
import {ReviewApi} from "@/api/reviews";

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
        // Devuelve las rutinas creadas por el usuario logueado
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
            const routine = this.routines.content.find((routine) => routine.id === parseInt(id));
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
            return userIdRoutines.map((routine) => routine.id).includes(parseInt(routineId));
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
        async getRoutinesFromApi(page){
            let result;
            try {
                result = await RoutineApi.getAll(page);
            } catch(e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        // Guarda las rutinas almacenadas en la Api en el store (lo actualiza)
        // Devuelve 0 en caso de exito, -1 en caso de error
        async fetchRoutines(){
            let apiRoutines;
            let result;
            let page = 0;
            do {
                apiRoutines = await this.getRoutinesFromApi(page);
                if(apiRoutines === -1){
                    return -1;
                }
                if(page === 0){
                    result = apiRoutines;
                } else {
                    apiRoutines.content.forEach((routine) => result.content.push(routine));
                }
                page++;
            } while(!apiRoutines.isLastPage);
            this.replaceAllRoutinesInStore(result);
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
            const routineCyclesStore = useRoutineCycles();
            const categoriesStore = useCategories();
            // Por seguridad, borramos los datos
            this.discardChanges();
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
            const routineCyclesStore = useRoutineCycles();

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
            const routineCyclesStore = useRoutineCycles();
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
        },

        // Realiza las operaciones necesarias para guardar la rutina y su informacion en la API
        async executeActions(){
            const routineCyclesStore = useRoutineCycles();
            const cycleExercisesStore = useCycleExercises();

            let result = 0, routineAction, routine;
            for(let action of this.actions){
                console.log(action)
                if(action.type === TYPES.ROUTINE){
                    action.data.difficulty = action.data.difficulty.name;
                    action.data.detail = action.data.name;
                    if(action.action===ACTIONS.ADD){
                        routineAction = ACTIONS.ADD;
                        routine = action.data;
                        const ans = await this.addRoutine(action.data);
                        if(ans.api === -1){
                            return -1;
                        }
                        this.editingRoutine.id = ans.api.id
                    } else if(action.action === ACTIONS.MODIFY){
                        routineAction = ACTIONS.MODIFY;
                        result = await this.modifyRoutine(action.data)
                    }
                }
                else if(action.type === TYPES.CYCLE){
                    const mapping = this.cycleIdMaps.find((cycle) => cycle.clientId === action.data.id);
                    if(action.action === ACTIONS.ADD){
                        const ans = await routineCyclesStore.addCycleToRoutine(this.editingRoutine.id,action.data)
                        if(ans.api === -1){
                            if(routineAction === ACTIONS.ADD){
                                await this.deleteRoutine(routine);
                            }
                            return -1;
                        }
                        mapping.serverId = ans.api.id
                    }else if(action.action === ACTIONS.MODIFY){
                        const ans = await routineCyclesStore.modifyCycleInRoutine(this.editingRoutine.id,mapping.serverId,action.data)
                        if(ans.api === -1){
                            if(routineAction === ACTIONS.ADD){
                                await this.deleteRoutine(routine);
                            }
                            return -1;
                        }
                        mapping.serverId = ans.api.id
                    }else if(action.action === ACTIONS.DELETE){
                        // Para evitar problemas de agregar o modificar ejercicios de un ciclo, si se elimina un ciclo,
                        // entonces las operaciones sobre sus ejercicios no se aplican
                        mapping.deleted = true;
                        result = await routineCyclesStore.removeCycleRoutine(this.editingRoutine.id,mapping.serverId,action.data)
                    }
                }else{
                    const mapping = this.cycleIdMaps.find((cycle)=> parseInt(cycle.clientId) === parseInt(action.parentId.clientId))
                    if(!mapping.deleted){
                        if(action.action === ACTIONS.ADD){
                            result = await cycleExercisesStore.addExerciseToCycleInApi(mapping.serverId,action.data.data.id,action.data)
                        }else if(action.action === ACTIONS.MODIFY){
                            result = await cycleExercisesStore.modifyExerciseFromCycleInApi(mapping.serverId,action.data.data.id,action.data)
                        }else if(action.action === ACTIONS.DELETE){
                            result = await cycleExercisesStore.deleteExerciseFromCycleInApi(mapping.serverId,action.data.data.id)
                        }
                    }
                }
                // En caso de un error, si la rutina es nueva la elimina por seguridad
                // Si esta siendo editada no se puede manejar mucho el error
                if(result === -1){
                    if(routineAction === ACTIONS.ADD){
                        await this.deleteRoutine(routine);
                    }
                    return -1;
                }
            }
            // Por seguridad, borramos los datos
            this.discardChanges();
            await this.fetchRoutines();
            console.log(this.routines)
            return 0;
        },

        // Elimina los cambios realizados sobre la rutina (editingRoutine)
        discardChanges(){
            const routineCyclesStore = useRoutineCycles();
            this.editingRoutine = {};
            this.actions = [];
            this.cycleIdMaps = [];
            routineCyclesStore.cycles = {};
        },

        // Deja todo preparado para editar la rutina con id routineId
        async editRoutine(routineId){
            const routineCyclesStore = useRoutineCycles();
            const cycleExercisesStore = useCycleExercises();

            // Por seguridad, borramos los datos
            this.discardChanges();
            // Obtenemos la rutina
            const routine = this.getRoutineById(routineId);
            if(routine === -1){
                return -1;
            }


            // Creamos un objeto para editar y lo agregamos como accion para editar
            const editedRoutine = new EditRoutine(routine.id, routine.name, routine.score, routine.isPublic, routine.difficulty, routine.category, routine.metadata);
            this.actions.push(new ApiAction(TYPES.ROUTINE, ACTIONS.MODIFY, editedRoutine, routineId, routineId));

            // Obtenemos los ciclos de la rutina
            if(await routineCyclesStore.fetchRoutineCycles(routineId) === -1){
                this.discardChanges();
                return -1;
            }


            // Aca se ira almacenando los datos de los ciclos de la rutina
            let cycles = [];
            cycleExercisesStore.restartStore();
            for(let cycle of routineCyclesStore.cycles.content){
                // Actualizamos el proximo ID para asignar a un nuevo ciclo
                if(editedRoutine.nextId <= cycle.id){
                    editedRoutine.nextId = cycle.id + 1;
                }

                // Creamos un objeto con los datos utiles del ciclo y lo agregamos como accion para editar
                const editedCycle = new Cycle(cycle.id, cycle.name, cycle.detail, cycle.type, cycle.order, cycle.repetitions, cycle.metadata, [], 1);
                this.actions.push(new ApiAction(TYPES.CYCLE, ACTIONS.MODIFY, editedCycle, routineId, routineId));

                // Agregamos el mapeo de ids
                this.cycleIdMaps.push(new CycleIdMap(cycle.id, cycle.id));

                // Obtenemos los ejercicios del ciclo
                if(await cycleExercisesStore.fetchCycleExercises(cycle.id) === -1){
                    this.discardChanges();
                    return -1;
                }


                // Aca se ira guardando los ejercicios del ciclo
                let exercises = [];
                // Recorremos los ejercicios del ciclo
                for(let exercise of cycleExercisesStore.getCycle(cycle.id)){
                    // Nos aseguramos que el proximo ejercicio tenga el orden correcto
                    if(editedCycle.nextExerciseOrder <= exercise.order){
                        editedCycle.nextExerciseOrder = exercise.order + 1;
                    }


                    // Creamos un objeto con los datos utiles del ejercicio
                    const editedExercise = new CycleExercise(exercise.exercise.id, exercise.order, exercise.duration, exercise.repetitions)
                    exercises.push(editedExercise);
                    // Creamos una accion para indicar que el ejercicio se va a editar
                    this.actions.push(new ApiAction(TYPES.EXERCISE, ACTIONS.MODIFY, editedExercise, cycle.id, cycle.id))
                }

                // Ordenamos los ejercicios por su orden de aparicion
                exercises.sort((a,b) => a.order - b.order);

                // Le asignamos al ciclo sus ejercicios
                editedCycle.exercises = exercises;

                // Agregamos el ciclo a los ciclos de la rutina
                cycles.push(editedCycle);
            }

            // Ordenamos los ciclos por su orden de aparicion
            cycles.sort((a, b) => a.order - b.order);

            // Le asginamos a la rutina con sus ciclos
            editedRoutine.cycles = cycles;

            // Guardamos la edicion de la rutina
            this.editingRoutine = editedRoutine;

            // Actualizamos los ciclos que se deben mostrar
            routineCyclesStore.cycles = {
                content: this.editingRoutine.cycles
            }
        },

        // Dado el id de una rutina, se encarga de cargar todos los datos de la rutina (ciclos y sus ejercicios)
        async getRoutineData(routineId){
            const routineCyclesStore = useRoutineCycles();
            const cycleExercisesStore = useCycleExercises();

            // Limpiamos los ciclos por seguridad
            routineCyclesStore.cycles = {};

            // Obtenemos la rutina
            const routine = this.getRoutineById(routineId);
            if(routine === -1){
                return -1;
            }

            // Obtenemos los ciclos de la rutina
            if(await routineCyclesStore.fetchRoutineCycles(routineId) === -1){
                this.discardChanges();
                return -1;
            }

            let cycles = [];
            cycleExercisesStore.restartStore();

            for(let cycle of routineCyclesStore.cycles.content){
                // Creamos un objeto con los datos del ciclo
                const cycleData = new Cycle(cycle.id, cycle.name, cycle.detail, cycle.type, cycle.order, cycle.repetitions, cycle.metadata, [], 1);

                // Obtenemos los ejercicios del ciclo
                if(await cycleExercisesStore.fetchCycleExercises(cycle.id) === -1){
                    this.discardChanges();
                    return -1;
                }

                // Aca se ira guardando los ejercicios del ciclo
                let exercises = [];
                // Recorremos los ejercicios del ciclo
                for(let exercise of cycleExercisesStore.getCycle(cycle.id)){
                    // Creamos un objeto con los datos utiles del ejercicio
                    const editedExercise = new CycleExercise(exercise.exercise.id, exercise.order, exercise.duration, exercise.repetitions)
                    exercises.push(editedExercise);
                }

                // Ordenamos los ejercicios por su orden de aparicion
                exercises.sort((a,b) => a.order - b.order);

                // Le asignamos al ciclo sus ejercicios
                cycleData.exercises = exercises;

                // Agregamos el ciclo a los ciclos de la rutina
                cycles.push(cycleData);
            }

            // Ordenamos los ciclos por su orden de aparicion
            cycles.sort((a, b) => a.order - b.order);

            // Ponemos la información los ciclos que se deben mostrar
            routineCyclesStore.cycles = {
                content: cycles
            }
        },
        async getReviewsFromApi(routineId,page){
            let result;
            try {
                result = await ReviewApi.getRoutineReviews(routineId,page);
            } catch(e) {
                console.log(e);
                return -1;
            }
            return result;
        },
        async getAllReviews(routineId){
            let apiReviews;
            let result;
            let page = 0;
            do {
                apiReviews = await this.getReviewsFromApi(routineId,page);
                if(apiReviews === -1){
                    return -1;
                }
                if(page === 0){
                    result = apiReviews;
                } else {
                    apiReviews.content.forEach((routine) => result.content.push(routine));
                }
                page++;
            } while(!apiReviews.isLastPage);
            return result
        },
        async getReviewsScore(routineId){
            const result = await this.getAllReviews(routineId)
            return result.content.reduce((prev,curr)=>prev+curr.score,0)/result.totalCount;
        }
    }
})