<!-- Lista de rutinas a mostrar -->
<template>
  <v-container>
    <v-row>
      <slot name="header"></slot>
      <v-col v-for="i in 10" :key="i" cols="6">
        <ExerciseCard :name="'Abdominales'" :id="1"
                      description="Es un ejercicio dificil que no se logra completar si se come mucho antes de realizarlo pues desdulta masydasd"
                      img="estiramiento.png"></ExerciseCard>


      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ExerciseCard from "@/components/ExerciseCard";

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
  }
}
</script>

<style scoped>

</style>