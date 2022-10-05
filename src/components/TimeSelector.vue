<!-- Componente para el selector de tiempo -->
<!-- TODO: Setear los colores theme, estan puestos a mano -->
<template>
  <v-sheet class="sheet-style d-inline-flex pl-3 pr-1 " :width="componentWidth">
    <div class="my-1 div-style">
      <div class="div-style">
        <span class="text-style">{{ dataText }}</span>
        <v-icon class="float-right black--text" @click="add5Seconds" v-text="$vuetify.icons.values.keyboardArrowUp"/>
      </div>
      <div class="d-inline-flex div-style">
        <div class="d-inline-flex">
          <!-- El oninput sirve para que solo se puedan ingresar enteros no negativos -->
          <input class="text-style input-style" type="number"
                 oninput="this.value = (!!this.value && Math.abs(this.value) >= 0) ? Math.abs(this.value) : 0"
                 v-model="minutesSet">
          <h1 class="text-style">:</h1>
          <input class="text-style input-style" type="number"
                 oninput="this.value = (!!this.value && Math.abs(this.value) >= 0) ? Math.abs(this.value) : 0"
                 v-model="secondsSet">
        </div>
        <v-icon class="float-right black--text" @click="reduce5Seconds" v-text="$vuetify.icons.values.keyboardArrowDown"/>
      </div>
    </div>
  </v-sheet>
</template>

<script>

export default {
  name: "TimeSelector",
  // --------------------------------------------
  // Number componentWidth: Largo del componente (en px)
  // Number componentBorderRadius: Radio del borde del componente (en px)
  // String dataText: Significado del valor numerico
  // Number minutes: Minutos del tiempo inicial
  // Number seconds: Segundo del tiempo inicial
  // Number textSize: Tamaño del texto (en px)
  // --------------------------------------------
  props: {
    componentWidth: {
      type: Number,
      required: true
    },
    componentBorderRadius: {
      type: Number,
      required: true
    },
    dataText: {
      type: String,
      required: false
    },
    seconds: {
      type: Number,
      required: true
    },
    minutes: {
      type: Number,
      required: true
    },
    textSize: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      time: 0,
      minutesSet: this.minutes,
      secondsSet: this.seconds,
      textSizeCSS: this.textSize + 'px',
      componentBorderRadiusCSS: this.componentBorderRadius + 'px'
    }
  },
  beforeMount() {
    // Da formato a los inputs
    this.formatString()
  },
  // Modifica las variables de tiempo antes de actualizar el componente
  beforeUpdate() {
    // Verifica que los segundos y minutos no sean decimales (float)
    this.secondsSet = (this.secondsSet % 1 === 0) ? this.secondsSet : 0
    this.minutesSet = (this.minutesSet % 1 === 0) ? this.minutesSet : 0
    // Actualiza el tiempo (en segundos)
    this.time = parseInt(parseInt(this.minutesSet * 60) + parseInt(this.secondsSet))
    // Da formato a los inputs
    this.formatString()
  },
  methods: {
    // Agrega 5 segundos al tiempo total
    add5Seconds(){
      this.time = parseInt(this.time + 5)
      this.updateTime()
    },
    // Reduce 5 segundos al tiempo total
    reduce5Seconds(){
      this.time = parseInt((this.time - 5) > 0 ? this.time - 5 : 0)
      this.updateTime()
    },
    // Actualiza las variables de segundos y minutos correctamente
    updateTime(){
      this.secondsSet = parseInt((this.time % 60) > 0 ? (this.time % 60) : 0)
      this.minutesSet = parseInt((this.time / 60) > 0 ? (this.time / 60) : 0)
    },
    // Da formato a los input de segundos y minutos
    formatString(){
      this.secondsSet = (this.secondsSet < 10 && this.secondsSet.toString().length < 2) ? "0" + this.secondsSet : this.secondsSet
      this.minutesSet = (this.minutesSet < 10  && this.minutesSet.toString().length < 2) ? "0" + this.minutesSet : this.minutesSet
    }
  }
}
</script>

<style scoped>

.sheet-style {
  background-color: #DAE1E7;
  border-radius: v-bind(componentBorderRadiusCSS);
  border: 1px solid black;
}

.div-style {
  width: 100%;
}

.text-style {
  font-size: v-bind(textSizeCSS);
}

.input-style {
  outline: none;
  padding: 0;
  border-radius: 4px;
  background-color: white;
  text-align: center;
  width: 30%;
}

/* Remueve las flechitas del input de tipo number */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>