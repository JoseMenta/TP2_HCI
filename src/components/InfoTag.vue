<template>
  <v-btn
      label
  class="tag rounded-lg"
  color="grey">{{content}}</v-btn>
</template>

<script>
export default {
  name: "InfoTag",
  props:{
    content:{
      type:String,
      required:true
    }
  }
}
</script>

<style scoped>
.tag{
  margin-right: 10px;
}
/*Esto es si no usamos componentes de vue*/
/*.tag{*/
/*  color:var(--v-black-base);*/
/*  background-color:var(--v-blue-base);*/
/*}*/
</style>