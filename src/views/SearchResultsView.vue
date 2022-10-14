<!-- Vista para mostrar los resultados de una busqueda -->
<template>
  <div class="ml-7 mt-10">
    <h1 class="title-style my-5">Resultados: {{textSearch}}</h1>
    <RoutineFilter language="es" @getFilters="getFilter">
      <template v-slot:firstFilter>
        <RoutineFilterSwitch language="es" @sentSelect="getSelect"/>
        <v-divider vertical class="divider-style"/>
      </template>
    </RoutineFilter>
    <div class="mt-12">
      <RoutineCardList v-if="dataLoaded" :routines="this.getRutinesFilter"/>
    </div>
  </div>
</template>

<script>
import RoutineCardList from "@/components/RoutineCardList";
import RoutineFilter from "@/components/RoutineFilter";
import RoutineFilterSwitch from "@/components/RoutineFilterSwitch";

import {mapState} from "pinia";

import {useRoutines} from "@/store/Routines";
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
    }
  },
  data(){
    return {
      dataLoaded: false,
      filterSearch: 'Nombre de la rutina',
      filter : { Puntuacion : '',  Dificultad : '', Categoria : '', OrderFilter : 'Fecha de creación' , Order: -1 }
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
      if(filter === 0)
        this.filterSearch = 'Nombre de la rutina';
      else
        this.filterSearch = 'Nombre del creador';
    },
    getFilter(value){
      this.filter = value;
      console.log(this.filter)
    }
  },
  computed:{
    ...mapState(useRoutines, {userCreatedRoutines: "getRoutinesFromCurrentUser"}),
    //filters: { Puntuacion : '',  Dificultad : '', Categoria : '', OrderFilter : '', OrderBool: '' }
    getRutinesFilter(){
      let Rutines = null;
      if(this.filterSearch === 'Nombre de la rutina')
        Rutines =  this.userCreatedRoutines.filter(rutine => rutine.name.startsWith(this.textSearch))
      else
        Rutines =  this.userCreatedRoutines.filter(rutine => rutine.user.username.startsWith(this.textSearch))
      Rutines =  Rutines.filter(rutine => (this.filter.Puntuacion === '' || this.filter.Puntuacion===rutine.score) &&
          (this.filter.Dificultad=== '' || this.filter.Dificultad===rutine.difficulty) &&
          (this.filter.Categoria==='' || this.filter.Categoria===rutine.category));
      switch (this.filter.OrderFilter) {
        case 'Fecha de creación':
          return Rutines.sort((a,b) => this.filter.Order * (a.date - b.date))
        case 'Puntuación': {
          console.log(Rutines);
          Rutines.sort((a,b) => this.filter.Order* (a.score - b.score));
          console.log(Rutines);
          return Rutines
        }
        case 'Dificultad':
          return Rutines.sort((a,b) => this.filter.Order * (a.difficulty - b.difficulty))
        case 'Categoría':
          return Rutines.sort((a,b) => this.filter.Order * (a.category - b.category))
      }
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