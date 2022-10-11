<!-- Vista de la pagina principal -->
<template>
  <div class="ml-7">
    <h1 class="title-style my-5">Rutinas creadas</h1>
    <RoutineFilter>
      <template v-slot:firstFilter>
        <RoutineFilterSearch/>
      </template>
    </RoutineFilter>

    <div class="mt-12">
      <!-- TODO: Corregir User.js -->
      <RoutineCardList v-if="dataLoaded" :routines="userCreatedRoutines">
        <template v-slot:header>
          <v-col class="d-flex" cols="6">
            <v-card class="d-flex flex-column align-center justify-center rounded new-routine-card-style" color="#E8F1F6" hover @click="changeView({name: 'createRoutine'})">
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

import {useRoutines} from "@/store/Routines";
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
  // props: {
  //   language: {
  //     type: String,
  //     required: true,
  //     validator(value) {
  //       return ['es', 'en'].includes(value)
  //     }
  //   },
  // },
  data(){
    return {
      dataLoaded: false,
      // mainPageText: [
      //   {text: 'Rutinas creadas', lang: 'es'}, {text: 'Created routines', lang: 'en'}
      // ],
    }
  },
  methods: {
    // getText(componentText){
    //   return componentText[componentText.map(e => e.lang).indexOf(this.language)].text
    // },
    changeView(nameView) {
      this.$router.push(nameView)
    },
  },
  computed:{
    ...mapState(useRoutines, {userCreatedRoutines: "getRoutinesFromCurrentUser"})
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