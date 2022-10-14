<template>
  <v-card class="d-inline-flex flex-row main_card justify-space-between" outlined hover width="100%" @click="touchCard">
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
<!-- Ojo cambiar imagen, es para meterme despues con la meta data-->
    <iframe :src="exerciseData.metadata.url" height="100%" width="auto" class="iframe-class"></iframe>
  </v-card>
</template>

<script>
import {useExercises} from "@/store/Exercises";

export default {
  name: "ExerciseCard",
  data() {
    return {
      url : ''
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
    }
  },
  computed:{
    exerciseData(){
      const exercises = useExercises()
      return exercises.getExerciseByIdFromStore(this.id)
    },
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
      console.log(`edit touched in ExerciseCard ${this.id}`)
      this.$emit('editTouched', this.id, this.order)
    },
    touchDelete(){
      console.log(`delete touched in ExerciseCard ${this.id}`)
      this.$emit('deleteTouched', this.id, this.order)
    },
    touchCard(){
      console.log(`ExerciseCard ${this.id} touched`)
      this.$emit('cardTouched', this.id, this.order)
    },
  },
  /*
  async beforeMount() {
    const exercises = useExercises()
    const video = await exercises.getVideo(this.id, 1);
    console.log(this.id)
    console.log("lo que recibi")
    console.log(video)
    this.url = video.url
  }*/
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