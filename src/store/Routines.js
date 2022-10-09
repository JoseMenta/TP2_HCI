import { defineStore } from 'pinia'
import {useCycles} from "@/store/Cycles";

export const useRoutines = defineStore('createdRoutines', {
    state:()=>({
        routines:[
            {
                name: 'Jogo bonito',
                slug: 'jogo_bonito',
                id:1,
                image: require('@/assets/lionel-messi.webp'),
                favorite: true,
                stars: 4,
                metadata:{
                    tags:['Fuerza','Resistencia']
                }
            },
            {
                name: 'Futbol para todos',
                slug: 'futbol_para_todos',
                id:2,
                image: require('@/assets/lionel-messi.webp'),
                favorite: true,
                stars: 3,
                metadata:{
                    tags:['Fuerza','Resistencia']
                }
            },
            {
                name: 'Gluteos',
                slug: 'gluteos',
                id:3,
                image: require('@/assets/lionel-messi.webp'),
                favorite: true,
                stars: 5,
                metadata:{
                    tags:['Fuerza','Resistencia']
                }
            },
            {
                name: 'Velocidad',
                slug: 'velocidad',
                id:4,
                image: require('@/assets/lionel-messi.webp'),
                favorite: true,
                stars: 2,
                metadata:{
                    tags:['Fuerza','Resistencia']
                }
            }
        ]
    }),
    getters: {
        //Nota: se usan sin los ()
        getRoutines(){
            const cycles = useCycles()
            return this.routines.map((routine)=>{
                return {
                    id:routine.id,
                    name:routine.name,
                    slug:routine.slug,
                    image:routine.image,
                    favorite:routine.favorite,
                    stars:routine.stars,
                    metadata:routine.metadata,
                    cycles:cycles.getCycles
                }
            })
        },
        getRoutineByName(name){
            return this.routines.find((elem)=>elem.name===name)
        }
    },
    actions: {
        getRoutineById(id){
            const routine =  this.routines.find((elem)=>elem.id===id)
            const cycles = useCycles()
            return ({
                name:routine.name,
                id:routine.id,
                slug:routine.slug,
                image:routine.image,
                favorite:routine.favorite,
                stars:routine.stars,
                metadata:routine.metadata,
                cycles:cycles.getCycles
            })
        },
    },
})