<template>
  <v-btn
      outlined
      class="TaskBtn elevation-3"
      :height="height"
      width="100%"
  >
    <v-icon color="black">{{icon}}</v-icon>
    <span class="pa-3">{{name}}</span>
  </v-btn>
</template>

<script>
export default {
  name: "NewTask",
  props:{
    name:{
      type:String,
      required:true
    },
    icon:{
      type:String,
      required: true
    },
    height:{
      type:Number,
      require:true
    }
  },
  methods:{
  }
}
</script>

<style scoped>
.TaskBtn{
  border-radius: 12px;
  border: 1px solid black;
  background-color: white;
}
</style>