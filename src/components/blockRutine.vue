<template>
  <v-card class="block-rutine" flat>
    <v-card height="80" class="d-flex justify-space-between ma-5" color="#E8F1F6" flat>
      <v-text-field
          hide-details
          placeholder="Nombre de Bloque"
          solo
          flat
          class="title_block mb-7 mt-5"
          background-color="#E8F1F6"
      ></v-text-field>
      <NumberSelector :component-width="190" :text-size="16" :component-border-radius="4" data-text="Repeticiones" :data-value="5" class="mt-5" :deactivate="false" :error="false"/>
    </v-card>

    <div class="mt-1">
      <v-container>
        <v-row>
          <v-col v-for="i in exercise" :key="i" cols="6">
            <ExerciseCard :name="'Abdominales'" :id="1" :details="false" :editRemove="true" description="Es un ejercicio dificil que no se logra completar si se come mucho antes de realizarlo pues desdulta masydasd" :img="require('@/assets/estiramiento.png')"></ExerciseCard>
          </v-col>
          <v-col class="d-flex flex-column align-center justify-space-between"  cols="6">
            <v-dialog persistent v-model="selectExerciseDialog">
              <template v-slot:activator="{on, attrs}">
                <NewTask name="Agregar Ejercicio" icon="fitness_center" :height="50" class="margin-Task"
                         v-bind="attrs" v-on="on"
                         @click.native="selectExerciseDialog = true"/>
              </template>
              <SelectExercisePopUp :key="popUpKey" @closeWindow="reRenderPopUp" @exerciseSelected="addExercise"/>
            </v-dialog>
            <newTask name="Agregar Descanso" icon="history_toggle_off" :height="50"/>
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
import SelectExercisePopUp from "@/components/SelectExercisePopUp";

export default {
  name: "blockRutine",
  components: {SelectExercisePopUp, NumberSelector, ExerciseCard, NewTask},
  prop:{
    status: {
      type: Boolean,
      required: true
    }
  },
  data(){
    return{
      exercise: 2,
      popUpKey: 0,
      selectExerciseDialog: false,
    }
  },
  methods: {
    addExercise() {
      this.selectExerciseDialog = false
      this.exercise = this.exercise+1;
      this.$emit('newExercise')
      this.reRenderPopUp()
    },
    reRenderPopUp() {
      this.selectExerciseDialog = false;
      this.popUpKey++;
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