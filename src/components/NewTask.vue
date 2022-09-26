<template>
  <v-btn
      outlined
      class="ma-2 TaskBtn elevation-3"
      @click="SelectTask"
      :height=height
      :width="width"
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
    width:{
      type:Number,
      require:true
    },
    height:{
      type:Number,
      require:true
    },
  },
  methods:{
    SelectTask(){
      console.log(`Click in ${this.name}`)
      this.$emit(`${this.name}`)
    }
  }
}
</script>

<style scoped>
.TaskBtn{
  border-radius: 12px;
  border: 1px solid black;
}
</style>