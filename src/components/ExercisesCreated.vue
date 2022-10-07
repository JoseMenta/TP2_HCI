<template>
  <div class="mx-7 mt-7">
    <h1 class="title-style my-5">Ejercicios Creados</h1>
    <v-sheet class="d-flex justify-space-between">
      <FilterMenu :id="1" v-bind:options="['Buenas','Tardes','Como','Estas']"  :width="150" @menuChanged="changeMenu" :left-border-radius="4" :right-border-radius="4"></FilterMenu>
      <FilterMenu :id="1" v-bind:options="['Buenas','Tardes','Como','Estas']"  :width="150" @menuChanged="changeMenu" :left-border-radius="4" :right-border-radius="4"></FilterMenu>
      <FilterMenu :id="1" v-bind:options="['Buenas','Tardes','Como','Estas']"  :width="150" @menuChanged="changeMenu" :left-border-radius="4" :right-border-radius="4"></FilterMenu>
    </v-sheet>
    <v-sheet>

    <div class="mt-12">
      <ExerciseCardList>
        <template v-slot:header>
          <v-col class="d-flex" cols="6">
            <v-card class="d-flex flex-column align-center justify-center new-routine-card-style" hover @click="alert()">
              <v-icon v-text="$vuetify.icons.values.add" color="#1C1B1F" :size="70"/>
              <span class="new-routine-text-style">Nuevo Ejercicio</span>
            </v-card>
          </v-col>
        </template>
      </ExerciseCardList>
    </div>
    </v-sheet>
  </div>
</template>

<script>
import FilterMenu from "@/components/FilterMenu";
import ExerciseCardList from "@/components/ExerciseCardList";

export default {
  name: "ExercisesCreated",
  components: {
    ExerciseCardList,
    FilterMenu
  },
}
</script>

<style scoped>

.title-style {
  font-size: 48px;
}

.new-routine-card-style{
  background-color: white;
  border: black solid 1px;
  border-radius: 20px;
  height: 130px;
  width: 100%;

}

</style>