import { defineStore } from 'pinia'

export const useExercises = defineStore('exercises', {
    state: {
        exercises: [
            {
                id: 1,
                name: 'Abdominales',
                detail: 'Es un ejercicio muy dificil',
                type: 'exercise',
                date: null,
                metadata: null
            }, {
                id: 2,
                name: 'Abdominales',
                detail: 'Hay que sacar gluteos',
                type: 'exercise',
                date: null,
                metadata: null
            },
            {
                id: 3,
                name: 'Descanso simple',
                detail: 'Simplemente hay que descansar',
                type: 'rest',
                date: null,
                metadata: null
            },
            {
                id: 4,
                name: 'Dominadas',
                detail: 'Cuesta una banda',
                type: 'exercise',
                date: null,
                metadata: null
            },
            {
                id: 5,
                name: 'Descanso con elongacion',
                detail: 'Descancar y elongar los musculos trabajados',
                type: 'rest',
                date: null,
                metadata: null
            }
        ]
    },
    getters: {
        getExercises() {
            return this.exercises

        },
    },
    actions: {
        getExercise(id) {
            return this.exercises.find((ex) => {
                ex.id = id
            })
        },

    }
})