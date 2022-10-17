<!-- PopUp para elegir un ejercicio al crear una rutina -->
<template>
  <v-carousel v-if="dataLoaded" hide-delimiters hide-delimiter-background :show-arrows="false" height="auto" v-model="step">
    <v-carousel-item>
      <v-card class="card-style">
        <v-app-bar class="topbar-style" color="white">
          <v-icon v-text="$vuetify.icons.values.clear"
                  color="#1C1B1F"
                  :size="50" @click="closeWindow"/>
        </v-app-bar>
        <v-container fluid>
          <v-row class="mt-5 mx-16">
            <v-col cols="12" class="d-inline-flex justify-space-around">
              <FilterMenu :id="1" placeholder='Equipamiento' v-bind:options="['Con equipamiento','Sin equipamiento']"  :width="150" @menuChanged="getEquipment" :left-border-radius="4" :right-border-radius="4"></FilterMenu>
              <FilterMenu :id="1" placeholder='Zona Muscular' v-bind:options="['Todo el cuerpo', 'Zona inferior','Zona media','Zona superior']"  :width="150" @menuChanged="getMuscleZone" :left-border-radius="4" :right-border-radius="4"></FilterMenu>
              <FilterMenu :id="1" placeholder='Intensidad' v-bind:options="['Baja intensidad','Media intensidad','Alta intensidad']"  :width="150" @menuChanged="getIntensity" :left-border-radius="4" :right-border-radius="4"></FilterMenu>
            </v-col>
          </v-row>
          <v-row class="mt-10">
            <ExerciseCardList :view-details="false" :version="0" class="mx-10" @exerciseTouched="openExercise" :edit-remove-card="false" :ids="this.getExercisesIds"/>
          </v-row>
        </v-container>
      </v-card>
    </v-carousel-item>
    <v-carousel-item>
      <SelectExerciseConfigPopUp :initial-data="this.exerciseData" @goBack="step--" @confirmExercise="exerciseSelected"/>
    </v-carousel-item>
  </v-carousel>

</template>

<script>
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
  components: {SelectExerciseConfigPopUp, ExerciseCardList, FilterMenu},
  data() {
    return {
      step: 0,
      dataLoaded: false,
      FilterIntensity: '',
      FilterMuscleZone: '',
      FilterEquipment: '',
      exerciseData: undefined
    }
  },
  methods: {
    getIntensity(id, value){
      this.FilterIntensity = value;
    },
    getMuscleZone(id, value){
      this.FilterMuscleZone = value;
    },
    getEquipment(id, value){
      this.FilterEquipment = value;
    },
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
      return this.getExercises.filter(exercise => (this.FilterIntensity === '' || this.FilterIntensity===exercise.metadata.Intensity) &&
          (this.FilterEquipment=== '' || this.FilterEquipment===exercise.metadata.equipment) &&
          (this.FilterMuscleZone==='' || this.FilterMuscleZone===exercise.metadata.muscleZone)).map(exercise => exercise.id)
    }
  },
  async beforeMount(){
    await exercisesStore.fetchExercises();
    // console.log(this.editExercise)
    if(this.editExercise.toEdit){
      if(this.editExercise.duration || this.editExercise.repetitions){
        this.exerciseData = {duration: this.editExercise.duration, repetitions: this.editExercise.repetitions};
      } else {
        this.exerciseData = undefined;
      }
      this.step = 1;
    } else {
      this.exerciseData = undefined;
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