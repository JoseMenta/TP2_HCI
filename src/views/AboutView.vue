<template>
  <div class="about">
    <h1>{{name + index}}</h1>
    <p>{{getRoutineById(index)}}</p>
    <button @click="goBack">Back</button>
  </div>
</template>

<script>
import {mapActions} from 'pinia'
import {useRoutines} from "@/store/Routines";

export default {
  name: "aboutView",
  props:{
    name:{
      type:String,
      required:true
    },
    index:{
      type:Number,
      required:true
    }
  },
  methods: {
    changeMenu(menuId,newValue){
      console.log(menuId)
      console.log(newValue)
    },
    goBack(){
      this.$router.back()
    },
    ...mapActions(useRoutines,['getRoutineById'])
  },
}
</script>
