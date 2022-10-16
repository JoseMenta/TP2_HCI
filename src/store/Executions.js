import {defineStore} from "pinia";

import {ExecutionApi} from "@/api/executions";

// const EXECUTION_START = 'execution-start'
export const useExecutions = defineStore('executions', {
    state: () => ({
        start:undefined
    }),
    getters: {
    },
    actions: {
        startExecution(){
            this.start = new Date()
        },
        async saveExecution(routineId){
            if(this.start===undefined){
                console.log('Tried to add an execution without starting a routine')
                return -2
            }
            const now = new Date()
            const difference = Math.round((now.getTime()-this.start.getTime())/1000)
            console.log('La diferencia es:')
            console.log(difference)
            try {
                return await ExecutionApi.addExecution(routineId, {
                    duration: difference,
                    wasModified: false
                })
            }catch (e){
                console.log(e)
                return e.code
            }
        },
    }
})