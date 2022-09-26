<!--      Todos los formatos estan puestos con numeros, definir patrones y hacerlos de un nivel superior-->
<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{on,attrs}">
        <v-btn
            v-bind="attrs"
            v-on="on"
            :width=width
            class="dropdownFilters elevation-3"
            @click="changeMenu"
        >
          <span class="material-icons">
          public
          </span>
          <span>{{title}}</span>
          <v-icon color='#27496D'>{{icon}}</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
            v-for="(option,index) in options"
            :key="index"
            @click="clickOption(index)"
        > <v-list-item-title>{{option}}</v-list-item-title></v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "FIlterMenu",
  data(){
    return{
      optionIndex:0,
      icon:"arrow_drop_down"
    }
  },
  props:{
    id:{
      type:Number,
      required:true
    },
    options:{
      type:Array[String],
      required:true,
    },
    abrev:{
      type:Array[String],
      required:true,
    },
    width:{
      type:Number,
      require:true
    },
  },
  methods:{
    clickOption(index){
      this.optionIndex = index
      this.$emit('menuChanged',this.id,this.options[this.optionIndex])
      this.icon = "arrow_drop_down"
    },
    changeMenu(){
      if(this.icon === "arrow_drop_up"){
        this.icon ="arrow_drop_down"
        return
      }
      this.icon = "arrow_drop_up"

    },
  },
  computed:{
    title(){
      return this.abrev[this.optionIndex]
    }
  }
}
</script>

<!--      Todos los formatos estan hardcodeados, definir patrones y hacerlos de una a todos-->
<style scoped>
.dropdownFilters{
  border-radius: 4px;
  border: 2px solid #142850;
  background: white;
}
</style>