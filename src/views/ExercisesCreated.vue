<template>
  <div class="mx-7 mt-7">
    <h1 class="title-style my-5">Ejercicios Creados</h1>
    <v-sheet class="d-flex justify-space-between mr-3" width="40%">
      <FilterMenu :id="1" placeholder='Equipamiento' v-bind:options="['Con Equipamiento','Sin Equipamiento']"  :width="150" @menuChanged="getEquipment" :left-border-radius="4" :right-border-radius="4"></FilterMenu>
      <FilterMenu :id="1" placeholder='Zona Muscular' v-bind:options="['Zona Inferior','Zona Media','Zona Superior']"  :width="150" @menuChanged="getMuscleZone" :left-border-radius="4" :right-border-radius="4"></FilterMenu>
      <FilterMenu :id="1" placeholder='Intensidad' v-bind:options="['Baja Intensidad','Media Intensidad','Alta Intensidad']"  :width="150" @menuChanged="getIntensity" :left-border-radius="4" :right-border-radius="4"></FilterMenu>
    </v-sheet>
    <v-sheet>
      <div class="mt-12">
        <ExerciseCardList v-if="this.dataLoaded" :version="this.version" @editExercise="editExercise" @deleteExercise="deleteExercise"
                          :ids="this.getIdsFilter" >
          <template v-slot:header>
            <v-col class="d-flex" cols="6">
              <v-dialog persistent v-model="createExerciseDialog">
                <template v-slot:activator="{ on, attrs }">
                  <v-card class="d-inline-flex flex-column align-center justify-center new-routine-card-style" hover
                          @click="popUpId = -1"
                          v-bind="attrs"
                          v-on="on"
                          width="100%">
                    <v-icon v-text="$vuetify.icons.values.add" color="#1C1B1F" :size="70"/>
                    <h2 class="new-routine-text-style">Nuevo Ejercicio</h2>
                  </v-card>
                </template>
                <CreateExercisePopUp :exercise-id="popUpId" @exerciseSaved="reRenderExerciseCard"
                                     @cancelExercise="reRenderPopUp" :key="popUpKey"/>
              </v-dialog>
            </v-col>
          </template>
        </ExerciseCardList>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import FilterMenu from "@/components/FilterMenu";
import ExerciseCardList from "@/components/ExerciseCardList";
import CreateExercisePopUp from "@/components/CreateExercisePopUp";
import {useExercises} from "@/store/Exercises"
import {mapActions, mapState} from "pinia";

export default {
  name: "ExercisesCreated",
  components: {
    CreateExercisePopUp,
    ExerciseCardList,
    FilterMenu
  },
  data(){
    return {
      createExerciseDialog: false,
      popUpKey: 0,
      dataLoaded: false,
      popUpId: -1,
      version:0,
      FilterIntensity: '',
      FilterMuscleZone: '',
      FilterEquipment: '',
    }
  },
  methods: {
    changeMenu(menuId,newValue){
      console.log(menuId)
      console.log(newValue)
    },
    async reRenderPopUp(){
      this.createExerciseDialog = false
      this.popUpKey++;
      this.popUpId = -1;
      console.log("Despues de la carga como esta el API")
    },
    reRenderExerciseCard(){
      this.version++;
      console.log("refresh")
      this.reRenderPopUp();
    },
    editExercise(exerciseId){
      this.popUpId = exerciseId;
      console.log(this.popUpId);
      this.popUpKey++;
      this.createExerciseDialog = true;
    },
    async deleteExercise(exerciseId){
      const exercise = await this.$getFromId(exerciseId);
      await this.$deleteExercise(exercise);
      this.version++;
    },
    getIntensity(id, value){
      this.FilterIntensity = value;
    },
    getMuscleZone(id, value){
      this.FilterMuscleZone = value;
    },
    getEquipment(id, value){
      this.FilterEquipment = value;
    },
    ...mapActions(useExercises, {
        $deleteExercise : 'deleteExerciseFromApiAndStore',
        $getFromId: 'getExerciseFromApi'
      }),

  },
  computed: {
    ...mapState(useExercises, {getExercises: 'getExercises'}),
    getIdsFilter(){
      return this.getExercises.filter(exercise => (this.FilterIntensity === '' || this.FilterIntensity===exercise.metadata.Intensity) &&
          (this.FilterEquipment=== '' || this.FilterEquipment===exercise.metadata.equipment) &&
          (this.FilterMuscleZone==='' || this.FilterMuscleZone===exercise.metadata.muscleZone)).map(exercise => exercise.id)
      }
  },
  // Se ejecuta antes de crear la vista (el primer paso del componente)
  async beforeCreate(){
    // Obtenes la informacion de los ejercicios y lo guarda en el store
    const exercises = useExercises();
    await exercises.fetchExercises();
    this.dataLoaded = true;
  }
}
</script>

<style scoped>

.title-style {
  font-size: 48px;
}


.new-routine-card-style{
  border-radius: 20px;
  border: black solid 1px;
  aspect-ratio : 4 / 1;
  background-color: white;
}

</style>