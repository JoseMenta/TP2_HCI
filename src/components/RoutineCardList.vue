<!-- Lista de rutinas a mostrar -->
<template>
  <v-container>
    <v-row>
      <slot name="header"></slot>
      <v-col v-for="elem in routines" :key="elem.name" cols="6">
        <router-link :to="{
          name:'routine_details',
          params:{name:elem.name}
        }"></router-link>
        <RoutineCard :img="elem.image" :name="elem.name" v-bind:is-favorite="elem.favorite" v-bind:id="elem.id"
                     @favoriteTouched="changeFavorite" v-bind:stars="elem.stars"
                     v-bind:tags="elem.metadata.tags"
                      @click="changeView(name)"/>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RoutineCard from "@/components/RoutineCard";
import {useCreatedRoutines} from "@/store/CreatedRoutines";
import {mapState} from "pinia";

export default {
  name: "RoutineCardList",
  components: {
    RoutineCard
  },
  computed:{
    ...mapState(useCreatedRoutines,{routines:'getRoutines'})
  },
  methods: {
    changeFavorite(id,status){
      console.log(id)
      console.log(status)
    },
    changeView(paramName){
       this.$router.push(
           {name:'routine_details',
            params:{
             name:paramName
           }
           })
    }
  }
}
</script>

<style scoped>

</style>