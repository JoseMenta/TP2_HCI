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


      <!-- Ejemplos de los componentes creados por Axel -->
      <!-- Primero se debe importar en <script> -->
      <IconTextCircle :size="160" icon="$vuetify.icons.values.replay" :icon-size="38" text="10" :text-size="48"/>
      <IconTextCircleTimer :size="160" :seconds="10" :minutes="0" :text-size="48"/>
      <ViewSwitch :items="[ {text: 'Detalle'}, {text: 'Lista'} ]" :text-size="24" :border-radius="12"/>
      <LoginButton :text-size="30" text="Regístrate" :border-radius="12"/>
      <SearchBox language="en" :search-method="search" :search-box-width="450" :icon-size="40" :btn-border-radius="12" :text-size="20"/>
      <ProfileButton :profile-method="profile" :btn-height="50" user-name="Raul Sarmiento" :user-name-img="require('@/assets/avatar.jpg')" :img-size="30" :btn-border-radius="12" :img-border-radius="4" :text-size="16"/>
      <NumberSelector :component-width="190" :text-size="16" :component-border-radius="4" data-text="Repeticiones" :data-value="5"/>
      <TimeSelector :text-size="16" :minutes="0" :seconds="0" :component-border-radius="4" :component-width="190" data-text="Tiempo"/>
      <ExerciseDetail language="es" :read-only="false" :title-size="30" :textarea-size="20" :textarea-border-radius="12"/>

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

import ExerciseDetail from "@/components/ExerciseDetail";
import IconTextCircle from "@/components/IconTextCircle";
import IconTextCircleTimer from "@/components/IconTextCircleTimer";
// import InfoTag from "@/components/InfoTag";
import LoginButton from "@/components/LoginButton";
import NewTask from "@/components/NewTask";
import NumberSelector from "@/components/NumberSelector";
import ProfileButton from "@/components/ProfileButton";
import SearchBox from "@/components/SearchBox";
// import TimeObject from "@/components/TimeObject";
import TimeSelector from "@/components/TimeSelector";
import ViewSwitch from "@/components/ViewSwitch";

export default {
  name: 'App',

  components: {
    // InfoTag,
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
    ExerciseDetail,
    IconTextCircle,
    IconTextCircleTimer,
    LoginButton,
    NewTask,
    NumberSelector,
    ProfileButton,
    SearchBox,
    // TimeObject,
    TimeSelector,
    ViewSwitch
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
