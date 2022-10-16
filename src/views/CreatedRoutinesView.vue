<!-- Vista de la pagina principal -->
<template>
  <div class="ml-7 main-div-style">
    <h1 class="title-style my-5">Rutinas creadas</h1>
    <v-sheet width="70%">
      <RoutineFilter @getFilters="getFilter" :prev-values="filter">
        <template v-slot:firstFilter>
          <RoutineFilterSearch @FilterSearch="getFilterSearch"/>
        </template>
      </RoutineFilter>
    </v-sheet>


    <div class="mt-12" v-if="dataLoaded">
      <RoutineCardList  :routines="this.getRoutinesFilter">
        <template v-slot:header>
          <v-col class="d-flex" cols="6">
            <v-card class="d-flex flex-column align-center justify-center rounded new-routine-card-style" color="#E8F1F6" hover @click="newRoutine">
              <v-icon v-text="$vuetify.icons.values.add" color="#1C1B1F" :size="70"/>
              <span class="new-routine-text-style">Nueva rutina</span>
            </v-card>
          </v-col>
        </template>
      </RoutineCardList>

    </div>
    <div v-else class="d-flex align-center justify-center div-loading-style mt-10">
      <v-progress-circular size="200" indeterminate :width="20" :color="$vuetify.theme.themes.light.blue"/>
    </div>
  </div>
</template>

<script>
import RoutineCardList from "@/components/RoutineCardList";
import RoutineFilter from "@/components/RoutineFilter";
import RoutineFilterSearch from "@/components/RoutineFilterSearch";

import {mapState} from "pinia";
import {useCategories} from "@/store/Categories";
const categoriesStore = useCategories();
import {useRoutines} from "@/store/Routines";

import {NEW_ROUTINE_ID} from "@/api/routine";

const routinesStore = useRoutines();

import {useFavourites} from "@/store/Favourites";
const favouritesStore = useFavourites();

import {useUsers} from "@/store/User";
const usersStore = useUsers();


export default {
  name: "CreatedRoutinesView",
  components: {
    RoutineFilter,
    RoutineFilterSearch,
    RoutineCardList
  },
  data(){
    return {
      dataLoaded: false,
      filterSearch: 'Nombre de la rutina',
      textSearch: '',
      filter : { Puntuacion : -1,  Dificultad : 'x', Categoria : -1, OrderFilter : 'Fecha de creación' , Order: -1 }
    }
  },
  methods: {
    // getText(componentText){
    //   return componentText[componentText.map(e => e.lang).indexOf(this.language)].text
    // },
    changeView(view) {
      this.$router.push(view)
    },
    getFilterSearch(filter, textSearch){
      this.textSearch= textSearch;
      this.filterSearch = filter;
    },
    getFilter(value){
      this.filter = value;
      console.log(this.filter)
    },
    newRoutine(){
      this.changeView({name: 'createRoutine', query: {id: NEW_ROUTINE_ID}})
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
    getRoutinesFilter(){
      let routines = null;
      if(this.filterSearch === 'Nombre de la rutina')
        routines = this.userCreatedRoutines.filter(routine => routine.name.startsWith(this.textSearch))
      else
        routines = this.userCreatedRoutines.filter(routine => routine.user.username.startsWith(this.textSearch))
      const aux = ['expert', 'advanced',  'intermediate', 'beginner', 'rookie']
      routines =  routines.filter(rutine => (this.filter.Puntuacion === -1 || this.filter.Puntuacion===rutine.score) &&
          (this.filter.Dificultad=== 'x' || this.filter.Dificultad===rutine.difficulty) &&
          (this.filter.Categoria===-1 || categoriesStore.getCategoryByName(this.getCategoryNames[this.filter.Categoria]).name===rutine.category.name));
      switch (this.filter.OrderFilter) {
        case 'Fecha de creación':
          return routines.sort((a,b) => this.filter.Order * (a.date - b.date))
        case 'Puntuación': {
          console.log(routines);
          routines.sort((a,b) => this.filter.Order* (a.score - b.score));
          console.log(routines);
          return routines
        }
        case 'Dificultad':
          return routines.sort((a,b) => this.filter.Order * (aux.indexOf(a.difficulty) - aux.indexOf(b.difficulty)))
        case 'Categoría':
          return routines.sort((a,b) => this.filter.Order * a.category.name.localeCompare(b.category.name))
      }
      return routines
    },
  },
  async beforeCreate(){
    // Busca las rutinas almacenadas en la api y las almacena en el store
    await routinesStore.fetchRoutines();
    // Busca las rutinas favoritas del usuario
    await favouritesStore.fetchFavourites();
    // Tomo los datos del usuario para obtener su id
    await usersStore.getCurrentUser();
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

.main-div-style {
  height: 100%;
}

.div-loading-style {
  height: 100%;
}

</style>