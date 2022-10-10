<template>
  <v-card class="d-inline-flex flex-row main_card" outlined hover width="100%" @click="touchCard">
    <v-card class="d-inline-flex flex-column pa-1" flat width="60%" >
      <v-card class="d-inline-flex align-center" flat>
        <h2 class="text-truncate" >{{exerciseData.name}}</h2>
<!--       TODO: sacar estos iconos-->
        <v-icon v-if="editRemove" v-text="$vuetify.icons.values.edit" color="black" @click="touchEdit" class="action_icon ml-auto"></v-icon>
        <v-icon v-if="editRemove" v-text="$vuetify.icons.values.delete" color="black" @click="touchDelete" class="action_icon"></v-icon>
      </v-card>
        <p v-show="exerciseData.detail.length<90">{{exerciseData.detail}}</p>
        <p v-show="exerciseData.detail.length>=90">{{exerciseData.detail.substring(0,98)+'..'}}</p>
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
    <v-img :src="exerciseData.image" :alt="exerciseData.name" contain class="img-format" height="100%"  width="130"></v-img>
  </v-card>
</template>

<script>
import {mapActions} from "pinia";
import {useExercises} from "@/store/Exercises";

export default {
  name: "ExerciseCard",
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
    ...mapActions(useExercises, {getExercisesByIdFromStore: 'getExercisesByIdFromStore'}),
    exerciseData(){
      const exercises = useExercises()
      return exercises.getExerciseByIdFromStore(this.id)
    }
  },
  methods:{
    touchEdit(){
      console.log(`edit touched in ExerciseCard ${this.id}`)
      this.$emit('editTouched',this.id)
    },
    touchDelete(){
      console.log(`delete touched in ExerciseCard ${this.id}`)
      this.$emit('deleteTouched',this.id)
    },
    touchCard(){
      console.log(`ExerciseCard ${this.id} touched`)
      this.$emit('cardTouched',this.id)
    }
  },
  async created(){
    const exercises = useExercises()
    return exercises.fetchExerciseById(this.id)
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
  border-radius: 20px;
  border: black solid 1px;
  aspect-ratio : 4 / 1;
}

.action_icon{
  padding-left: 4px;
  padding-right: 4px;
}
h2{
  width: 200px;
  display: inline;
}
p{
  display: inline-block;
  width:250px;
  height:70px;
}
</style>