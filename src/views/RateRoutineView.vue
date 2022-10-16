<template>
  <div v-if="dataLoaded">
    <v-col>
      <h1 class="text-center py-6">¡Felicitaciones, terminaste la rutina!</h1>
      <h2 class="text-center py-4">{{`Decinos que te parecieron los ejercicios de ${routine.name}`}}</h2>
      <v-row class="justify-space-around px-4 py-8">
        <v-img :src="routine.metadata.image" class="image-style" :aspect-ratio="16/9" max-width="50%" >
        </v-img>
        <v-col class="align-content-center">
          <v-row class="pt-12">
            <v-rating
                background-color="black"
                color="black"
                :empty-icon="$vuetify.icons.values.starEmpty"
                :full-icon="$vuetify.icons.values.starFull"
                length="5"
                v-model="score"
                class="text-center"
            ></v-rating>
          </v-row>
          <v-row class="py-4">
            <v-btn class="text-capitalize btn-style mx-4 my-4"
                   color="#00909E"
                   ripple
                   width="40%"
                   height="25%"
                   @click="saveReview">
              <v-icon small color="white">done</v-icon>
              <span class="white--text my-3 mx-3 text-style text-center">Guardar</span>
            </v-btn>
            <v-btn class="text-capitalize btn-style my-4 mx-4"
                   color="#27496D"
                   ripple
                   width="40%"
                   height="25%"
                   @click="goToMain">
              <v-icon small color="white">do_not_disturb_on</v-icon>
              <span class="white--text my-3 mx-3 text-style text-truncate">Ahora no</span>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </div>
  <div v-else class="d-flex align-center justify-center div-loading-style mt-10">
    <v-dialog width="50%" persistent v-model="errorDialog">
      <AlertPopUp :title="errorTitle" :text="errorText">
        <template v-slot:actions>
          <v-btn :color="$vuetify.theme.themes.light.green" @click="cancel">
            <span class="white--text">Cerrar</span>
          </v-btn>
        </template>
      </AlertPopUp>
    </v-dialog>
    <v-progress-circular size="200" indeterminate :width="20" :color="$vuetify.theme.themes.light.blue"/>
  </div>
</template>

<script>
import AlertPopUp from "@/components/AlertPopUp";

import {useRoutines} from "@/store/Routines";
const routinesStore = useRoutines()

import {ReviewApi} from "@/api/reviews";
import {NEW_ROUTINE_ID} from "@/api/routine";

export default {
  name: "RateRoutineView",
  components: {
    AlertPopUp
  },
  data(){
    return{
      routine:{},
      score:0,
      errorText: '',
      errorTitle: 'ERROR',
      errorDialog: false,
      dataLoaded: false
    }
  },
  methods:{
    async saveReview(){
      console.log(this.score)
      await ReviewApi.addReview(this.routineId,{
        score:this.score,
        review:''
      })
      this.goToMain()
    },
    goToMain(){
      this.$router.push({name:'default'})
    },
    changeView(nameView) {
      this.$router.push(nameView)
    },
    cancel(){
      this.changeView({name: 'createdRoutines'});
    }
  },
  props:{
    routineId:{
      type:Number,
      required:true
    }
  },
  async created() {
    await routinesStore.fetchRoutines();
    if(this.routineId <= NEW_ROUTINE_ID || routinesStore.getRoutineById(this.routineId) === -1){
      this.errorText = 'No existe una rutina con el ID: ' + this.routineId
      this.errorDialog = true;
      return;
    }
    this.routine = await routinesStore.getRoutineById(this.routineId);
    this.dataLoaded = true;
    console.log(this.routine)
  }
}
</script>

<style scoped>
.image-style{
  width: 50px;
}
.row-style{
  height: 100%;
}

.div-loading-style {
  height: 100%;
}
</style>