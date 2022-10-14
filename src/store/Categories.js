import {defineStore} from "pinia";

import {CategoriesApi} from "@/api/categories";

const Categories = {
    FULLBODY: 'Cuerpo completo',
    UPPER: 'Tren superior',
    MID: 'Tren medio',
    LOWER: 'Tren inferior'
};

const CategoryNames = [{name: Categories.FULLBODY}, {name: Categories.UPPER}, {name: Categories.MID}, {name: Categories.LOWER}];


export const useCategories = defineStore('categoriesStore', {
    state: () => ({
        categories: {},
        categoriesLoaded: false,
    }),
    getters: {
        getCategories(){
            if(!this.categories.content){
                return [];
            }
            return this.categories.content;
        }
    },
    actions: {
        // Devuelve los datos de la categoria con nombre categoryName
        getCategoryByName(categoryName){
            return this.categories.content.find((category) => category.name === categoryName);
        },
        // Se encarga de garantizar que esten las categorias de la aplicacion
        // Devuelve 0 en caso de exito, -1 en caso de error
        async initialize(){
            await this.fetchCategories();
            let categoryMissing = false;
            for (const categoryName of CategoryNames) {
                if(!this.categories.content.map((category) => category.name).includes(categoryName.name)){
                    try {
                        await CategoriesApi.add({name: categoryName.name})
                    } catch (e) {
                        console.log(e);
                        return -1;
                    }
                    categoryMissing = true;
                }
            }
            // Si falto alguna categoria vuelvo a solicitar las categorias con su id ya cargado
            if(categoryMissing){
                await this.fetchCategories();
            }
            return 0;
        },
        // Obtiene las categorias de la API
        // Devuelve 0 en exito, -1 en error
        async fetchCategories(){
            this.categoriesLoaded = false;
            let result;
            try {
                result = await CategoriesApi.getAll();
            } catch (e) {
                console.log(e);
                return -1;
            }
            this.categories = result;
            this.categoriesLoaded = true;
            return 0;
        }
    }
})