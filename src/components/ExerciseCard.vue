<template>
  <v-card class="d-inline-flex flex-row main_card justify-space-between" outlined hover width="100%" @click="touchCard">
    <v-card class="d-inline-flex flex-column pa-1" flat width="60%" >
      <v-card class="d-inline-flex align-center" flat>
        <h2 v-if="!isRest" class="text-truncate" >{{exerciseData.name}}</h2>
        <h2 v-else class="text-truncate">Descanso</h2>
<!--       TODO: sacar estos iconos-->
        <v-icon v-if="editRemove" v-text="$vuetify.icons.values.edit" color="black" @click="touchEdit" class="action_icon ml-auto"></v-icon>
        <v-icon v-if="editRemove" v-text="$vuetify.icons.values.delete" color="black" @click="touchDelete" class="action_icon"></v-icon>
      </v-card>
        <p v-if="!isRest" v-show="exerciseData.detail.length<90">{{exerciseData.detail}}</p>
        <p v-if="!isRest" v-show="exerciseData.detail.length>=90">{{exerciseData.detail.substring(0,98)+'..'}}</p>
        <p v-else>Tomate un descanso.</p>
      <v-sheet v-if="details" class="d-inline-flex align-end mb-2" height="100%">
        <v-sheet class="ml-5 mr-10">
          <v-icon class="mr-2" color="black">replay</v-icon>
          <span>Hola</span>
        </v-sheet>
        <v-sheet>
          <v-icon class="mr-2" color="black">alarm</v-icon>
          <span>Hola</span>
        </v-sheet>
      </v-sheet>
    </v-card >
<!-- Ojo cambiar imagen, es para meterme despues con la meta data-->
    <iframe v-if="!isRest" :src="exerciseData.metadata.url" height="100%" width="auto" class="iframe-class"></iframe>
    <v-img v-else :src="require('@/assets/rest.png')" :alt="'Descanso'" contain class="img-format" height="100%"  width="130"/>
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
  props:{
    id:{
      type:Number,
      required:true
    },
    editRemove:{
      type: Boolean,
      required: true
    },
    details:{
      type:Boolean,
      required: true
    },
    // Si se indica y es true, utiliza el formato de tarjeta de descanso
    rest: {
      type: Boolean,
      required: false
    }
    // name:{
    //   type:String,
    //   required:true
    // },
    // description:{
    //   type:String,
    //   required:false,
    //   default(){return ''}
    // },
    // img:{
    //   type:String,
    //   required:true
    // },
    // alt:{
    //   type:String,
    //   required:false,
    //   default() {
    //     return "";
    //   }
    // }
  },
  computed:{
    exerciseData(){
      const exercises = useExercises()
      return exercises.getExerciseByIdFromStore(this.id)
    },
    isRest(){
      return (this.rest === true)
    },
  },
  methods:{
    touchEdit(){
      console.log(`edit touched in ExerciseCard ${this.id}`)
      this.$emit('editTouched', this.id)
    },
    touchDelete(){
      console.log(`delete touched in ExerciseCard ${this.id}`)
      this.$emit('deleteTouched', this.id)
    },
    touchCard(){
      console.log(`ExerciseCard ${this.id} touched`)
      this.$emit('cardTouched', this.id)
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