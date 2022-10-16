<template>
  <v-card v-if="dataLoaded" class="d-inline-flex flex-row main_card justify-space-between" outlined hover width="100%" @click="touchCard">
    <v-card class="d-inline-flex flex-column pa-1" flat width="60%" >
      <v-card class="d-inline-flex align-center" flat>
        <h2 class="text-truncate" >{{exerciseData.name}}</h2>
<!--       TODO: sacar estos iconos-->
        <v-icon v-if="force || (!isRest && editRemove)" v-text="$vuetify.icons.values.edit" color="black" @click="touchEdit" class="action_icon ml-auto"></v-icon>
        <v-icon v-if="force || (!isRest && editRemove)" v-text="$vuetify.icons.values.delete" color="black" @click="touchDelete" class="action_icon"></v-icon>
      </v-card>
        <p v-show="exerciseData.detail.length<90">{{exerciseData.detail}}</p>
        <p v-show="exerciseData.detail.length>=90">{{exerciseData.detail.substring(0,98)+'..'}}</p>
      <v-sheet v-if="details.needed" class="d-inline-flex align-end mb-2" height="100%">
        <v-sheet v-if="details.repetitions > 0" class="ml-5 mr-10">
          <v-icon class="mr-2" color="black">replay</v-icon>
          <span>{{details.repetitions}}</span>
        </v-sheet>
        <v-sheet v-if="details.duration > 0">
          <v-icon class="mr-2" color="black">alarm</v-icon>
          <span>{{getTime}}</span>
        </v-sheet>
      </v-sheet>
    </v-card >
    <v-sheet height="20" width="20">
      <v-img :src="exerciseData.metadata.url === '' ? require('@/assets/placeholder.jpg') : exerciseData.metadata.url" class="iframe-class"></v-img>
    </v-sheet>




    <v-dialog persistent width="80%" v-model="showDataDialog">
      <SelectExerciseConfigPopUp :read-only="true" @goBack="closePopUp"/>
    </v-dialog>
  </v-card>
</template>

<script>
import SelectExerciseConfigPopUp from "@/components/SelectExerciseConfigPopUp";

import {useExercises} from "@/store/Exercises";

import {useCycleExercises} from "@/store/CycleExercises";

export default {
  name: "ExerciseCard",
  components: {SelectExerciseConfigPopUp},
  data() {
    return {
      showDataDialog: false,
      iconTouched: false,
      exerciseData: {},
      dataLoaded: false
    }
  },
  // --------------------------------------
  // Number id: Id del ejercicio
  // Number order: Orden en el que debe aparecer el ejercicio
  // Boolean editRemove: Indica si los iconos de editar y borrar deben aparecer
  // Object details: Indica si deben aparecer los datos de repeticiones y tiempo y la cantidad de cada uno (tiempo en segundos)
  // Boolean force: Indica si deben aparecer los iconos de edicion y borrar mas alla de que sea una tarjeta de descanso
  props:{
    id:{
      type:Number,
      required:true
    },
    order: {
      type: Number,
      required: false,
    },
    editRemove:{
      type: Boolean,
      required: true
    },
    details:{
      type: Object,
      required: false,
      default() {
        return {needed: false, duration: 0, repetitions: 0}
      }
    },
    force: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    },
    viewDetails: {
      type: Boolean,
      required: false,
      default(){
        return true;
      }
    }
  },
  computed:{
    isRest(){
      return (this.exerciseData.type === "rest");
    },
    getTime(){
      let minutes = parseInt(parseInt(this.details.duration) / 60);
      let seconds = parseInt(parseInt(this.details.duration) % 60);
      minutes = (minutes < 10) ? '0' + minutes : minutes;
      seconds = (seconds < 10) ? '0' + seconds : seconds;
      return `${minutes}:${seconds}`
    }
  },
  methods:{
    touchEdit(){
      this.iconTouched = true;
      console.log(`edit touched in ExerciseCard ${this.id}`)
      this.$emit('editTouched', this.id, this.order, this.details.duration, this.details.repetitions);
    },
    touchDelete(){
      this.iconTouched = true;
      console.log(`delete touched in ExerciseCard ${this.id}`)
      this.$emit('deleteTouched', this.id, this.order)
    },
    async touchCard(){
      if(this.viewDetails && !this.iconTouched){
        const cycleExercisesStore = useCycleExercises();
        await cycleExercisesStore.setExerciseSelectedId(this.id);
        this.showDataDialog = true;
      } else {
        this.iconTouched = false;
      }
      console.log(`ExerciseCard ${this.id} touched`)
      this.$emit('cardTouched', this.id, this.order)
    },
    closePopUp(){
      this.showDataDialog = false;
    }
  },
  async created(){
    const exercises = useExercises()
    this.exerciseData = await exercises.getExerciseFromApi(this.id)
    this.dataLoaded = true;
  }
}
</script>

<style scoped>
.img-format{
  border-bottom-left-radius: 0 ;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
}

.v-sheet.v-card{
  border-radius: 20px;
}

.main_card{
  -moz-border-radius-bottomleft: 0 ;
  border: black solid 1px;
  aspect-ratio : 4 / 1;
}

.action_icon{
  padding-left: 4px;
  padding-right: 4px;
}
h2{
  display: inline;
}
p{
  display: inline-block;
  width:250px;
  height:70px;
}

.iframe-class{
  border: 0 white;
  border-radius: 0;
}

</style>