import {defineStore} from "pinia";


export const useNewStore = defineStore("prueba", {
    state: () => ({ items: ['buenas'] }),
    getters: {

    },
    actions: {
        addItem(item){
            this.items.push(item)
        },
        printState(){
            console.log(this.items)
        }
    },
});
