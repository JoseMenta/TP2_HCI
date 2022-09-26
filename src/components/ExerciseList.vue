<template>
  <v-card class="ListRutine d-flex flex-column" hover width="188" height="238" @click="touchCard">
    <v-card class="text-center" flat  width="188" height="40">
      <h3 v-show="name.length<16">{{name}}</h3>
      <h3 v-show="name.length>=16">{{name.substring(0,16)+ '..'}}</h3>
    </v-card>
    <v-img :src="img" class="rounded" flat  height="155" width="188"></v-img>
    <v-card class="d-flex justify-center mb-6 pa-3"  flat width="188">
        <span class="d-flex"  v-if="replay !== 0">
          <h3>{{ replay }}</h3>
          <span class="material-icons" >replay</span>
        </span>
      <span class="d-flex" v-if="replay !== ''">
          <h3>{{ time }}</h3>
          <span class="material-icons">alarm</span>
        </span>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "ExerciseCard",
  props:{
    id:{
      type:Number,
      required:true
    },
    name:{
      type:String,
      required:true
    },
    img:{
      type:String,
      required:true
    },
    replay:{
      type:Number,
      required:false,
      default() { return 0;}
    },
    time:{
      type:String,
      required:false,
      default() { return '';}
    },
    data() {
      return{
        statusExc: 1,
      }
    }
  },
  methods:{
    touchCard(){
      this.statusExc = 2;
    }
  }
}
</script>

<style scoped>
.ListRutine{
  border-radius: 12px;
}
</style>