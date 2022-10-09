<!-- Lista de rutinas a mostrar -->
<template>
  <v-container fluid>
    <v-row>
      <slot name="header"></slot>
      <v-col v-for="elem in exercises" :key="elem.id" cols="6">
        <ExerciseCard :name="elem.name" :id="elem.id"
                      :description="elem.detail"
                      :img="elem.image"></ExerciseCard>


      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ExerciseCard from "@/components/ExerciseCard";
import {useExercises} from "@/store/Exercises";
import {mapState} from 'pinia'
export default {
  name: "ExerciseCardList",
  components: {
    ExerciseCard
  },
  methods: {
    changeFavorite(id,status){
      console.log(id)
      console.log(status)
    },
    // ...mapActions(useExercises,['getExerciseById'])
  },
  computed:{
    ...mapState(useExercises,{exercises:'getExercises'})
  },
}
</script>

<style scoped>

</style>