<!-- Vista de los favoritos -->
<template>
  <div class="ml-7">
    <h1 class="title-style my-5">Favoritos</h1>
    <RoutineFilter>
      <template v-slot:firstFilter>
        <RoutineFilterSearch/>
      </template>
    </RoutineFilter>

    <div class="mt-12">
      <RoutineCardList v-if="dataLoaded" :routines="getFavouriteRoutines"/>
    </div>
  </div>
</template>

<script>
import RoutineFilter from "@/components/RoutineFilter";
import RoutineCardList from "@/components/RoutineCardList";
import RoutineFilterSearch from "@/components/RoutineFilterSearch";

import {useFavourites} from "@/store/Favourites";
const favouritesStore = useFavourites();

import {useRoutines} from "@/store/Routines";
import {mapState} from "pinia";
const routinesStore = useRoutines();

export default {
  name: "FavoritesView",
  components: {
    RoutineFilter,
    RoutineFilterSearch,
    RoutineCardList
  },
  data(){
    return {
      dataLoaded: false,
      routines: []
      // titleText: [
      //   {text: 'Favoritos', lang: 'es'}, {text: 'Favorites', lang: 'en'}
      // ],
    }
  },
  methods: {
    // getText(componentText){
    //   return componentText[componentText.map(e => e.lang).indexOf(this.language)].text
    // }
  },
  computed:{
    ...mapState(useRoutines, {getFavouriteRoutines: 'getFavouriteRoutinesFromCurrentUser'})
  },
  async beforeCreate(){
    // Busca las rutinas almacenadas en la api y las almacena en el store
    await routinesStore.fetchRoutines();
    // Busca las rutinas favoritas del usuario
    await favouritesStore.fetchFavourites();
    // Aviso que ya se cargo la informacion
    this.dataLoaded = true;
  }
}
</script>

<style scoped>

.title-style {
  font-size: 48px;
}

</style>