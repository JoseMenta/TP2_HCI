<template>
  <v-btn
      :width=width
      :height=height
      class="dropdownFilters justify-space-between elevation-3"
      :class="{'disable-events': true}"
  >
    <span class="btn-text-style">{{name}}</span>
  </v-btn>
</template>

<script>
export default {
  name: "ExerciseCategory",
  props:{
    id:{
      type:Number,
      required:true
    },
    name:{
      type:String,
      required:true,
    },
    width:{
      type:Number,
      require:true
    },
    height:{
      type:Number,
      require:true
    },
}
}
</script>

<style scoped>
.disable-events {
  pointer-events: none
}

.dropdownFilters{
  border-radius: 4px;
  border: 2px solid #142850;
  background: white;
}
</style>