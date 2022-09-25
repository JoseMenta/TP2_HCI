<template>
  <div class="text-center">
  <v-menu offset-y>
    <template v-slot:activator="{on,attrs}">
      <v-btn
      color="white"
      v-bind="attrs"
      v-on="on"
      @click="changeMenu"
      >{{title}}
        <v-icon v-text="icon"></v-icon>
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
      icon:this.$vuetify.icons.values.down
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
    }
  },
  methods:{
    clickOption(index){
      this.optionIndex = index
      this.$emit('menuChanged',this.id,this.options[this.optionIndex])
      this.icon = this.$vuetify.icons.values.down
    },
    changeMenu(){
      if(this.icon === this.$vuetify.icons.values.up){
        this.icon = this.$vuetify.icons.values.down
        return
      }
      this.icon = this.$vuetify.icons.values.up

    },
  },
  computed:{
    title(){
      return this.options[this.optionIndex]
    }
  }
}
</script>

<style scoped>
.menu_class{
}
</style>