<template>
  <v-card class="d-inline-flex rounded flex-row" hover width="410" height="130" @click="touchCard">
    <v-card class="d-inline-flex rounded flex-column pa-1" flat tile width="250" >
      <v-card class="d-inline-flex rounded justify-space-between align-center" flat tile>
        <h2 v-show="name.length<16">{{name}}</h2>
        <h2 v-show="name.length>=16">{{name.substring(0,16)+ '..'}}</h2>
        <v-icon v-text="$vuetify.icons.values.edit" color="black" @click="touchEdit" class="action_icon"></v-icon>
        <v-icon v-text="$vuetify.icons.values.delete" color="black" @click="touchDelete" class="action_icon"></v-icon>
      </v-card>
      <p v-show="description.length<90">{{description}}</p>
      <p v-show="description.length>=90">{{description.substring(0,98)+'..'}}</p>
    </v-card >
    <v-img :src="img" :alt="alt" class="rounded" height="130" width="100"></v-img>
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
    description:{
      type:String,
      required:false,
      default(){return ''}
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
    }
  },
  methods:{
    touchEdit(){
      console.log(`edit touched in ExerciseCard ${this.id}`)
      this.$emit('editTouched',this.id)
    },
    touchDelete(){
      console.log(`delete touched in ExerciseCard ${this.id}`)
      this.$emit('deleteTouched',this.id)
    },
    touchCard(){
      console.log(`ExerciseCard ${this.id} touched`)
      this.$emit('cardTouched',this.id)
    }
  }
}
</script>

<style scoped>
.action_icon{
  padding-left: 4px;
  padding-right: 4px;
}
h2{
  width: 200px;
  display: inline;
}
p{
  width:250px;
  height:70px;
}
</style>