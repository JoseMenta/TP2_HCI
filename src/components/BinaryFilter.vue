<template>
  <v-btn-toggle class="border-btn"
                borderless
                v-model="format">
    <v-btn v-for="(name, index) in filters" :key="index"
           :width=width
           :height=height
           :class="{backgroundColor: format(index)}" @click="selectFilter(index)">
      <span>{{name}}</span>
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
    width:{
      type:Number,
      require:true
    },
    height:{
      type:Number,
      require:true
    },
  },
  data(){
    return {
      select: 0
    }
  },
  methods: {
    format(index){
      return (this.select === index) ? '#FFFFFF' : '#DAE1E7'
    },
    selectFilter(index){
        this.select=index
        console.log(`Click in ${this.select}`)
        this.$emit(`${this.select}`)
    }
  },
}
</script>

<!--      Todos los formatos estan hardcodeados, definir patrones y hacerlos de una a todos-->
<style scoped>
.border-btn {
  border-radius: 12px;
  border: 2px solid #142850;
}
</style>