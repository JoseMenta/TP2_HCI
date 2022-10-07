import { defineStore } from 'pinia'

export const useCreatedRoutines = defineStore('createdRoutines', {
    state:{
        routines:[
            {
                name: 'Jogo bonito',
                slug: 'jogo_bonito',
                image: require('@/assets/lionel-messi.webp'),
                favorite: true,
                stars: 4,
                tags: ['Fuerza', 'Resistencia'],
            }
        ]
    },
    getters: {
        getRoutines(){
            return this.routines
        }
    },
    actions: {
        increment() {
            this.count++
        },
    },
})