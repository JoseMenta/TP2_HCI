<template>
  <v-card v-if="dataLoaded" class="block-rutine" flat>
    <v-btn v-if="cycleData.metadata.deletable" @click="removeBlock"
           class="remove-icon-style" :color="$vuetify.theme.themes.light.blue">
      <h6 class="white--text mr-1">Eliminar bloque</h6>
      <v-icon v-text="$vuetify.icons.values.delete" :size="15" color="white"/>
    </v-btn>
    <h3 class="cycle-type-style ml-5 font-italic">{{getTypeName}}</h3>
    <v-card class="d-flex justify-space-between align-center mx-5" color="#E8F1F6" flat>

      <v-text-field
          :rules="[rules.required]"
          :error="required"
          @input="updateIsEmpty"
          placeholder="Nombre de Bloque"
          solo
          flat
          class="title_block mb-7 mt-5"
          background-color="#E8F1F6"
          v-model="cycleData.name"
      ></v-text-field>
      <NumberSelector class="align-self-start" @valueChanged="updateCycleRepetitions"
                      :component-width="190" :text-size="16" :component-border-radius="4"
                      data-text="Repeticiones" :data-value="getRepetitions"
                      :deactivate="false" :error="false" :minimum="1"/>
    </v-card>

    <div class="mb-5">
      <v-container fluid>
        <v-row>
          <v-col v-for="(cycleExercise, index) in getCycleExercises(cycleId)" :key="'exercise_'+index" cols="6">
            <ExerciseCard :id="cycleExercise.data.id" :order="cycleExercise.data.order"
                          :details="{needed: true, duration: cycleExercise.duration, repetitions: cycleExercise.repetitions}"
                          :editRemove="true" :force="true"
                          @editTouched="editExerciseCard" @deleteTouched="removeExercise"/>
          </v-col>
          <v-col class="d-flex flex-column align-center justify-space-between"  cols="6">
            <v-dialog persistent v-model="selectExerciseDialog">
              <template v-slot:activator="{on, attrs}">
                <NewTask name="Agregar Ejercicio" icon="fitness_center" :height="50" class="margin-Task"
                         v-bind="attrs" v-on="on"
                         @click.native="selectExerciseDialog = true"/>
              </template>
              <SelectExercisePopUp :key="selectExercisePopUpKey"
                                   :edit-exercise="editExerciseData"
                                   @closeWindow="reRenderSelectExercise"
                                   @exerciseEdited="editExercise"
                                   @exerciseSelected="addExercise"/>
            </v-dialog>
            <v-dialog persistent v-model="addRestDialog">
              <template v-slot:activator="{on, attrs}">
                <NewTask name="Agregar Descanso" icon="history_toggle_off"
                         v-bind="attrs" v-on="on"
                         @click.native="selectRest"
                         :height="50"/>
              </template>
              <SelectExerciseConfigPopUp :key="addRestPopUpKey"
                                         @goBack="reRenderAddRest()"
                                         @confirmExercise="addExercise"/>
            </v-dialog>

          </v-col>

        </v-row>
      </v-container>


    </div>

    <v-dialog width="30%" v-model="openAlert">
      <AlertPopUp title="ERROR" :text="alertText">
        <template v-slot:actions>
          <v-btn :color="$vuetify.theme.themes.light.green" @click="openAlert = false">
            <span class="white--text">Cerrar</span>
          </v-btn>
        </template>
      </AlertPopUp>
    </v-dialog>
  </v-card>
</template>

<script>
import NumberSelector from "@/components/NumberSelector";
import ExerciseCard from "@/components/ExerciseCard";
import NewTask from "@/components/NewTask";
import SelectExercisePopUp from "@/components/SelectExercisePopUp";
import SelectExerciseConfigPopUp from "@/components/SelectExerciseConfigPopUp";
import AlertPopUp from "@/components/AlertPopUp";


import {useRoutines} from "@/store/Routines";
const routinesStore = useRoutines();

import {useRoutineCycles} from "@/store/RoutineCycles";
const routineCyclesStore = useRoutineCycles();

import {useCycleExercises} from "@/store/CycleExercises";
const cycleExercisesStore = useCycleExercises()

import {CycleTypes} from "@/api/cycles";
import {mapActions} from "pinia";


export default {
  name: "blockRutine",
  components: {AlertPopUp, SelectExerciseConfigPopUp, SelectExercisePopUp, NumberSelector, ExerciseCard, NewTask},
  props:{
    cycleId:{
      type: Number,
      required: true
    },
    required:{
      type: Boolean,
      required: true
    }
  },
  data(){
    return{
      cycleData: {},
      dataLoaded: false,

      selectExercisePopUpKey: 0,
      selectExerciseDialog: false,
      addRestPopUpKey: 0,
      addRestDialog: false,
      editExerciseData: undefined,
      openAlert: false,
      alertText: '',

      // title: '',
      isEmpty: false,
      rules: {
        required: value => !!value || "Necesita Ingresar un titulo de Bloque"
      },
    }
  },
  methods: {
    addExercise(exerciseId, duration, repetitions) {
      const result = routineCyclesStore.addExerciseToCycle(this.cycleId, exerciseId, duration, repetitions);
      if(result === -1){
        this.alertText = 'No se puede tener el mismo ejercicio más de una vez en el mismo ciclo.';
        this.openAlert = true;
      }
      this.reRenderSelectExercise();
      this.reRenderAddRest();
    },
    removeExercise(exerciseId){
      const result = routineCyclesStore.removeExerciseFromCycle(this.cycleId, exerciseId);
      if(result === -1){
        this.alertText = 'El ejercicio no está agregado al ciclo';
        this.openAlert = true;
      }
      this.reRenderSelectExercise();
      this.reRenderAddRest();
    },
    editExercise(exerciseId, duration, repetitions){
      const result = routineCyclesStore.modifyExerciseFromCycle(this.cycleId, exerciseId, duration, repetitions);
      if(result === -1){
        this.alertText = 'No se pudo modificar el ejercicio';
        this.openAlert = true;
      }
      this.editExerciseData = undefined;
      this.reRenderSelectExercise();
      this.reRenderAddRest();
    },
    editExerciseCard(exerciseId, order, duration, repetitions){
      cycleExercisesStore.setExerciseSelectedId(exerciseId);
      this.editExerciseData = {toEdit: true, id:exerciseId, duration: duration, repetitions: repetitions};
      this.reRenderSelectExercise();
      this.reRenderAddRest();
      this.selectExerciseDialog = true;
    },
    selectRest(){
      cycleExercisesStore.setExerciseSelectedIdAsRest();
      this.addRestDialog = true
    },
    reRenderSelectExercise() {
      this.selectExerciseDialog = false;
      this.selectExercisePopUpKey++;
    },
    updateIsEmpty() {
      this.isEmpty = (this.cycleData.name === '')
      this.$emit('input', !this.isEmpty, this.cycleData.name, this.cycleId)
    },
    reRenderAddRest(){
      this.addRestDialog = false;
      this.addRestPopUpKey++;
    },
    updateCycleRepetitions(newValue){
      this.cycleData.repetitions = newValue;
    },
    ...mapActions(useRoutineCycles, {getCycleExercises: "getCycleExercises"}),
    removeBlock(){
      // Para que al checkear los nombres de los ciclos este no sea considerado como invalido
      this.$emit('input', true, this.cycleData.name, this.cycleId);
      routinesStore.deleteCycle(this.cycleId);
    }
  },
  computed: {
    getTypeName(){
      switch (this.cycleData.type) {
        case CycleTypes.WARMUP:
          return 'Calentamiento'
        case CycleTypes.COOLDOWN:
          return 'Elongación'
        default:
          return 'Ejercitación'
      }
    },
    getRepetitions(){
      return this.cycleData.repetitions;
    }
  },
  beforeMount() {
    this.cycleData = routineCyclesStore.getCycleById(this.cycleId);
    this.dataLoaded = true;
  },
  mounted() {
    // Para que el padre lo reconozca apenas se crea
    this.updateIsEmpty();
  }
}
</script>

<style scoped>

:deep(.v-label) {
  font-size: 30px
}

.title_block{
  font-size: 30px;
}

.margin-Task{
  margin-bottom: 30px;
}

.block-rutine{
  background-color: #E8F1F6;
  border: #79747E solid;
  border-radius: 20px !important;
}

.remove-icon-style {
  position: absolute;
  top: -15px;
  right: 20px;
}

.cycle-type-style {
  color: var(--v-darkBlue-base);
}
</style>