<!-- PopUp para elegir un ejercicio al crear una rutina -->
<template>
  <v-carousel v-if="dataLoaded" hide-delimiters hide-delimiter-background :show-arrows="false" height="auto" v-model="step">
    <v-carousel-item>
      <v-card class="card-style">
        <v-app-bar class="topbar-style" color="white">
          <v-icon v-text="$vuetify.icons.values.clear"
                  color="#1C1B1F"
                  :size="50" @click="closeWindow"/>
          <SearchBox placeholder="Buscar ejercicios"
                     :search-method="search"
                     :search-box-width="445"
                     :icon-size="30"
                     :btn-border-radius="12"
                     :text-size="20" class="mx-auto mt-3" language="es" :filters="false"/>
        </v-app-bar>
        <v-container fluid>
          <v-row class="mt-5 mx-16">
            <v-col cols="12" class="d-inline-flex justify-space-around">
              <FilterMenu :id="0"
                          :options="['Propio', 'Otros', 'Indistinto']"
                          :width="180"
                          :placeholder="'Autor'"
                          :right-border-radius="4"
                          :left-border-radius="4"/>
              <FilterMenu :id="0"
                          :options="['Zona inferior', 'Zona media', 'Zona superior']"
                          :width="180"
                          :placeholder="'Zona'"
                          :right-border-radius="4"
                          :left-border-radius="4"/>
              <FilterMenu :id="0"
                          :options="['Sin equipamiento', 'Colchoneta', 'Mancuernas', 'Biciclete fija']"
                          :width="180"
                          :placeholder="'Equipamiento'"
                          :right-border-radius="4"
                          :left-border-radius="4"/>
              <FilterMenu :id="0"
                          :options="['Intensidad baja', 'Intensidad media', 'Intensidad alta']"
                          :width="180"
                          :placeholder="'Intensidad'"
                          :right-border-radius="4"
                          :left-border-radius="4"/>

            </v-col>
          </v-row>
          <v-row class="mt-10">
            <ExerciseCardList :version="0" class="mx-10" @exerciseTouched="openExercise" :edit-remove-card="false" :ids="this.getExercisesIds"/>
          </v-row>
        </v-container>
      </v-card>
    </v-carousel-item>
    <v-carousel-item>
      <SelectExerciseConfigPopUp @goBack="step--" @confirmExercise="exerciseSelected"/>
    </v-carousel-item>
  </v-carousel>

</template>

<script>
import SearchBox from "@/components/SearchBox";
import FilterMenu from "@/components/FilterMenu";
import ExerciseCardList from "@/components/ExerciseCardList";
import SelectExerciseConfigPopUp from "@/components/SelectExerciseConfigPopUp";

import {useExercises} from "@/store/Exercises";
import {mapState} from "pinia";
const exercisesStore = useExercises();

import {useCycleExercises} from "@/store/CycleExercises";
const cycleExercisesStore = useCycleExercises();

export default {
  name: "SelectExercisePopUp",
  props: {
    editExercise: {
      type: Object,
      required: false,
      default() {
        return {toEdit: false, exerciseId: -1}
      }
    }
  },
  components: {SelectExerciseConfigPopUp, ExerciseCardList, FilterMenu, SearchBox},
  data() {
    return {
      step: 0,
      dataLoaded: false
    }
  },
  methods: {
    search(){
      alert("Searching...")
    },
    closeWindow() {
      this.step = 0
      // El padre debe cerrar el popUp
      this.$emit("closeWindow")
    },
    openExercise(id) {
      cycleExercisesStore.setExerciseSelectedId(id);
      this.step++;
    },
    exerciseSelected(exerciseId, duration, repetitions) {
      if(this.editExercise.toEdit){
        this.$emit("exerciseEdited", exerciseId, duration, repetitions);
      } else {
        this.$emit("exerciseSelected", exerciseId, duration, repetitions);
      }
    }
  },
  computed: {
    ...mapState(useExercises, {getExercises: "getNonRestExercises"}),
    getExercisesIds(){
      return this.getExercises.map((exercise) => exercise.id);
    }
  },
  async beforeMount(){
    await exercisesStore.fetchExercises();
    if(this.editExercise.toEdit){
      this.step = 1;
    } else {
      this.step = 0;
      cycleExercisesStore.setExerciseSelectedId(-1);
    }
    this.dataLoaded = true;
  },
}
</script>

<style scoped>

.topbar-style {
  position: marker;
  top: 0;
  z-index: 1;
}

.card-style {
  border-radius: 24px;
}

</style>