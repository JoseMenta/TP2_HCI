<template>
<div v-if="dataLoaded">
  <v-col>
    <v-row class="justify-space-between px-8 py-6">
      <h1>Vista detallada</h1>
<!--      <ViewSwitch :items="['Detalle','Lista']" :text-size="24" :border-radius="12" @viewChanged="changePresentation"/>-->
      <ChangeView :filters="['Detalle','Lista']" @sentSelect="changePresentation"></ChangeView>
    </v-row>
    <v-carousel v-model="index" hide-delimiters hide-delimiter-background :show-arrows="false" height="auto">
      <v-carousel-item>
        <h1 class="px-4">{{getName}}</h1>
        <v-container fluid>
          <v-row class="ma-0" >
            <v-col cols="7">
              <iframe :src="getImgSrc" class="image-style"></iframe>
            </v-col>
            <v-col cols="5">
              <ExerciseDetail :read-only="true" :textarea-value="getDescription" :title-size="0" :textarea-border-radius="12" :textarea-size="20"/>
            </v-col>
            <!--          <v-textarea solo outlined class="textarea-style pa-6" rows="8"  disabled :placeholder="exerciseDescription"></v-textarea>-->
          </v-row>
        </v-container>
        <v-container class="controls-style ">
        <v-col tile flat class="ma-0 align-content-center align-center">
            <v-row class="d-inline-block justify-space-between align-content-center">
<!--              <v-col >-->
<!--                <v-col v-show="this.cycles[this.cycleIndex].exercises[this.exerciseIndex].repetitions!==0">-->
                <IconTextCircle  :icon="'replay'" v-if="this.cycles[this.cycleIndex].exercises[this.exerciseIndex].repetitions!==0" :text="this.cycles[this.cycleIndex].exercises[this.exerciseIndex].repetitions.toString()"></IconTextCircle>
<!--              </v-col>-->
<!--              <v-col v-show="this.cycles[this.cycleIndex].exercises[this.exerciseIndex].duration!==0">-->
<!--              <IconTextCircleTimer :size="120" :minutes="this.cycles[this.cycleIndex].exercises[this.exerciseIndex].duration/60" :seconds="this.cycles[this.cycleIndex].exercises[this.exerciseIndex].duration%60" @timerFinished="nextExercise"></IconTextCircleTimer>-->
                <v-sheet v-if="this.cycles[this.cycleIndex].exercises[this.exerciseIndex].duration!==0" color="#27496D" class="rounded-circle d-inline-flex">
                  <v-progress-circular :size="120"
                                       color="#00909E"
                                       :value="value"
                                       rotate="270"
                                       :width="60"
                                       class="progress-circular-style">
                    <span class="time-object-style">{{getTime()}}</span>
                  </v-progress-circular>

                </v-sheet>
<!--              </v-col>-->
            </v-row>
            <v-row class="align-center mx-3 py-4">
              <ControlsRutine :prev="!(this.cycleIndex===0 && this.exerciseIndex===0 && this.cycleRep===this.cycles[this.cycleIndex].repetitions)" :play="this.cycles[this.cycleIndex].exercises[this.exerciseIndex].duration!==0" :next="next" @prev="previousExercise"
              @play="clickPlay"
              @next="nextExercise"
              :paused="paused"></ControlsRutine>
            </v-row>
        </v-col>
        </v-container>
      </v-carousel-item>
<!--      <v-carousel-item>-->
<!--        <v-slide-group>-->
<!--          <v-slide-item v-for="cycle in cycles" :key="cycle.name">-->
<!--            <v-card flat tile class="d-flex rounded-lg justify-space-between pt-2 mx-4 flex-column" color="lightBlue"-->
<!--            >-->
<!--              <v-row flat tile class="justify-space-around py-4 px-4">-->
<!--              <h2 class="px-4">{{cycle.name}}</h2>-->
<!--                <v-row class="align-content-center">-->
<!--                  <v-icon v-text="$vuetify.icons.values.replay"></v-icon>-->
<!--                  <h2>{{cycle.repetitions}}</h2>-->
<!--                </v-row>-->
<!--              </v-row>-->
<!--            <v-slide-group>-->
<!--              <v-slide-item v-for="exercise in exercises" :key="exercise.name" class="mx-4 my-4"-->
<!--              v-slot="{active,toggle}">-->
<!--                <v-card width="180"-->
<!--                        :class="active?'active-style':''"-->
<!--                @click="clickExercise()"-->
<!--                >-->
<!--                  <v-col>-->
<!--                    <v-row>-->
<!--                      <h2 class="text-truncate">{{exercise.name}}</h2>-->
<!--                    </v-row>-->
<!--                    <v-row>-->
<!--                      <v-img :src="require('@/assets/Burpee.jpg')" class="" :aspect-ratio="16/9" width="100" height="120">-->
<!--                      </v-img>-->
<!--                    </v-row>-->
<!--                    <v-row class="justify-space-around ">-->
<!--                      <v-card flat tile class="flex-row px-4 align-content-center" v-show="exercise.repetitions">-->
<!--                        <v-icon color="black" v-text="$vuetify.icons.values.replay"></v-icon>-->
<!--                        <h4>{{exercise.repetitions}}</h4>-->
<!--                      </v-card>-->
<!--                      <v-card flat tile class="flex-column px-4" v-show="exercise.time">-->
<!--                        <v-icon color="black" v-text="$vuetify.icons.values.timer"></v-icon>-->
<!--                        <h4>{{`${exercise.time/60>=1?exercise.time/60:'0'}:${exercise.time%60}`}}</h4>-->
<!--                      </v-card>-->
<!--                    </v-row>-->
<!--                  </v-col>-->
<!--                </v-card>-->
<!--              </v-slide-item>-->
<!--            </v-slide-group>-->
<!--            </v-card>-->
<!--          </v-slide-item>-->
<!--        </v-slide-group>-->
<!--      </v-carousel-item>-->
    </v-carousel>
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
import ChangeView from "@/components/ChangeView";
import ControlsRutine from "@/components/ControlsRutine";
import IconTextCircle from "@/components/IconTextCircle";
import ExerciseDetail from "@/components/ExerciseDetail";
import AlertPopUp from "@/components/AlertPopUp";

import {useRoutineCycles} from "@/store/RoutineCycles";
const routineCyclesStore = useRoutineCycles();

import {useRoutines} from "@/store/Routines";
const routinesStore = useRoutines();

import {useExercises} from "@/store/Exercises";
const exercisesStore = useExercises();

import {useExecutions} from "@/store/Executions";
const executionsStore = useExecutions();

import {NEW_ROUTINE_ID} from "@/api/routine";

export default {
  name: "MakeRoutine",
  components: { IconTextCircle,ChangeView, ControlsRutine, ExerciseDetail, AlertPopUp},
  data(){
    return{
      dataLoaded: false,
      index:0,
      prev:true,
      next:true,
      paused:false,
      value:100,
      interval:{},
      timeLeft:0,
      initialTime:0,
      cycleIndex:0,
      exerciseIndex:0,
      cycleRep:0,
      cycles: [],

      errorText: '',
      errorTitle: 'ERROR',
      errorDialog: false,
    }
  },
  methods:{
    changePresentation(index){
      this.index = index
    },
    previousExercise(){
      console.log(this.cycleRep)
      if(this.exerciseIndex===0){
        if(this.cycleRep===this.cycles[this.cycleIndex].repetitions) {
          //Si estamos en el principio del ciclo y quiero ir para atras, entonces tengo que ir al final del ciclo anterior
          //tengo que moverme al ciclo anterior
          if (this.cycleIndex === 0) {
            console.log('No puede seguir yendo para atras')
            return
          }
          this.cycleIndex--;
          this.exerciseIndex = this.cycles[this.cycleIndex].exercises.length - 1
          this.cycleRep=1
        }else{
          this.cycleRep++;
          this.exerciseIndex = this.cycles[this.cycleIndex].exercises.length -1;
        }
      }else{
        this.exerciseIndex--;
      }
      this.setTimer()
    },
    clickPlay(){
      if(this.paused){
        this.paused = false
        this.resumeTimer()
      }else{
        this.paused=true
        this.pauseTimer()
      }
    },
    async nextExercise(){
      console.log(this.cycleRep)
      if(this.exerciseIndex === this.cycles[this.cycleIndex].exercises.length-1){
        this.cycleRep--
        //si llegamos al final del ciclo
        if(this.cycleRep===0) {
          this.cycleIndex++;
          if (this.cycleIndex === this.cycles.length) {
            this.cycleIndex--;//para que se quede donde esta
            await executionsStore.saveExecution(this.routineId)//guardamos la ejecucion
            this.$router.push({
              name: 'reviewRoutine',
              query: {
                routineId: this.routineId
              }
            })

            return
          } else {
            this.cycleRep = this.cycles[this.cycleIndex].repetitions
            //si no es el ultimo ciclo
            this.exerciseIndex = 0
          }
        }else {
          //si hay que seguir en este ciclo
          this.exerciseIndex = 0
        }
      }else {
        this.exerciseIndex++;
      }
      this.setTimer()
    },
    pauseTimer(){
      clearTimeout(this.interval)
    },
    resumeTimer(){
      // setInterval permite ejecutar una funcion cada x milisegundos hasta destruirse
      this.interval = setInterval(() => {
        // Una vez que se termina el tiempo, destruyo el contador
        if (this.timeLeft <= 0) {
          this.nextExercise()
          clearTimeout(this.interval)
        }
        this.timeLeft -= 1;
        this.value = (this.timeLeft / this.initialTime) * 100
        this.$emit("secondPassed")
      }, 1000)
    },
    setTimer(){
      this.paused = false
      this.value = 100
      clearTimeout(this.interval)
      if(this.cycles[this.cycleIndex].exercises[this.exerciseIndex].duration!==0) {
        this.initialTime = this.cycles[this.cycleIndex].exercises[this.exerciseIndex].duration
        this.timeLeft = this.initialTime
        // setInterval permite ejecutar una funcion cada x milisegundos hasta destruirse
        this.interval = setInterval(() => {
          // Una vez que se termina el tiempo, destruyo el contador
          if (this.timeLeft <= 0) {
            this.nextExercise()
            clearTimeout(this.interval)
          }
          this.timeLeft -= 1;
          this.value = (this.timeLeft / this.initialTime) * 100
          this.$emit("secondPassed")
        }, 1000)
      }
    },
    getSecondsLeft(){
      return ((this.timeLeft % 60) > 0 ? parseInt(this.timeLeft % 60) : 0)
    },
    getMinutesLeft(){
      return ((this.timeLeft / 60) > 0 ? parseInt(this.timeLeft / 60) : 0)
    },
    // Funcion para dar formato al contador mm:ss
    getTime(){
      return this.getMinutesLeft().toString().padStart(2, '0') + ':' + this.getSecondsLeft().toString().padStart(2, '0')
    },
    changeView(nameView) {
      this.$router.push(nameView)
    },
    cancel(){
      this.changeView({name: 'createdRoutines'});
    }
  },
  computed: {
    getImgSrc(){
      const routineData = exercisesStore.getExerciseFromApi(this.cycles[this.cycleIndex].exercises[this.exerciseIndex].data.id)
      return (!routineData.metadata.url || !routineData.metadata) ? require('@/assets/placeholder.jpg') : routineData.metadata.url;
    },
    getDescription(){
      return exercisesStore.getExerciseFromApi(this.cycles[this.cycleIndex].exercises[this.exerciseIndex].data.id).detail
    },
    getName(){
      return exercisesStore.getExerciseFromApi(this.cycles[this.cycleIndex].exercises[this.exerciseIndex].data.id).name
    },

  },
  props:{
    routineId:{
      type:Number,
      required:true
    }
  },
  async created(){
    await routinesStore.fetchRoutines();
    if(this.routineId <= NEW_ROUTINE_ID || routinesStore.getRoutineById(this.routineId) === -1){
      this.errorText = 'No existe una rutina con el ID: ' + this.routineId
      this.errorDialog = true;
      return;
    }
    await routinesStore.getRoutineData(this.routineId);
    await exercisesStore.initialize()
    await executionsStore.startExecution()//seteamos el timer para la ejecucion
    this.cycles = routineCyclesStore.getCycles;
    this.cycleRep = this.cycles[this.cycleIndex].repetitions
    console.log('ciclos')
    console.log(this.cycles)
    this.dataLoaded = true;
    this.setTimer()
  },
}
</script>

<style scoped>
.image-style{
  height: 300px;
  crop: auto;
  border-radius: 20px;
  border: 2px solid black;
  aspect-ratio: 16/9;
}
.active-style{
  border: 4px solid var(--v-green-base);
}
.controls-style{
  margin-left: 36%;
}
.textarea-style{
  width: 40%;
}
/*TODO: mejorar esto, es feo el important pero algo de vue me lo esta pisando si no*/
.data-style{
  padding-left: 40% !important;
}

.div-loading-style {
  height: 100%;
}
.time-object-style{
  z-index: 0;
  font-size: 30px;
  color: white;
}
</style>