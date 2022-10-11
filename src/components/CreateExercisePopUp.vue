<!-- Componente para el popup de creacion de ejercicios -->
<template>
  <v-card class="card-style">
    <v-container class="container-style">
      <v-row justify="space-between" class="top-style">
        <v-col :cols="1">
          <v-dialog v-model="closeDialog" width="50%">
            <!-- La manera de abrir un popUp -->
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-text="$vuetify.icons.values.clear"
                      color="#1C1B1F"
                      :size="50"
                      v-bind="attrs"
                      v-on="on"/>
            </template>
            <!-- Lo que va a mostrar el popUp -->
            <AlertPopUp title="¡Atención!"
                        text="¿Está seguro que desea salir? Perderá el ejercicio creado."
                        @closeWarning="closeDialog = false" @cancel="cancelExercise"/>
          </v-dialog>

        </v-col>
        <v-col :cols="1" class="d-flex justify-center">
          <v-icon v-text="$vuetify.icons.values.done"
                  color="#1C1B1F"
                  :size="50"
                  @click="confirm"/>
        </v-col>
      </v-row>
      <v-row class="img-style">
        <v-col :cols="12">
          <v-dialog persistent v-model="mediaDialog">
            <template v-slot:activator="{ on, attrs }">
              <v-img :src="require('@/assets/placeholder.jpg')" class="d-flex justify-center align-center">
                <v-icon v-text="$vuetify.icons.values.playCircle"
                        color="#1C1B1F"
                        :size="83"
                        class="play-button-style"
                        v-bind="attrs"
                        v-on="on"/>
              </v-img>
            </template>
            <MediaPopUp :img-src="getExerciseImage" @closeWarning="mediaDialog = false"/>
          </v-dialog>

        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="12">
          <v-text-field id="title"
                        :rules="[rules.required]"
                        :error="titleIsEmpty"
                        @input="updateTitleIsEmpty"
                        placeholder="Ingrese el nombre del ejercicio"
                        solo
                        flat
                        v-model="exerciseName"
                        class="exercise-title-style"
          />
        </v-col>
      </v-row>
      <v-row class="mt-n5">
        <v-col :cols="12">
          <div class="d-inline author-style">
            <span>Autor: </span>
            <span>{{this.getUser.firstName}} {{this.getUser.lastName}}</span>
          </div>
        </v-col>
      </v-row>
      <v-row class="selector-style">
        <v-container class="container-style">
          <v-row justify="space-between" class="details-style">
            <v-col :cols="4">
              <span>Equipamiento</span>
            </v-col>
            <v-col :cols="4">
              <span>Zona muscular</span>
            </v-col>
            <v-col :cols="4">
              <span>Intensidad</span>
            </v-col>
          </v-row>
          <v-row class="mt-n6">
            <v-col :cols="4">
              <!-- TODO: Definir equipamientos posibles para un ejercicio -->
              <FilterMenu :id="0" :left-border-radius="4" :right-border-radius="4" :width="195" :placeholder="getEquipmentValue" :options="['Sin equipamiento', 'Colchoneta', 'Mancuernas', 'Biciclete fija']"/>
            </v-col>
            <v-col :cols="4">
              <FilterMenu :id="1" :left-border-radius="4" :right-border-radius="4" :width="195" :placeholder="getMuscleZone" :options="['Todo el cuerpo', 'Zona inferior', 'Zona media', 'Zona superior']"/>
            </v-col>
            <v-col :cols="4">
              <FilterMenu :id="2" :left-border-radius="4" :right-border-radius="4" :width="195" :placeholder="getIntensity" :options="['Baja', 'Media', 'Alta']"/>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
      <v-row>
        <v-col :cols="12">
          <ExerciseDetail :textarea-border-radius="12" :textarea-size="20" :title-size="30" :read-only="false" :textarea-value="getDetail" @input="detailsInput"/>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import FilterMenu from "@/components/FilterMenu";
import ExerciseDetail from "@/components/ExerciseDetail";
import AlertPopUp from "@/components/AlertPopUp";
import MediaPopUp from "@/components/MediaPopUp";

import {useExercises} from "@/store/Exercises";
import { mapActions } from "pinia";
import {Exercise} from "@/api/exercise";

import {useUsers} from "@/store/User";


export default {
  name: "CreateExercisePopUp",
  // ------------------------------------------
  // Number exerciseId: Indica el id del ejercicio que se esta editando (vale -1 si es un ejercicio nuevo)
  // ------------------------------------------
  props: {
    exerciseId: {
      type: Number,
      required: true
    }
  },
  components: {
    MediaPopUp,
    AlertPopUp,
    FilterMenu,
    ExerciseDetail
  },
  data() {
    return {
      // body{
//     name: "Jumping Jacks",
//     detail: "Jumping Jacks",
//     type: "exercise",
//     metadata: null
// }
      result: null,
      exercise: null,
      exerciseName: '',
      titleIsEmpty: false,
      // Maneja el popUp de alerta (cuando es true se abre el popUp, cuando es false se cierra el popUp)
      closeDialog: false,
      // Maneja el popUp de imagen/video (cuando es true se abre el popUp, cuando es false se cierra el popUp
      mediaDialog: false,
      details: '',
      detailsIsEmpty: false,

      rules: {
        required: value => !!value || 'El titulo del ejercicio es requerido.'
      },

      // Datos requeridos para el scroll
      duration: 200,
      offset: 0,
      easing: 'easeInOutCubic',
    }
  },
  methods: {
    confirm(){
      if(this.exerciseName === ''){
        this.updateTitleIsEmpty()
        this.$vuetify.goTo(this.target, this.options)
      } else {
        this.exerciseSaved()
      }
    },
    updateTitleIsEmpty(){
      this.titleIsEmpty = (this.exerciseName === '')
    },
    setResult(result){
      this.result = JSON.stringify(result, null, 2)
    },
    async exerciseSaved(){
      this.$emit("exerciseSaved")
      const exerciseCreated = new Exercise(this.exerciseName, this.details, "exercise", null)
      try {
        if(this.exerciseId === -1){
          this.exercise = await this.$addExercise(exerciseCreated);
        }
        console.log(this.exercise)
        this.setResult(this.exercise)
        console.log("subido")
      } catch (e) {
        console.log(e)
      }
      console.log("listo")

    },
    cancelExercise() {
      // El padre debe cerrar el popUp
      this.$emit("cancelExercise")
    },
    ...mapActions(useExercises, {
      $addExercise: 'addExerciseToApiAndStore',
      $modifyExercise: ''
    }),
    detailsInput(value, input) {
      this.detailsIsEmpty=value;
      this.details=input;
    },
    ...mapActions(useUsers, {getUser: 'getCurrentUser'}),
    ...mapActions(useExercises, {getExercise: 'getExerciseByIdFromStore'})
  },
  computed: {
    target () {
      return '#title'
    },
    options () {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      }
    },
    getExerciseName() {
      if(this.exerciseId === -1){
        return '';
      } else {
        return this.getExercise(this.exerciseId).name;
      }
    },
    getExerciseImage(){
      // if(this.exerciseId === -1){
      //   return require('@/assets/placeholder.jpg');
      // } else {
      //   // TODO: Realizar el manejo de imagenes
      //   // return this.
      // }
      return require('@/assets/placeholder.jpg');
    },
    // TODO: Requiere de metadata
    getEquipmentValue(){
      return 'Sin equipamiento'
    },
    // TODO: Requiere de metadata
    getMuscleZone(){
      return 'Todo el cuerpo'
    },
    // TODO: Requiere de metadata
    getIntensity(){
      return 'Baja'
    },
    getDetail(){
      if(this.exerciseId === -1){
        return '';
      } else {
        return this.getExercise(this.exerciseId).detail;
      }
    }
  },
  beforeMount() {
    this.exerciseName = this.getExerciseName;
  }
}
</script>

<style scoped>

.row:not(.img-style,.top-style, .selector-style){
  margin-left: 20px;
}

.card-style {
  border-radius: 24px;
}

.container-style {
  max-width: none;
}

.img-style * {
  height: 25vh;
}

.img-style .col {
  padding: 0;
}

.play-button-style {
  display: flex;
  margin: auto;
}

.exercise-title-style:deep(input){
  font-size: 48px;
}

/* Permite modificar el estilo del input si esta siendo modificado (:focus) o no (:not(:focus)) */
.exercise-title-style:deep(input:focus) {
  color: black;
}

.exercise-title-style:deep(input:not(:focus)){
  color: #808080;
}

.author-style span, .details-style span {
  font-size: 30px;
  font-weight: bold;
}

</style>