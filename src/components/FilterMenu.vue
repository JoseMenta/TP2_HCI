<template>
  <div class="text-center d-inline-flex">
    <v-menu offset-y class="text-truncate">
      <template v-slot:activator="{on,attrs}">
        <v-sheet class="d-flex flex-column">
          <v-btn
              v-bind="attrs"
              v-on="on"
              :width="width"
              class="dropdownFilters justify-space-between d-inline-block elevation-3 pl-2 pr-1 py-1"
              @click="changeMenu">
            <span class="text-style mr-4 text-truncate">{{title}}</span>
            <v-icon color='#27496D'>{{icon}}</v-icon>
          </v-btn>
          <p v-show="condition" class="red--text">{{errorText}}</p>
        </v-sheet>
      </template>
      <v-list>
        <v-list-item  class="included"
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
  name: "FilterMenu",
  data(){
    return{
      optionIndex: -1,
      icon:"arrow_drop_down",
      leftBorderRadiusCSS: this.leftBorderRadius + 'px',
      rightBorderRadiusCSS: this.rightBorderRadius + 'px'
    }
  },
  props:{
    errorText:{
      type: String,
      required: false
    },
    condition:{
      type: Boolean,
      required: false
    },
    id:{
      type:Number,
      required:true
    },
    options:{
      type:Array[String],
      required:true,
    },
    width:{
      type: Number,
      required: true
    },
    placeholder:{
      type: String,
      required: false
    },
    rightBorderRadius: {
      type: Number,
      required: true
    },
    leftBorderRadius: {
      type: Number,
      required: true
    }
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

    }
  },
  created() {
    if(this.placeholder === undefined){
      this.optionIndex = 0
    }
  },
  computed:{
    title(){
      if(this.optionIndex === -1){
        return this.placeholder
      }
      let str = this.options[this.optionIndex]
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  }
}
</script>

<!--      Todos los formatos estan hardcodeados, definir patrones y hacerlos de una a todos-->
<style scoped>
.dropdownFilters{
  border-radius: v-bind(leftBorderRadiusCSS) v-bind(rightBorderRadiusCSS) v-bind(rightBorderRadiusCSS) v-bind(leftBorderRadiusCSS);
  border: 2px solid #142850;
  background: white;
}

.text-style{
  font-size: 12px;
  letter-spacing: 0;
  text-transform: none;
}

</style>