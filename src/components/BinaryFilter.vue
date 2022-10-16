<template>
  <v-btn-toggle class="btn-toggle-style" mandatory borderless v-model="select" >
    <v-btn v-for="(name, index) in filters" :key="index"
           :width="150"
           height="auto"
           :class="format(index)"
           @click="sentSelect(index)">
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
    },
    prevValue:{
      type: Number,
      required: true
    }
  },
  data(){
    return {
      select: this.prevValue
    }
  },
  methods: {
    format(index){
      return (this.select === index) ? 'active-btn-style' : 'nonactive-btn-style'
    },
    capitalizeText(text){
      return text.charAt(0).toUpperCase() + text.slice(1)
    },
    sentSelect(index){
      this.$emit('sentSelect', index)
    }
  },
}
</script>

<!--      Todos los formatos estan hardcodeados, definir patrones y hacerlos de una a todos-->
<style scoped>

.btn-toggle-style {
  border-radius: 4px;
  border: 0 solid #142850;
}

.v-btn.active-btn-style {
  background-color: var(--v-green-base);
}

.v-btn.nonactive-btn-style {
  background-color: var(--v-green-base);
  opacity: 50%;
}

.span-style {
  color: white;
  letter-spacing: 0;
  font-size: 12px;
  height: 100%;
  text-transform: none;
}

</style>