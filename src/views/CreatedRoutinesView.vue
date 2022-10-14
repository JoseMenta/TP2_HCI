<!-- Vista de la pagina principal -->
<template>
  <div class="ml-7">
    <h1 class="title-style my-5">Rutinas creadas</h1>
    <RoutineFilter @getFilters="getFilter">
      <template v-slot:firstFilter>
        <RoutineFilterSearch @FilterSearch="getFilterSearch"/>
      </template>
    </RoutineFilter>

    <div class="mt-12">
      <!-- TODO: Corregir User.js -->
      <RoutineCardList v-if="dataLoaded" :routines="this.getRutinesFilter">
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
  </div>
</template>

<script>
import RoutineCardList from "@/components/RoutineCardList";
import RoutineFilter from "@/components/RoutineFilter";
import RoutineFilterSearch from "@/components/RoutineFilterSearch";

import {mapState} from "pinia";

import {useRoutines, NEW_ROUTINE_ID} from "@/store/Routines";
const routinesStore = useRoutines();

import {useFavourites} from "@/store/Favourites";
const favouritesStore = useFavourites();

// import {useUsers} from "@/store/User";
// const usersStore = useUsers();

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
      filter : { Puntuacion : '',  Dificultad : '', Categoria : '', OrderFilter : 'Fecha de creación' , Order: -1 }
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
    await favouritesStore.fetchFavourites();
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