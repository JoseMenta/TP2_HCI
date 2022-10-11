<template>
  <v-card class="block-rutine" flat>
    <v-card height="80" class="d-flex justify-space-between ma-5" color="#E8F1F6" flat>
      <v-text-field
          :rules="[rules.required]"
          :error="required"
          @input="updateIsEmpty"
          placeholder="Nombre de Bloque"
          solo
          flat
          class="title_block mb-7 mt-5"
          background-color="#E8F1F6"
          v-model="title"
      ></v-text-field>
      <NumberSelector :component-width="190" :text-size="16" :component-border-radius="4" data-text="Repeticiones" :data-value="5" class="mt-5" :deactivate="false" :error="false"/>
    </v-card>

    <div class="mt-1">
      <v-container>
        <v-row>
          <v-col v-for="i in exercise" :key="'exercise_'+i" cols="6">
            <ExerciseCard :name="'Abdominales'" :id="i" :details="false" :editRemove="true"
                          @editTouched="editExercise(i)" @deleteTouched="exercise--"
                          description="Es un ejercicio dificil que no se logra completar si se come mucho antes de realizarlo pues desdulta masydasd" :img="require('@/assets/estiramiento.png')"></ExerciseCard>
          </v-col>
          <v-col v-for="i in rest" :key="'rest_'+i" cols="6">
            <ExerciseCard :id="i" :details="false" :edit-remove="true" :rest="true"
                          @editTouched="addRestDialog = true" @deleteTouched="rest--"/>
          </v-col>
          <v-col class="d-flex flex-column align-center justify-space-between"  cols="6">
            <v-dialog persistent v-model="selectExerciseDialog">
              <template v-slot:activator="{on, attrs}">
                <NewTask name="Agregar Ejercicio" icon="fitness_center" :height="50" class="margin-Task"
                         v-bind="attrs" v-on="on"
                         @click.native="selectExerciseDialog = true"/>
              </template>
              <SelectExercisePopUp :key="selectExercisePopUpKey"
                                   :edit-exercise="editExerciseId"
                                   @closeWindow="reRenderSelectExercise"
                                   @exerciseEdited="reRenderSelectExercise"
                                   @exerciseSelected="addExercise"/>
            </v-dialog>
            <v-dialog persistent v-model="addRestDialog">
              <template v-slot:activator="{on, attrs}">
                <NewTask name="Agregar Descanso" icon="history_toggle_off"
                         v-bind="attrs" v-on="on"
                         @click.native="addRestDialog = true"
                         :height="50"/>
              </template>
              <SelectExerciseConfigPopUp :key="addRestPopUpKey"
                                         :is-rest="true"
                                         @goBack="reRenderAddRest()"
                                         @confirmExercise="addRest"/>
            </v-dialog>

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
import SelectExerciseConfigPopUp from "@/components/SelectExerciseConfigPopUp";

export default {
  name: "blockRutine",
  components: {SelectExerciseConfigPopUp, SelectExercisePopUp, NumberSelector, ExerciseCard, NewTask},
  props:{
    id:{
      type: Number,
      required: true
    },
    required:{
      type: Boolean,
      required: true
    }
  },
  data(){
    return{
      exercise: 2,
      rest: 0,

      selectExercisePopUpKey: 0,
      selectExerciseDialog: false,
      addRestPopUpKey: 0,
      addRestDialog: false,
      editExerciseId: undefined,

      title: '',
      IsEmpty: false,
      rules: {
        required: value => !!value || "Necesita Ingresar un titulo de Bloque"
      },
    }
  },
  methods: {
    addExercise() {
      this.selectExerciseDialog = false
      this.exercise = this.exercise+1;
      this.$emit('newExercise')
      this.reRenderSelectExercise()
    },
    addRest(){
      this.selectExerciseDialog = false
      this.rest++
      this.$emit('newRest')
      this.reRenderAddRest()
    },
    reRenderSelectExercise() {
      this.selectExerciseDialog = false;
      this.editExerciseId = undefined
      this.selectExercisePopUpKey++;
    },
    updateIsEmpty() {
      this.IsEmpty = (this.title === '')
      this.$emit('input', !this.IsEmpty, this.title, this.id)
    },
    reRenderAddRest(){
      this.addRestDialog = false;
      this.addRestPopUpKey++;
    },
    editExercise(id) {
      this.editExerciseId = id.toString()
      this.selectExercisePopUpKey++;
      this.selectExerciseDialog = true
    }
  }
}
</script>

<style scoped>

:deep(.v-label) {
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