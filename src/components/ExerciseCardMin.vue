<template>
  <v-card class="d-flex flex-row rounded justify-space-between" :width="width" flat>
    <v-card class="d-flex flex-column rounded justify-space-between pa-2" tile flat>
      <h3 v-show="name.length<20">{{ name }}</h3>
      <h3 v-show="name.length>=20">{{name.substring(0,20)+'..'}}</h3>
      <v-rating
          background-color="black"
          color="black"
          :empty-icon="$vuetify.icons.values.starEmpty"
          :full-icon="$vuetify.icons.values.starFull"
          length="5"
          :value="stars"
          readonly
      ></v-rating>
    </v-card>
    <v-card :height="img_height" :width="img_width" class="rounded-xl" flat tile>
       <v-img :src="img" :alt="alt" class="rounded-xl" :height="img_height" :width="img_width"></v-img>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "ExerciseCardMin",
  data(){
    return{
      width:400,
      img_width:200,
      img_height:100
    }
  },
  props:{
    id:{
      type:Number,
      required:true
    },
    img:{
      type:String,
      required:true
    },
    alt:{
      type:String,
      required:false,
      default() {
        return "";
      }
    },
    name:{
      type:String,
      required:true
    },
    stars:{
      type:Number,
      required:true
    }
  }
}
</script>

<style scoped>
h3{
  width: 200px;
}
</style>