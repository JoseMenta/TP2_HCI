<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
<!--      Usar v-bind cuando se quiere pasar algo que no sea un String-->
<!--      Es equivalente a hacer : antes de la propiedad-->
<!--      Uso de routine card-->
      <RoutineCard img="lionel-messi.webp" name="Futbol para todos" v-bind:is-favorite="true" v-bind:id="1"
      @favoriteTouched="changeFavorite" v-bind:stars="3"
      v-bind:tags="['Hello','World']"></RoutineCard>
      <ExerciseCard :name="'Abdominales'" :id="1" description="Es un ejercicio dificil que no se logra completar si se come mucho antes de realizarlo pues desdulta masydasd" img="estiramiento.png"></ExerciseCard>

      <ExerciseCardMin :id="1" img="lionel-messi.webp" name="Futbol para todos" :stars="3"></ExerciseCardMin>

      <!--  Componentes agregados       -->
      <LanguageSelect :id="1" v-bind:options="['Español','English']" v-bind:abrev="['ESP','ENG']"
                  @menuChanged="changeMenu"  width="100" ></LanguageSelect>
      <ExerciseList id="1"  name="Burpees" img="Burpee.jpg" time="00:40" clase="blue"/>
      <ControlsRutine></ControlsRutine>
      <BinaryFilter v-bind:filters="['Nombre de Rutina','Nombre del Creador']" width="200" height="40"/>
      <newTask name="Agregar Ejercicio" icon="fitness_center" width="250" height="30"></newTask>
      <newTask name="Agregar Descanso" icon="history_toggle_off" width="250" height="30"></newTask>
      <TopBreadcrums :items="[{text: 'Dashboard', disabled: false, href: 'breadcrumbs_dashboard',},
      { text: 'Link 1', disabled: false, href: 'breadcrumbs_link_1', },
      { text: 'Link 2', disabled: true, href: 'breadcrumbs_link_2', },]"></TopBreadcrums>
      <FilterMenu :id="1" v-bind:options="['Buenas','Tardes','Como','Estas']"  width="150" height="30" @menuChanged="changeMenu"></FilterMenu>
      <ExerciseCategory id="1" name="Tardes" width="150" height="30"></ExerciseCategory>

    </v-main>
  </v-app>
</template>

<script>
import ExerciseCard from "@/components/ExerciseCard";
import RoutineCard from "@/components/RoutineCard";
import FilterMenu from "@/components/FilterMenu";
import ExerciseCardMin from "@/components/ExerciseCardMin";

import LanguageSelect from "./components/LanguageSelect";
import ControlsRutine from "./components/ControlsRutine";
import BinaryFilter from "./components/BinaryFilter";
import newTask from "./components/NewTask";
import TopBreadcrums from "./components/TopBreadcrums";
import ExerciseCategory from "./components/ExerciseCategory";
import ExerciseList from "@/components/ExerciseList";

export default {
  name: 'App',

  components: {
    ExerciseCardMin,
    FilterMenu,
    RoutineCard,
    ExerciseCard,
    LanguageSelect,
    ControlsRutine,
    BinaryFilter,
    newTask,
    TopBreadcrums,
    ExerciseCategory,
    ExerciseList,
  },
  data: () => ({
    //
  }),
  methods:{
    changeFavorite(id,status){
      console.log(id)
      console.log(status)
    },
    changeMenu(menuId,newValue){
      console.log(menuId)
      console.log(newValue)
    }
  }
};
</script>
