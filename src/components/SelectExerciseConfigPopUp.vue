<!-- PopUp para indicar la cantidad de repeticiones y/o series a realizar al elegir un ejercicio -->
<template>
  <v-card class="card-style">
    <v-container fluid>
      <v-row justify="space-between" class="top-style">
        <v-col :cols="1">
          <v-icon v-text="$vuetify.icons.values.arrowBack"
                  color="#1C1B1F"
                  :size="50"
                  @click="goBack"/>
        </v-col>
        <v-col :cols="1" class="d-flex justify-center">
          <v-icon v-text="$vuetify.icons.values.done"
                  color="#1C1B1F"
                  :size="50"
                  @click="confirmExercise"/>
        </v-col>
      </v-row>
      <v-row class="img-style">
        <v-col :cols="12">
          <v-dialog persistent v-model="mediaDialog">
            <template v-slot:activator="{ on, attrs }">
              <v-img :src="imageSrc" class="d-flex justify-center align-center">
                <v-icon v-text="$vuetify.icons.values.playCircle"
                        color="#1C1B1F"
                        :size="83"
                        class="play-button-style"
                        v-bind="attrs"
                        v-on="on"/>
              </v-img>
            </template>
            <MediaPopUp :img-src="imageSrc" @closeWarning="mediaDialog = false"/>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row class="align-center mr-2">
        <v-col :cols="8">
          <h1 v-if="!isRest" class="d-flex text-truncate">Burpees</h1>
          <h1 v-else class="d-flex text-truncate">Descanso</h1>
        </v-col>
        <v-col :cols="4" class="d-flex justify-end align-center">
          <v-checkbox hide-details dense
                      class="ml-auto checkbox-style pa-0"
                      v-model="timeCheckbox" :class="optionNoSelected"/>
          <TimeSelector class="ml-3" :component-width="150" :component-border-radius="4" data-text="Tiempo" :seconds="10" :minutes="0" :text-size="16" :deactivate="!timeCheckbox" :error="noOptionSelected"/>
        </v-col>
      </v-row>
      <v-row class="mt-n5 align-center mr-2">
        <v-col :cols="8">
          <div class="author-style">
            <span>Autor: </span>
            <span v-if="!isRest">Luz Stewart</span>
            <span v-else>FITI</span>
          </div>
        </v-col>
        <v-col v-if="!isRest" :cols="4" class="d-flex justify-end align-center">
          <v-checkbox hide-details dense
                      class="ml-auto checkbox-style pa-0"
                      v-model="seriesCheckbox" :class="optionNoSelected"/>
          <NumberSelector class="ml-3" :component-width="150" :component-border-radius="4" data-text="Series" :data-value="10" :text-size="16" :deactivate="!seriesCheckbox" :error="noOptionSelected"/>
        </v-col>
      </v-row>
      <v-row v-if="!isRest" class="selector-style">
        <v-container fluid>
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
          <v-row class="mt-n6 filters-style">
            <v-col :cols="4">
              <span class="text-h6">Sin equipamiento</span>
            </v-col>
            <v-col :cols="4">
              <span class="text-h6">Zona media</span>
            </v-col>
            <v-col :cols="4">
              <span class="text-h6">Intensidad media</span>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
      <v-row>
        <v-col :cols="12">
          <ExerciseDetail :textarea-border-radius="12"
                          :textarea-size="20"
                          :title-size="30"
                          :read-only="true"
                          language="es"
                          :textarea-value="descriptionText"/>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import MediaPopUp from "@/components/MediaPopUp";
import ExerciseDetail from "@/components/ExerciseDetail";
import NumberSelector from "@/components/NumberSelector";
import TimeSelector from "@/components/TimeSelector";

export default {
  name: "SelectExerciseConfigPopUp",
  // -------------------------------------------
  // isRest: Indica si la tarjeta es un ejercicio o el descanso por default
  // -------------------------------------------
  props: {
    isRest: {
      type: Boolean,
      required: true
    }
  },
  components: {
    TimeSelector,
    NumberSelector,
    MediaPopUp,
    ExerciseDetail
  },
  data() {
    return {
      mediaDialog: false,
      seriesCheckbox: false,
      timeCheckbox: true,
      noOptionSelected: false,
    }
  },
  methods: {
    // Avisa al padre que debe volver al listado de ejercicios
    goBack(){
      this.$emit('goBack')
    },
    // Avisa al padre que se selecciono y configuro un ejercicio
    confirmExercise(){
      if(!this.seriesCheckbox && !this.timeCheckbox){
        this.noOptionSelected = true
      } else {
        this.$emit('confirmExercise')
      }
    }
  },
  computed: {
    optionNoSelected(){
      return (this.noOptionSelected) ? 'error-style' : ''
    },
    imageSrc(){
      return (this.isRest) ? require('@/assets/rest.png') : require('@/assets/estiramiento.png')
    },
    descriptionText(){
      return (this.isRest) ? 'Tomate un descanso.' : 'Los burpees es un ejercicio muy importante para mantenerse en forma y ejercitan gran parte de los músculos.'
    }
  },
  beforeUpdate() {
    if(this.seriesCheckbox || this.timeCheckbox)
      this.noOptionSelected = false
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

.filters-style span {
  color: black;
  border-radius: 4px;
  border: 2px solid var(--v-darkBlue-base);
  padding: 3px 10px 3px 5px;
}

.author-style span, .details-style span {
  font-size: 30px;
  font-weight: bold;
}

.checkbox-style {
  accent-color: var(--v-darkBlue-base);
  border-radius: 4px;
  border: 2px solid var(--v-grey-base);
}

.checkbox-style.error-style {
  border-color: red;
}

.checkbox-style:deep(div) {
  color: var(--v-darkBlue-base) !important;
  margin-right: 0;
}

.checkbox-style:deep(input) {
  opacity: 1;
}

</style>