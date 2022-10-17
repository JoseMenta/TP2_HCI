<!-- PopUp para indicar la cantidad de repeticiones y/o series a realizar al elegir un ejercicio -->
<template>
  <v-card v-if="dataLoaded" class="card-style">
    <v-container fluid>
      <v-row justify="space-between" class="top-style">
        <v-col :cols="1">
          <v-icon v-text="getIcon"
                  color="#1C1B1F"
                  :size="50"
                  @click="goBack"/>
        </v-col>
        <v-col v-if="!readOnly" :cols="1" class="d-flex justify-center">
          <v-icon v-text="$vuetify.icons.values.done"
                  color="#1C1B1F"
                  :size="50"
                  @click="confirmExercise"/>
        </v-col>
      </v-row>
      <v-row class="img-style align-center">
          <v-img :src="imageSrc" height="242" class="iframe-class"></v-img>
      </v-row>
      <v-row class="align-center mr-2">
        <v-col :cols="8">
          <h1 class="d-flex text-truncate">{{this.exerciseData.name}}</h1>
<!--          <h1 v-else class="d-flex text-truncate">Descanso</h1>-->
        </v-col>
        <v-col v-if="!readOnly" :cols="4" class="d-flex justify-end align-center">
          <v-checkbox hide-details dense
                      class="ml-auto checkbox-style pa-0"
                      v-model="timeCheckbox" :class="optionNoSelected"/>
          <TimeSelector class="ml-3" @newTime="updateTime"
                        :component-width="150" :component-border-radius="4" data-text="Tiempo"
                        :seconds="parseInt(this.time % 60)" :minutes="parseInt(this.time / 60)" :text-size="16"
                        :deactivate="!timeCheckbox" :error="noOptionSelected"/>
        </v-col>
      </v-row>
      <v-row class="mt-n5 align-center mr-2">
        <v-col :cols="8">
          <div class="author-style">
            <span>Autor: </span>
            <span>{{ `${this.user.firstName} ${this.user.lastName}` }}</span>
          </div>
        </v-col>
        <v-col v-if="!readOnly && !isRest" :cols="4" class="d-flex justify-end align-center">
          <v-checkbox hide-details dense
                      class="ml-auto checkbox-style pa-0"
                      v-model="seriesCheckbox" :class="optionNoSelected"/>
          <NumberSelector class="ml-3" @valueChanged="updateSeries"
                          :component-width="150" :component-border-radius="4"
                          data-text="Series" :data-value="series" :text-size="16"
                          :deactivate="!seriesCheckbox" :error="noOptionSelected"/>
        </v-col>
      </v-row>
      <v-row class="selector-style">
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
              <span class="text-h6">{{getEquipment}}</span>
            </v-col>
            <v-col :cols="4">
              <span class="text-h6">{{getMuscleZone}}</span>
            </v-col>
            <v-col :cols="4">
              <span class="text-h6">{{getIntensity}}</span>
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
                          :textarea-value="this.exerciseData.detail"/>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import ExerciseDetail from "@/components/ExerciseDetail";
import NumberSelector from "@/components/NumberSelector";
import TimeSelector from "@/components/TimeSelector";

import {useCycleExercises} from "@/store/CycleExercises";
import {mapState} from "pinia";

import {useUsers} from "@/store/User";
const userStore = useUsers();

export default {
  name: "SelectExerciseConfigPopUp",
  // -------------------------------------------
  // isRest: Indica si la tarjeta es un ejercicio o el descanso por default
  // -------------------------------------------
  props: {
    initialData: {
      type: Object,
      required: false,
      default() {
        return undefined;
      }
    },
    readOnly: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    }
  },
  components: {
    TimeSelector,
    NumberSelector,
    // MediaPopUp,
    ExerciseDetail
  },
  data() {
    return {
      dataLoaded: false,
      mediaDialog: false,
      seriesCheckbox: false,
      timeCheckbox: true,
      noOptionSelected: false,

      time: 10,
      series: 0
    }
  },
  methods: {
    // Avisa al padre que debe volver al listado de ejercicios
    goBack(){
      this.$emit('goBack')
    },
    // Avisa al padre que se selecciono y configuro un ejercicio
    confirmExercise(){
      if((!this.seriesCheckbox && !this.timeCheckbox) || (this.series === 0 && this.time === 0) ||
          (this.series === 0 && !this.timeCheckbox) || (this.time === 0 && !this.seriesCheckbox)){
        this.noOptionSelected = true
        // console.log(this.noOptionSelected)
      } else {
        this.time = (this.timeCheckbox) ? this.time : 0;
        this.series = (this.seriesCheckbox) ? this.series : 0;
        this.$emit('confirmExercise', this.exerciseData.id, this.time, this.series)
      }
    },
    updateTime(newTime){
      this.time = newTime;
    },
    updateSeries(newSeries){
      this.series = newSeries;
    },
  },
  computed: {
    optionNoSelected(){
      return (this.noOptionSelected) ? 'error-style' : ''
    },
    ...mapState(useCycleExercises, {exerciseData: "getExerciseSelectedIdData"}),
    ...mapState(useUsers, {user: 'user'}),
    isRest(){
      return this.exerciseData.type === 'rest';
    },
    imageSrc(){
      if(!this.exerciseData || !this.exerciseData.metadata || !this.exerciseData.metadata.url){
        return require('@/assets/placeholder.jpg')
      }
      return this.exerciseData.metadata.url;
    },
    getEquipment() {
      if(!this.exerciseData || !this.exerciseData.metadata || !this.exerciseData.metadata.equipment){
        return 'Sin equipamiento';
      }
      return this.exerciseData.metadata.equipment;
    },
    getMuscleZone(){
      if(!this.exerciseData || !this.exerciseData.metadata || !this.exerciseData.metadata.muscleZone){
        return 'Todo el cuerpo';
      }
      return this.exerciseData.metadata.muscleZone;
    },
    getIntensity(){
      if(!this.exerciseData || !this.exerciseData.metadata || !this.exerciseData.metadata.Intensity){
        return 'Baja intensidad';
      }
      return this.exerciseData.metadata.Intensity;
    },
    getIcon(){
      return (this.readOnly) ? this.$vuetify.icons.values.clear : this.$vuetify.icons.values.arrowBack;
    }
  },
  beforeUpdate() {
    if(!((!this.seriesCheckbox && !this.timeCheckbox) || (this.series === 0 && this.time === 0) ||
        (this.series === 0 && !this.timeCheckbox) || (this.time === 0 && !this.seriesCheckbox)))
      this.noOptionSelected = false
  },
  async created() {
    await userStore.getCurrentUser();
    this.dataLoaded = true;
  },
  beforeMount(){
    if(!this.initialData){
      this.series = 10;
      this.seriesCheckbox = false;
      this.time = 10;
      this.timeCheckbox = true;
    } else {
      this.series = this.initialData.repetitions;
      this.time = this.initialData.duration;
      this.seriesCheckbox = (this.series > 0);
      this.timeCheckbox = (this.time > 0);
    }
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

.iframe-class{
  border: 0 white;
  border-radius: 0;
}
</style>