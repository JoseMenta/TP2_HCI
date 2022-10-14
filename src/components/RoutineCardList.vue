<!-- Lista de rutinas a mostrar -->
<template>
  <v-container>
    <v-row>
      <slot name="header"></slot>
      <v-col v-for="routine in routines" :key="routine.id" cols="6">
        <RoutineCard :routine-data="routine" @favoriteTouched="changeFavorite" />

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RoutineCard from "@/components/RoutineCard";
// import {useRoutines} from "@/store/Routines";
// import {mapState} from "pinia";

export default {
  name: "RoutineCardList",
  components: {
    RoutineCard
  },
  props: {
    // ------------------------------------------
    // Array routines: Las rutinas a mostrar
    // ------------------------------------------
    routines: {
      type: Array[Object],
      required: true
    }
  },
  // computed:{
  //   ...mapState(useRoutines,{routines:'getRoutines'})
  // },
  methods: {
    changeFavorite(id,status){
      console.log(id)
      console.log(status)
    },
    // changeView(paramName){
    //    this.$router.push(
    //        {name:'routine_details',
    //         params:{
    //          name:paramName
    //        }
    //        })
    // }
  }
}
</script>

<style scoped>

</style>