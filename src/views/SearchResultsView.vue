<!-- Vista para mostrar los resultados de una busqueda -->
<template>
  <div class="ml-7 mt-10">
    <h1 class="title-style my-5">Resultados: {{textSearch}}</h1>
    <v-sheet width="70%">
      <RoutineFilter language="es" @getFilters="getFilter" :prevValues="filter">
        <template v-slot:firstFilter>
          <RoutineFilterSwitch language="es" @sentSelect="getSelect" :prevValue="indexCategorie"/>
          <v-divider vertical class="divider-style"/>
        </template>
      </RoutineFilter>
      <div class="mt-12">
        <RoutineCardList v-if="dataLoaded" :routines="this.getRutinesFilter"/>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import RoutineCardList from "@/components/RoutineCardList";
import RoutineFilter from "@/components/RoutineFilter";
import RoutineFilterSwitch from "@/components/RoutineFilterSwitch";

import {mapState} from "pinia";

import {useRoutines} from "@/store/Routines";
import {useCategories} from "@/store/Categories";
const categoriesStore = useCategories();
const routinesStore = useRoutines();

export default {
  name: "SearchResultsView",
  components: {
    RoutineFilter,
    RoutineCardList,
    RoutineFilterSwitch
  },
  props: {
    textSearch: {
      type: String,
      required: false
    },
    binary: {
      type: Number,
      required: false
    },
    puntuacion: {
      type: Number,
      required: false
    },
    dificultad: {
      type: String,
      required: false
    },
    categoria: {
      type: Number,
      required: false
    },
  },
  data(){
    return {
      dataLoaded: false,
      binaryCategories: ['Nombre de Rutina', 'Nombre Creador'],
      indexCategorie: this.binary,
      filter : { Puntuacion : this.puntuacion,  Dificultad : this.dificultad, Categoria : this.categoria, OrderFilter : 'Fecha de creación' , Order: -1 }
    }
  },
  methods: {
    // getText(componentText){
    //   return componentText[componentText.map(e => e.lang).indexOf(this.language)].text
    // },
    changeView(nameView) {
      this.$router.push(nameView)
    },
    getSelect(filter){
      console.log(filter)
      this.indexCategorie=filter
    },
    getFilter(value){
      this.filter = value;
      console.log(this.filter)
    }
  },
  computed:{
    ...mapState(useCategories, {getCategories: 'getCategories', categoriesLoaded: "categoriesLoaded"}),
    getCategoryNames(){
      console.log(this.getCategories)
      return this.getCategories.map((category) => category.name);
    },
    ...mapState(useRoutines, {userCreatedRoutines: "getRoutinesFromCurrentUser"}),
    //filters: { Puntuacion : '',  Dificultad : '', Categoria : '', OrderFilter : '', OrderBool: '' }
    getRutinesFilter(){
      let Rutines = null;
      if(this.textSearch !== ' '){
        if(this.binaryCategories[this.indexCategorie] === 'Nombre de Rutina'){
          Rutines =  this.userCreatedRoutines.filter(rutine => rutine.name.startsWith(this.textSearch))
        }
        else{
          Rutines =  this.userCreatedRoutines.filter(rutine => rutine.user.username.startsWith(this.textSearch))
        }
      }
      else{
        Rutines =  this.userCreatedRoutines;
      }
      Rutines =  Rutines.filter(rutine => (this.filter.Puntuacion === -1 || this.filter.Puntuacion===rutine.score) &&
          (this.filter.Dificultad=== 'x' || this.filter.Dificultad===rutine.difficulty) &&
          (this.filter.Categoria=== -1 || categoriesStore.getCategoryByName(this.getCategoryNames[this.filter.Categoria]).name===rutine.category.name));
      console.log(this.filter.Categoria)
      if(this.filter.Categoria!== -1){
        console.log("inside")
        console.log(categoriesStore.getCategoryByName(this.getCategoryNames[this.filter.Categoria]).name)
        console.log(this.filter)
      }
      else{
        console.log("outside")
      }
      console.log(Rutines)
      console.log("categoria")
      const aux = ['expert', 'advanced',  'intermediate', 'beginner', 'rookie']
      switch (this.filter.OrderFilter) {
        case 'Fecha de creación':
          return Rutines.sort((a,b) => this.filter.Order * (a.date - b.date))
        case 'Puntuación': {
          Rutines.sort((a,b) => this.filter.Order * (a.score - b.score));
          return Rutines
        }
        case 'Dificultad':
          return Rutines.sort((a,b) => this.filter.Order * (aux.indexOf(a.difficulty) - aux.indexOf(b.difficulty)))
        case 'Categoría':
          return Rutines.sort((a,b) => this.filter.Order * a.category.name.localeCompare(b.category.name))
      }
      console.log(Rutines)
      return Rutines
    },
  },
  async beforeCreate(){
    // Busca las rutinas almacenadas en la api y las almacena en el store
    await routinesStore.fetchRoutines();
    // Busca las rutinas favoritas del usuario
    // Tomo los datos del usuario para obtener su id
    // TODO: Corregir User.js
    // const user = usersStore.getCurrentUser();
    // Nos quedamos con las rutinas que nos sirven
    // this.userCreatedRoutines = routinesStore.getRoutinesFromUserId(user.id);
    // Aviso que ya se cargo la informacion
    this.dataLoaded = true;
  }
}
</script>

<style scoped>

.title-style {
  font-size: 48px;
}

.new-routine-card-style {
  width: 100%;
}

.new-routine-text-style {
  font-size: 48px;
  color: #1C1B1F;
}

</style>