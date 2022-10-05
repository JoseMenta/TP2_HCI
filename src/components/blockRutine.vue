<template>
  <v-card class="block-rutine" flat>
    <v-card height="80" class="d-flex justify-space-between ma-5" color="#E8F1F6" flat>
      <v-text-field
          hide-details
          label="Nombre de Bloque"
          placeholder="Nombre de Bloque"
          solo
          flat
          class="title_block mb-7 mt-5"
          background-color="#E8F1F6"
      ></v-text-field>
      <NumberSelector :component-width="190" :text-size="16" :component-border-radius="4" data-text="Repeticiones" :data-value="5" class="mt-5"/>
    </v-card>

    <div class="mt-1">
      <v-container>
        <v-row>
          <v-col v-for="i in excercise" :key="i" cols="6">
            <ExerciseCard :name="'Abdominales'" :id="1" description="Es un ejercicio dificil que no se logra completar si se come mucho antes de realizarlo pues desdulta masydasd" img="estiramiento.png"></ExerciseCard>
          </v-col>
          <v-col class="d-flex flex-column align-center justify-space-between"  cols="6">
            <newTask name="Agregar Ejercicio" icon="fitness_center" :height="50" class="margin-Task" :action="addExcercise"></newTask>
            <newTask name="Agregar Descanso" icon="history_toggle_off" :height="50"  :action="addExcercise"></newTask>
          </v-col>

        </v-row>
      </v-container>


    </div>

  </v-card>
</template>

<script>
import NumberSelector from "@/components/NumberSelector";
import ExerciseCard from "@/components/ExerciseCard";
import NewTask from "@/components/NewTask";

export default {
  name: "blockRutine",
  components: {NumberSelector, ExerciseCard, NewTask},
  data(){
    return{
      excercise: 2,
    }
  },
  methods: {
    addExcercise() {
      this.excercise = this.excercise+1;
      this.$emit('newExccercice')
    },
  }
}
</script>

<style scoped>

::v-deep .v-label {
  font-size: 30px
}

.title_block{
  font-size: 30px;
}

.margin-Task{
  margin-bottom: 30px;
}

.block-rutine{
  background-color: #E8F1F6;
  border: #79747E solid;
  border-radius: 20px !important;
}
</style>