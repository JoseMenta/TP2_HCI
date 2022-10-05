<template>
  <v-card class="d-inline-flex rounded flex-row main_card" outlined hover width="auto" @click="touchCard">
    <v-card class="d-inline-flex rounded flex-column pa-1" flat tile width="60%" >
      <v-card class="d-inline-flex rounded justify-space-between align-center" flat tile>
        <h2 class="text-truncate" >{{name}}</h2>
        <v-icon v-text="$vuetify.icons.values.edit" color="black" @click="touchEdit" class="action_icon"></v-icon>
        <v-icon v-text="$vuetify.icons.values.delete" color="black" @click="touchDelete" class="action_icon"></v-icon>
      </v-card>
      <p v-show="description.length<90">{{description}}</p>
      <p v-show="description.length>=90">{{description.substring(0,98)+'..'}}</p>
    </v-card >
    <v-img :src="img" :alt="alt" class="rounded exercise_img" height="130"  width="30%"></v-img>
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
  display: inline-block;
  width:250px;
  height:70px;
}
.exercise_img{
  border-left: var(--v-black-base) 2px solid;
}
/*.main_card{*/
/*  border: var(--v-black-base) 2px solid;*/
/*}*/
</style>