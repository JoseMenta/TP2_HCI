<!-- PopUp para elegir un ejercicio al crear una rutina -->
<template>
  <v-carousel hide-delimiters hide-delimiter-background :show-arrows="false" height="auto" v-model="step">
    <v-carousel-item>
      <v-card class="card-style">
        <v-app-bar class="topbar-style" color="white">
          <v-icon v-text="$vuetify.icons.values.clear"
                  color="#1C1B1F"
                  :size="50" @click="closeWindow"/>
          <SearchBox placeholder="Buscar ejercicios"
                     :search-method="search"
                     :search-box-width="445"
                     :icon-size="30"
                     :btn-border-radius="12"
                     :text-size="20" class="mx-auto"/>
        </v-app-bar>
        <v-container fluid>
          <v-row class="mt-5 mx-16">
            <v-col cols="12" class="d-inline-flex justify-space-around">
              <FilterMenu :id="0"
                          :options="['Propio', 'Otros', 'Indistinto']"
                          :width="180"
                          :placeholder="'Autor'"
                          :right-border-radius="4"
                          :left-border-radius="4"/>
              <FilterMenu :id="0"
                          :options="['Zona inferior', 'Zona media', 'Zona superior']"
                          :width="180"
                          :placeholder="'Zona'"
                          :right-border-radius="4"
                          :left-border-radius="4"/>
              <FilterMenu :id="0"
                          :options="['Sin equipamiento', 'Colchoneta', 'Mancuernas', 'Biciclete fija']"
                          :width="180"
                          :placeholder="'Equipamiento'"
                          :right-border-radius="4"
                          :left-border-radius="4"/>
              <FilterMenu :id="0"
                          :options="['Intensidad baja', 'Intensidad media', 'Intensidad alta']"
                          :width="180"
                          :placeholder="'Intensidad'"
                          :right-border-radius="4"
                          :left-border-radius="4"/>

            </v-col>
          </v-row>
          <v-row class="mt-10">
            <ExerciseCardList class="mx-10" @exerciseClicked="openExercise"/>
          </v-row>
        </v-container>
      </v-card>
    </v-carousel-item>
    <v-carousel-item>
      <SelectExerciseConfigPopUp @goBack="step--" @confirmExercise="exerciseSelected"/>
    </v-carousel-item>
  </v-carousel>

</template>

<script>
import SearchBox from "@/components/SearchBox";
import FilterMenu from "@/components/FilterMenu";
import ExerciseCardList from "@/components/ExerciseCardList";
import SelectExerciseConfigPopUp from "@/components/SelectExerciseConfigPopUp";
export default {
  name: "SelectExercisePopUp",
  components: {SelectExerciseConfigPopUp, ExerciseCardList, FilterMenu, SearchBox},
  data() {
    return {
      step: 0
    }
  },
  methods: {
    search(){
      alert("Searching...")
    },
    closeWindow() {
      this.step = 0
      // El padre debe cerrar el popUp
      this.$emit("closeWindow")
    },
    openExercise(id) {
      console.log(id)
      this.step++
    },
    exerciseSelected() {
      this.$emit("exerciseSelected")
    }
  }
}
</script>

<style scoped>

.topbar-style {
  position: marker;
  top: 0;
  z-index: 1;
}

.card-style {
  border-radius: 24px;
}

</style>