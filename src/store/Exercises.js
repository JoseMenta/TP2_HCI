import { defineStore } from 'pinia'

export const useExercises = defineStore('exercises', {
    state:() => ({
        exercises: [
            {
                id: 1,
                name: 'Burpees',
                detail: 'Es un ejercicio muy dificil',
                type: 'exercise',
                date: null,
                image:require('@/assets/Burpee.jpg'),
                metadata: null
            }, {
                id: 2,
                name: 'Abdominales',
                detail: 'Hay que sacar gluteos',
                type: 'exercise',
                date: null,
                image:require('@/assets/estiramiento.png'),
                metadata: null
            },
            {
                id: 3,
                name: 'Descanso simple',
                detail: 'Simplemente hay que descansar',
                type: 'rest',
                date: null,
                image:require('@/assets/estiramiento.png'),
                metadata: null
            },
            {
                id: 4,
                name: 'Dominadas',
                detail: 'Cuesta una banda',
                type: 'exercise',
                date: null,
                image:require('@/assets/Burpee.jpg'),
                metadata: null
            },
            {
                id: 5,
                name: 'Descanso con elongacion',
                detail: 'Descancar y elongar los musculos trabajados',
                type: 'rest',
                date: null,
                image:require('@/assets/estiramiento.png'),
                metadata: null
            }
        ]
    }),
    getters: {
        foo(){
            return 1
        },
        getExercises() {
            return this.exercises
        },
    },
    actions: {
        getExerciseById(id) {
            return this.exercises.find((ex) => ex.id === id)
        },

    }
})