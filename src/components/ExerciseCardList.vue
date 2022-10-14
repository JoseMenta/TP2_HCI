<!-- Lista de rutinas a mostrar -->
<template>
  <v-container fluid>
    <v-row>
      <slot name="header"></slot>
      <v-col v-for="id in ids" :key="id" cols="6">
        <ExerciseCard :id="id" :key="id + '_' + version" :details="false" :editRemove="true" @editTouched="editExercise" @deleteTouched="deleteExercise"/>
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
    }
  },
  methods: {
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