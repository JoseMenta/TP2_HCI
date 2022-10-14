<!-- Componente para el popup de creacion de ejercicios -->
<template>
  <v-card v-if="dataLoaded" class="card-style">
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
              <iframe v-if="showContent" :src="getSrc" height="100%" width="100%" class="iframe-class"></iframe>
              <v-img v-else :src="require('@/assets/placeholder.jpg')" class="d-flex justify-center align-center">
                <v-icon v-text="$vuetify.icons.values.playCircle"
                        color="#1C1B1F"
                        :size="83"
                        class="play-button-style"
                        v-bind="attrs"
                        v-on="on"/>
              </v-img>
            </template>
            <UploadUrl title="Cargar contenido (URL)"
                        text="Colocar el url de una imagen o video, preferentemente que no sea de youtube"
                        @closeWarning="mediaDialog = false" @subir="uploadUrl"/>
          </v-dialog>

        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="12">
          <v-text-field id="title"
                        :rules="[rules.required, rules.duplicate]"
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
            <span>{{ getUserName }}</span>
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
              <FilterMenu :id="0" :left-border-radius="4" :right-border-radius="4" :width="195"  :condition="required && !equipment" errorText="Es necesario el Equipamento"
                          :placeholder="getEquipmentValue" @menuChanged="inputEquipment" :options="['Con equipamiento','Sin equipamiento']"/>
            </v-col>
            <v-col :cols="4">
              <FilterMenu :id="1" :left-border-radius="4" :right-border-radius="4"  :condition="required && !muscleZone" errorText="Es necesaria la zona muscular"
                          :width="195" :placeholder="getMuscleZone" @menuChanged="inputMuscleZone" :options="['Todo el cuerpo','Zona inferior','Zona media','Zona superior']"/>
            </v-col>
            <v-col :cols="4">
              <FilterMenu :id="2" :left-border-radius="4" :right-border-radius="4" :condition="required && !Intensity" errorText="Es necesario la Intensidad"
                          :width="195" :placeholder="getIntensity" @menuChanged="inputIntensity" :options="['Baja intensidad','Media intensidad','Alta intensidad']"/>
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

import {useExercises} from "@/store/Exercises";
import {mapActions, mapState} from "pinia";
import {Exercise} from "@/api/exercise";
import {Video} from "@/api/exercise";

import {useUsers} from "@/store/User";
import UploadUrl from "@/components/UploadUrl";


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
    UploadUrl,
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
      showContent: false,
      dataLoaded: false,

      rules: {
        required: value => !!value || 'El titulo del ejercicio es requerido.',
        duplicate: value => !this.getExercises.map(exercise => exercise.name).includes(value) || 'Otro ejercicio cuenta con este nombre.',
      },

      // Datos requeridos para el scroll
      duration: 200,
      offset: 0,
      easing: 'easeInOutCubic',
      metaData: {equipment : '', muscleZone : '', Intensity : '', url: ''},
      required: false,
      Intensity : false,
      muscleZone : false,
      equipment : false,
      duplicateName: false,
    }
  },
  methods: {
    confirm(){
      if(this.exerciseName === '' || !this.Intensity || !this.muscleZone || !this.equipment || this.duplicateName){
        this.updateTitleIsEmpty()
        this.required=true;
        this.$vuetify.goTo(this.target, this.options)
        console.log(this.required)
        console.log(this.Intensity)
      } else {
        this.exerciseSaved()
      }
    },
    uploadUrl(url){
      this.metaData.url=url
      console.log(this.metaData)
      this.mediaDialog = false;
      this.showContent = true;
    },
    updateTitleIsEmpty(){
      this.titleIsEmpty = (this.exerciseName === '')
      if(this.getExercises.map(exercise => exercise.name).includes(this.exerciseName))
        this.duplicateName = true;
      else
        this.duplicateName = false;
    },
    setResult(result){
      this.result = JSON.stringify(result, null, 2)
    },
    async exerciseSaved(){
      const exerciseCreated = new Exercise(this.exerciseName, this.details, "exercise", this.metaData)
      try {
        if(this.exerciseId === -1){
          this.exercise = await this.$addExercise(exerciseCreated);
          const videoCreated = new Video(1, this.url);
          await this.$uploadVideo(this.exercise.id, videoCreated);
        }
        else{
          this.exercise = await this.$modifyExercise(this.exerciseId, exerciseCreated);
        }
        this.setResult(this.exercise)
      } catch (e) {
        console.log(e)
      }
      this.$emit("exerciseSaved")
    },
    cancelExercise() {
      // El padre debe cerrar el popUp
      this.$emit("cancelExercise")
    },
    ...mapActions(useExercises, {
      $addExercise: 'addExerciseToApiAndStore',
      $modifyExercise : 'modifyExerciseInApiAndStore',
      $uploadVideo: 'addVideo'
    }),
    detailsInput(value, input) {
      this.detailsIsEmpty=value;
      this.details=input;
    },
    inputEquipment(id, option){
      this.metaData.equipment = option;
      this.equipment = true;
    },
    inputMuscleZone(id, option){
      this.metaData.muscleZone = option;
      this.muscleZone = true;
    },
    inputIntensity(id, option){
      this.metaData.Intensity = option;
      this.Intensity = true;
    },
    ...mapActions(useExercises, {getExercise: 'getExerciseByIdFromStore'})
  },
  computed: {
    ...mapState(useUsers, {user: 'user'}),
    ...mapState(useExercises, {getExercises: 'getExercises'}),
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
    getUserName(){
      return this.user.firstName + ' ' + this.user.lastName
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
      if(this.exerciseId === -1){
        return '';
      } else {
        return this.getExercise(this.exerciseId).metadata.equipment;
      }
    },
    // TODO: Requiere de metadata
    getMuscleZone(){
      if(this.exerciseId === -1){
        return '';
      } else {
        return this.getExercise(this.exerciseId).metadata.muscleZone;
      }
    },
    // TODO: Requiere de metadata
    getIntensity(){
      if(this.exerciseId === -1){
        return '';
      } else {
        return this.getExercise(this.exerciseId).metadata.Intensity;
      }
    },
    getDetail(){
      if(this.exerciseId === -1){
        return '';
      } else {
        return this.getExercise(this.exerciseId).detail;
      }
    },
    getUrl(){
      if(this.exerciseId === -1){
        return '';
      } else {
        return this.getExercise(this.exerciseId).metadata.url;
      }
    },
    getBoolean(){
      return this.exerciseId !== -1
    },
    getSrc(){
      return this.metaData.url;
    }
  },
  beforeMount() {
    this.exerciseName = this.getExerciseName;
    this.details = this.getDetail;
    this.metaData.equipment = this.getEquipmentValue;
    this.metaData.muscleZone = this.getMuscleZone;
    this.metaData.Intensity = this.getIntensity;
    this.metaData.url = this.getUrl;
    this.Intensity = this.getBoolean;
    this.muscleZone = this.getBoolean;
    this.equipment = this.getBoolean;
    this.showContent = this.getBoolean;
    console.log(this.metaData.url)
  },
  async beforeCreate(){
    const usersStore = useUsers();
    await usersStore.getCurrentUser();
    this.dataLoaded = true;
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

.iframe-class{
  border: 0 white;
  border-radius: 0;
}

</style>