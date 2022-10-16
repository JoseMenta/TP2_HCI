<template>
  <div v-if="dataLoaded" class="mx-7 mt-7">
    <v-sheet class="d-inline-flex justify-space-around mb-10" flat width="100%">
      <v-sheet class="d-flex flex-column" width="70%" flat>
        <h1>{{routineData.name}}</h1>
        <v-sheet class="d-inline-flex my-5" flat tile>
          <h2 class="text-truncate mr-2">Categoría: </h2>
          <span class="category-style align-self-end">{{routineData.category.name}}</span>
        </v-sheet>
        <v-card class="d-inline-flex mb-5" flat tile>
          <h2 class="text-truncate mr-1">Valoración: </h2>
          <v-rating
              background-color="black"
              color="black"
              :empty-icon="$vuetify.icons.values.starEmpty"
              :full-icon="$vuetify.icons.values.starFull"
              length="5"
              :value="routineData.score"
              readonly
          ></v-rating>
<!--          Esto no deberia estar aca-->
          <h2> ( {{routineData.metadata.votes}} )</h2>
        </v-card>
<!--        TODO: cambiar esto por lo del store-->
        <v-card class="d-inline-flex mb-5" flat tile>
          <h2 class="text-truncate mr-1">Dificultad: </h2>
          <v-icon v-for="i in 5" :key="i" :color="setColorLevel(i)" size="30" >bolt</v-icon>
        </v-card>
        <v-card class="d-inline-flex" flat>
          <InfoTag v-for="tag in routineData.metadata.tags" :key="tag" :content="tag"/>
        </v-card>
      </v-sheet>
      <v-sheet width="30%" class="d-flex flex-column justify-end" flat>
        <v-img
            :src="routineData.metadata.image"
            max-height="200"
            width="auto"
            class="img_rutine elevation-5"
        ></v-img>
        <v-card class="d-inline-flex justify-center justify-space-between" flat>
          <v-btn class="text-capitalize btn-style justify-start"
                 color="#00909E"
                 ripple
                 width="100%"
                 height="auto"
                 @click="changeView({name: 'makeRoutine',query:{routineId:routineId}})">
            <v-icon medium color="white">play_arrow</v-icon>
            <span class="white--text my-3 mx-3 text-style">Empezar</span>
          </v-btn>
        </v-card>
      </v-sheet>
    </v-sheet>
    <v-card flat  >
      <BlockStaticRutine class="mb-5" v-for="cycle in routineCycles" :key="cycle.id" :cycle-id="cycle.id" />
    </v-card>
  </div>
  <div v-else class="d-flex align-center justify-center div-loading-style">
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
import BlockStaticRutine from "@/components/BlockStaticRutine";
import InfoTag from "@/components/InfoTag";
import AlertPopUp from "@/components/AlertPopUp";

import {useRoutines} from "@/store/Routines";
const routinesStore = useRoutines();

import {useRoutineCycles} from "@/store/RoutineCycles";
const routineCyclesStore = useRoutineCycles();

import {useExercises} from "@/store/Exercises";
const exercisesStore = useExercises();

import {useCategories} from "@/store/Categories";
const categoriesStore = useCategories();

import {NEW_ROUTINE_ID} from "@/api/routine";
import {mapState} from "pinia";

export default {
  name: "routineDetails",
  components: {InfoTag, BlockStaticRutine, AlertPopUp},
  data(){
    return{
      routineId: NEW_ROUTINE_ID,

      errorText: '',
      errorTitle: 'ERROR',
      errorDialog: false,
      dataLoaded: false
    }
  },
  computed:{
    ...mapState(useRoutines, {routineData: 'editingRoutine'}),
    routineCycles(){
      return routineCyclesStore.getCycles
    }
  },
  methods: {
    setColorLevel(i){
      return i>this.routineData.difficulty.value ? "grey" : "black";
    },
    changeView(nameView) {
      this.$router.push(nameView)
    },
    cancel(){
      this.changeView({name: 'createdRoutines'});
    },
  },
  async created(){
    this.routineId = this.$route.query.id;
    if(parseInt(this.routineId) > NEW_ROUTINE_ID){
      await routinesStore.fetchRoutines();
      await categoriesStore.fetchCategories();
      await exercisesStore.fetchExercises();
      // Verifica que exista una rutina con dicho nombre
      if(routinesStore.getRoutineById(this.routineId) === -1){
        this.errorText = 'No existe una rutina con el ID: ' + this.routineId
        this.errorDialog = true;
      } else {
        await routinesStore.editRoutine(this.routineId);
      }
    } else {
      this.errorText = 'No existe una rutina con el ID: ' + this.routineId
      this.errorDialog = true;
    }
    this.dataLoaded = (!this.errorDialog);
  }
}
</script>

<style scoped>

.custom-text-field.v-text-field.v-text-field--enclosed .v-input__slot {
  padding: 0;
}

:deep(.v-label) {
  font-size: 30px
}

.title_rutine{
  font-size: 30px;
}

.img_rutine{
  margin-bottom: 15px;
  border-radius: 20px !important;
}
/* se como cambiarlo al importarnt */

.btn-style {
  border-radius: 12px;
}

.tag-input{
  margin-right: 10px;
}

/* Con v-bind puedo utilizar una variable para parametrizar el valor de un estilo */
.text-style {
  font-size: v-bind(textSizeCSS);
}

.category-style {
  color: black;
  border-radius: 4px;
  border: 2px solid var(--v-darkBlue-base);
  padding: 3px 10px 3px 5px;
}

.div-loading-style {
  height: 100%;
}
</style>

