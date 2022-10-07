<!-- Componente para el popup de creacion de ejercicios -->
<template>
  <v-card class="card-style">
    <v-container class="container-style">
      <v-row justify="space-between" class="top-style">
        <v-col :cols="1">
          <v-icon v-text="$vuetify.icons.values.arrowBack"
                  color="#1C1B1F"
                  :size="50"
                  @click="back"/>
        </v-col>
        <v-col :cols="1" class="d-flex justify-center">
          <v-icon v-text="$vuetify.icons.values.done"
                  color="#1C1B1F"
                  :size="50"
                  @click="confirm"/>
        </v-col>
      </v-row>
      <v-row class="img-style">
        <v-col :cols="12">
          <v-img :src="require('@/assets/placeholder.jpg')" class="d-flex justify-center align-center">
            <v-icon v-text="$vuetify.icons.values.playCircle"
                    color="#1C1B1F"
                    :size="83"
                    class="play-button-style"
                    @click="play"/>
          </v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="12">
          <v-text-field id="title"
                        :hide-details="!titleIsEmpty"
                        :error="titleIsEmpty"
                        :error-messages="['El titulo del ejercicio es requerido.']"
                        @input="updateTitleIsEmpty"
                        placeholder="Ingrese el nombre del ejercicio"
                        solo
                        flat
                        v-model="routineName"
                        class="exercise-title-style"
                        :class="titleIsEmpty ? 'error-title-style' : ''"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-n5">
        <v-col :cols="12">
          <div class="d-inline author-style">
            <span>Autor: </span>
            <span>Raul Sarmiento</span>
          </div>
        </v-col>
      </v-row>
      <v-row class="selector-style">
        <v-container class="container-style">
          <v-row justify="space-between" class="details-style">
            <v-col :cols="4">
              <span>Equipamiento</span>
            </v-col>
            <v-col :cols="4">
              <span>Zona muscular</span>
            </v-col>
            <v-col :cols="4">
              <span>Intensidad</span>
            </v-col>
          </v-row>
          <v-row class="mt-n6">
            <v-col :cols="4">
              <!-- TODO: Definir equipamientos posibles para un ejercicio -->
              <FilterMenu :id="0" :left-border-radius="4" :right-border-radius="4" :width="195" :options="['Sin equipamiento', 'Colchoneta', 'Mancuernas', 'Biciclete fija']"/>
            </v-col>
            <v-col :cols="4">
              <FilterMenu :id="1" :left-border-radius="4" :right-border-radius="4" :width="195" :options="['Zona inferior', 'Zona media', 'Zona superior']"/>
            </v-col>
            <v-col :cols="4">
              <FilterMenu :id="2" :left-border-radius="4" :right-border-radius="4" :width="195" :options="['Baja', 'Media', 'Alta']"/>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
      <v-row>
        <v-col :cols="12">
          <ExerciseDetail :textarea-border-radius="12" :textarea-size="20" :title-size="30" :read-only="false" language="es"/>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import FilterMenu from "@/components/FilterMenu";
import ExerciseDetail from "@/components/ExerciseDetail";

export default {
  name: "CreateExercisePopUp",
  components: {
    FilterMenu,
    ExerciseDetail
  },
  data() {
    return {
      routineName: '',
      titleIsEmpty: false,

      // Datos requeridos para el scroll
      duration: 200,
      offset: 0,
      easing: 'easeInOutCubic',
    }
  },
  methods: {
    back(){
      alert('Go Back!')
    },
    confirm(){
      if(this.routineName === ''){
        this.updateTitleIsEmpty()
        this.$vuetify.goTo(this.target, this.options)
      } else {
        alert('Ejercicio guardado')
      }
    },
    updateTitleIsEmpty(){
      this.titleIsEmpty = (this.routineName === '')
    },
    play(){
      alert('Play!')
    }
  },
  computed: {
    target () {
      return '#title'
    },
    options () {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      }
    }
  }
}
</script>

<style scoped>

.row:not(.img-style,.top-style, .selector-style){
  margin-left: 20px;
}

.card-style {
  border-radius: 24px;
}

.container-style {
  max-width: none;
}

.img-style * {
  height: 25vh;
}

.img-style .col {
  padding: 0;
}

.play-button-style {
  display: flex;
  margin: auto;
}

.exercise-title-style:deep(input){
  font-size: 48px;
}

/* Permite modificar el estilo del input si esta siendo modificado (:focus) o no (:not(:focus)) */
.exercise-title-style:deep(input:focus) {
  color: black;
}

.exercise-title-style:deep(input:not(:focus)){
  color: #808080;
}

.author-style span, .details-style span {
  font-size: 30px;
  font-weight: bold;
}

.error-title-style:deep(div.v-messages__message) {
  font-size: 15px;
  line-height: 20px;
}

.error-title-style:deep(input) {
  border-radius: 12px;
  border: 1px solid red;
  padding-left: 10px;
}

</style>