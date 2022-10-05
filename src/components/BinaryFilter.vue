<template>
  <v-btn-toggle class="btn-toggle-style" mandatory borderless v-model="select">
    <v-btn v-for="(name, index) in filters" :key="index"
           width="auto"
           height="auto"
           :class="format(index)">
      <span class="span-style">{{capitalizeText(name)}}</span>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  name: "BinaryFilter",
  props: {
    filters:{
      type:Array[String],
      required:true,
    }
  },
  data(){
    return {
      select: 0
    }
  },
  methods: {
    format(index){
      return (this.select === index) ? 'active-btn-style' : 'nonactive-btn-style'
    },
    capitalizeText(text){
      return text.charAt(0).toUpperCase() + text.slice(1)
    }
  },
}
</script>

<!--      Todos los formatos estan hardcodeados, definir patrones y hacerlos de una a todos-->
<style scoped>

.btn-toggle-style {
  border-radius: 4px;
  border: 2px solid #142850;
}

.v-btn.active-btn-style {
  background-color: #DAE1E7;
}

.v-btn.nonactive-btn-style {
  background-color: white;
}

.span-style {
  color: black;
  letter-spacing: 0;
  font-size: 12px;
  text-transform: none;
}

</style>