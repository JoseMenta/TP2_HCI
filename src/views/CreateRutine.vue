<template>
  <div v-if="dataLoaded" class="mx-7 mt-7">
    <v-sheet class="d-inline-flex justify-space-around mb-10" flat width="100%">
      <v-sheet class="d-flex flex-column" width="70%" flat>
        <v-text-field
            :rules="[rules.required]"
            :error="required"
            @input="updateIsEmpty"
            v-model="routineData.name"
            placeholder="Nombre de Rutina"
            solo
            flat
            class="title_rutine mb-2 pa-0 ml-0"
        ></v-text-field>
        <v-card class="d-inline-flex mb-5" flat tile>
          <h2 class="text-truncate mr-2">Categoría: </h2>
          <FilterMenu :id="0" @menuChanged="updateRoutineCategory"
                      :options="getCategoryNames" :initial-option="this.routineData.category.name"
                      :width="200"
                      :left-border-radius="4" :right-border-radius="4"/>
        </v-card>
        <v-card class="d-inline-flex mb-5" flat tile>
          <h2 class="text-truncate mr-2">Dificultad: </h2>
          <v-icon v-for="i in 5" :key="i" :color="setColorLevel(i)" @click="setLevel(i)">bolt</v-icon>
        </v-card>
        <div class="d-flex overflow-auto py-4 px-1">
          <v-card class="tag-style" flat>
            <v-dialog persistent v-model="addTagDialog" :key="tagKey">
              <template v-slot:activator="{ on, attrs }">
                <v-btn label class="tag rounded-lg mr-4" height="56"
                       v-bind="attrs" :color="$vuetify.theme.themes.light.grey"
                       v-on="on">+ Tag</v-btn>
              </template>
              <AddTagPopUp @closeWindow="closeTagPopUp" @addTag="newTag"/>
            </v-dialog>
          </v-card>
          <v-card v-for="(tag, index) in routineData.metadata.tags" :color="$vuetify.theme.themes.light.grey"
                  :key="index" height="56" class="mr-4 d-inline-flex align-center tag-style">
            <v-card-text class="text-h6 font-weight-bold black--text">{{tag}}</v-card-text>
            <v-btn icon class="tag-icon-style" color="white" @click="removeTag(index)">
              <v-icon v-text="$vuetify.icons.values.delete" :size="25" color="white"/>
            </v-btn>
          </v-card>
        </div>
      </v-sheet>
      <v-sheet width="30%" class="d-flex flex-column justify-end" flat>
        <v-img
            :src="routineData.detail"
            max-height="200"
            width="auto" @mouseover="imageHover = true" @mouseleave="imageHover = false"
            class="img_rutine elevation-5 d-flex justify-center align-center"
        >
          <v-icon v-text="$vuetify.icons.values.edit" :size="80" color="black"
                  class="d-flex mx-auto image-icon-style" :class="showImageEditIcon"
                  @click="changeImage"/>
        </v-img>
        <v-card class="d-inline-flex justify-center justify-space-between" flat>
          <v-btn class="text-capitalize btn-style"
                 color="#00909E"
                 ripple
                 width="45%"
                 height="auto"
                 @click="saveRoutine({name: 'createdRoutines'})">
            <v-icon small color="white">done</v-icon>
            <span class="white--text my-3 mx-3 text-style">Guardar</span>
          </v-btn>
          <v-dialog persistent width="50%" v-model="alertDialog">
            <template v-slot:activator="{on, attrs}">
              <v-btn class="text-capitalize btn-style"
                     color="#27496D"
                     ripple
                     width="45%"
                     height="auto"
                     v-on="on"
                     v-bind="attrs"
                     @click="alertDialog = true">
                <v-icon small color="white">delete</v-icon>
                <span class="white--text  my-3 mx-3 text-style">Descartar</span>
              </v-btn>
            </template>
            <AlertPopUp @closeWarning="alertDialog = false" @cancel="removeRutine({name: 'createdRoutines'})" :title="'¡Atención!'" :text="'¿Está seguro que desea descartar la rutina? Se perderán todos los cambios.'"/>
          </v-dialog>

        </v-card>
      </v-sheet>
    </v-sheet>
    <v-card v-if="dataLoaded" flat>
      <BlockRutine class="mb-5" v-for="i in getWarmUpAndExerciseCycles(this.routineData.cycles)" :key="i.id" @input="readTitle" :cycle-id="i.id" :required="required"/>
      <NewBlock class="mb-5" :action="addBlock"/>
      <BlockRutine class="mb-5" v-for="i in getCooldownCycles(this.routineData.cycles)" @input="readTitle" :key="i.id" :cycle-id="i.id" :required="required"/>
    </v-card>
  </div>
</template>

<script>
import BlockRutine from "@/components/blockRutine";
import NewBlock from "@/components/NewBlock";
import AddTagPopUp from "@/components/AddTagPopUp";
import AlertPopUp from "@/components/AlertPopUp";
import FilterMenu from "@/components/FilterMenu";

import {DIFICULTY_LEVELS, useRoutines} from "@/store/Routines";
const routinesStore = useRoutines();

import {useRoutineCycles} from "@/store/RoutineCycles";
const routineCyclesStore = useRoutineCycles();

import {useCategories} from "@/store/Categories";
const categoriesStore = useCategories();

import {useExercises} from "@/store/Exercises";
const exercisesStore = useExercises();

import {CycleTypes} from "@/api/cycles";

import {mapState} from "pinia";


export default {
  name: "CreateRutine",
  data(){
    return{
      routineId: -1,
      // routineData: {},
      // routineCycles: [],
      // level :0,
      // tags: 0,
      // tagsText: [],
      imageHover: false,
      addTagDialog: false,
      alertDialog: false,
      tagKey: 0,
      // routineName: '',
      isNameEmpty: true,
      required: false,
      blocks: [],
      rules: {
        required: value => !!value || "Es necesario un título de rutina"
      },
      dataLoaded: false
    }
  },
  components: {FilterMenu, AlertPopUp, AddTagPopUp, NewBlock, BlockRutine},
  methods: {
    addBlock() {
      routinesStore.addNewCycle();
    },
    setLevel(i){
      switch (i){
        case 1:
          this.routineData.difficulty = DIFICULTY_LEVELS.ROOKIE;
          return;
        case 2:
          this.routineData.difficulty = DIFICULTY_LEVELS.BEGINNER;
          return;
        case 3:
          this.routineData.difficulty = DIFICULTY_LEVELS.INTERMEDIATE;
          return;
        case 4:
          this.routineData.difficulty = DIFICULTY_LEVELS.ADVANCED;
          return;
        default:
          this.routineData.difficulty = DIFICULTY_LEVELS.EXPERT;
          return;
      }
    },
    setColorLevel(i){
      return i>this.routineData.difficulty.value ? "grey" : "black";
    },
    newTag(name){
      this.routineData.metadata.tags.push(name)
      this.closeTagPopUp()
    },
    removeTag(index){
      this.routineData.metadata.tags.splice(index, 1)
    },
    saveRoutine(nameView) {
      this.required = true;
      for(const index in this.blocks){
        if(!this.blocks[index].empty){
          return;
        }
      }
      if(this.isNameEmpty){
        return;
      }
      routinesStore.executeActions();
      this.$router.push(nameView);
    },
    removeRutine(nameView) {
      this.$router.push(nameView)
    },
    changeImage(){
      alert("Upload new image.")
    },
    closeTagPopUp(){
      this.tagKey++
      this.addTagDialog = false
    },
    readTitle(value, title, id){
      if(!this.blocks[id]){
        this.blocks[id] = {empty: value, name: title}
        return;
      }
      this.blocks[id].empty=value;
      this.blocks[id].name=title;
    },
    updateIsEmpty() {
      this.isNameEmpty = (this.routineData.name === '')
    },
    updateRoutineCategory(filterId, categoryName){
      this.routineData.category = categoriesStore.getCategoryByName(categoryName);
    },
    getWarmUpAndExerciseCycles(cycles){
      return cycles.filter((cycle) => cycle.type !== CycleTypes.COOLDOWN);
    },
    getCooldownCycles(cycles){
      return cycles.filter((cycle) => cycle.type === CycleTypes.COOLDOWN);
    }
  },
  computed: {
    ...mapState(useRoutines, {routineData: 'editingRoutine'}),
    showImageEditIcon(){
      return (this.imageHover) ? 'image-hover-style' : ''
    },
    ...mapState(useCategories, {getCategories: 'getCategories', categoriesLoaded: "categoriesLoaded"}),
    getCategoryNames(){
      console.log(this.getCategories)
      return this.getCategories.map((category) => category.name);
    }
  },
  async created(){
    this.routineId = this.$route.query.id;
    await categoriesStore.fetchCategories();
    if(parseInt(this.routineId) !== -1){
      await routinesStore.fetchRoutines();
      await routineCyclesStore.fetchRoutineCycles(this.routineId);
    } else {
      routinesStore.createNewRoutine();
    }
    await exercisesStore.fetchExercises();
    this.dataLoaded = true;
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

.tag-style {
  border-radius: 10px;
}

.tag-icon-style {
  position: absolute;
  background-color: var(--v-blue-base);
  top: -15px;
  right: -15px;
}

.img_rutine{
  margin-bottom: 15px;
  border-radius: 20px !important;
}
/* se como cambiarlo al importarnt */

.btn-style {
  border-radius: 12px;
}

.image-icon-style {
  visibility: hidden;
}

.image-hover-style {
  visibility: visible;
}

/* Con v-bind puedo utilizar una variable para parametrizar el valor de un estilo */
.text-style {
  font-size: v-bind(textSizeCSS);
}
</style>