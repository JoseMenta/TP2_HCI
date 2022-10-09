<!-- Lista de rutinas a mostrar -->
<template>
  <v-container fluid>
    <v-row>
      <slot name="header"></slot>
      <v-col v-for="elem in exercises" :key="elem.id" cols="6">
        <ExerciseCard :id="elem.id" :details="false" :editRemove="true"
                      @cardTouched="cardTouched" @deleteTouched="deleteTouched" @editTouched="editTouched"></ExerciseCard>


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
    cardTouched(id){
      this.$emit('cardTouched', id)
    },
    deleteTouched(id){
      this.$emit('deleteTouched', id)
    },
    editTouched(id){
      this.$emit('editTouched', id)
    }
    // ...mapActions(useExercises,['getExerciseById'])
  },
  computed:{
    ...mapState(useExercises,{exercises:'getExercises'})
  },
}
</script>

<style scoped>

</style>