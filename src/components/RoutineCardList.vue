<!-- Lista de rutinas a mostrar -->
<template>
  <v-container>
    <v-row>
      <slot name="header"></slot>
      <v-col v-for="i in 10" :key="i" cols="6">
        <RoutineCard img="lionel-messi.webp" name="Futbol para todos" v-bind:is-favorite="true" v-bind:id="1"
                     @favoriteTouched="changeFavorite" v-bind:stars="3"
                     v-bind:tags="['Hello','World', 'Dale', 'Messi', 'La', 'Scaloneta', 'Qatar', '2022']"/>


      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RoutineCard from "@/components/RoutineCard";

export default {
  name: "RoutineCardList",
  components: {
    RoutineCard
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