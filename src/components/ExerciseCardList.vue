<!-- Lista de rutinas a mostrar -->
<template>
  <v-container fluid>
    <v-row>
      <slot name="header"></slot>
      <v-col v-for="id in ids" :key="id" cols="6">
        <ExerciseCard :id="id" :key="id + '_'+ version" :view-details="viewDetails" :editRemove="editRemoveCard" @cardTouched="exerciseTouched" @editTouched="editExercise" @deleteTouched="deleteExercise"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ExerciseCard from "@/components/ExerciseCard";
import {useExercises} from "@/store/Exercises";

export default {
  name: "ExerciseCardList",
  components: {
    ExerciseCard
  },
  props:{
    ids:{
      type:Array[Number],
      required:true
    },
    version:{
      type:Number,
      required:true
    },
    editRemoveCard: {
      type: Boolean,
      required: false,
      default(){
        return true
      }
    },
    viewDetails: {
      type: Boolean,
      required: false,
      default() {
        return true;
      }
    }
  },
  methods: {
    exerciseTouched(exerciseId){
      this.$emit('exerciseTouched', exerciseId);
    },
    editExercise(exerciseId){
      this.$emit('editExercise', exerciseId);
    },
    deleteExercise(exerciseId){
      this.$emit('deleteExercise', exerciseId);
    }
    // ...mapActions(useExercises,['getExerciseById'])
  },
  async created() {
    const exercises = useExercises()
    await exercises.fetchExercises();//las busca cuando se crea el componente
  }
}
</script>

<style scoped>

</style>