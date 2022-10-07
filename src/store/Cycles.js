import { defineStore } from 'pinia'
import {useExercises} from "@/store/Exercises";
//TODO: terminar, pero usar la api y ajustarla a lo que vayamos a hacer
export const useCycles = defineStore('cycles', {
    state:{
        cycles: [
            {
                id:1,
                name:'Calentamiento',
                detail:'Calentamiento 1',
                type:'Warmup',
                order:1,
                repetitions:3,
                metadata:null
            },
            {
                id:2,
                name:'Ciclo 1',
                detail:'Ciclo 1',
                type:'Running',
                order:2,
                repetitions:10,
                metadata:null
            },
            {
                id:3,
                name:'Estiramiento',
                detail:'Estiramiento 1',
                type:'Rest',
                order:3,
                repetitions:2,
                metadata:null
            },

        ]
    },
    getters: {
        double: state => state.count * 2,
    },
    actions: {
        getRoutines(){
            const exercicesStore= useExercises()
            return {
                totalCount:this.cycles.length,
                cycles:[
                    this.cycles.map((cycle)=>{
                        return {
                            id:cycle.id,
                            name:cycle.name,
                            detail:cycle.detail,
                            type:cycle.type,
                            order:cycle.order,
                            repetitions:cycle.repetitions,
                            metadata:cycle.metadata,
                            exercises:exercicesStore.getExercises(),
                        }
                    })
                ],
                lastPage:true
            }
        },
    },
})