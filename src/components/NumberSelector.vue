<!-- Componente para el selector de cantidad de repeticiones o series -->
<!-- TODO: Setear los colores theme, estan puestos a mano -->
<template>
  <v-sheet class="sheet-style d-inline-flex pl-3 pr-1 " :width="componentWidth">
    <div class="my-1">
      <div class="d-flex">
        <span class="text-style">{{ dataText }}</span>
        <v-icon v-text="$vuetify.icons.values.keyboardArrowUp"
                class="ml-auto black--text"
                @click="incrementValue"/>
      </div>
      <div class="d-flex">
        <!-- El oninput sirve para que solo se puedan ingresar enteros no negativos -->
        <input class="pl-1 text-style input-style" type="number"
               oninput="this.value = (!!this.value && Math.abs(this.value) >= 0) ? Math.abs(this.value) : null"
               v-model="numberValue">
        <v-icon v-text="$vuetify.icons.values.keyboardArrowDown"
                class="ml-auto black--text"
                @click="decrementValue"/>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "NumberSelector",
  // --------------------------------------------
  // Number componentWidth: Largo del componente (en px)
  // Number componentBorderRadius: Radio del borde del componente (en px)
  // String dataText: Significado del valor numerico
  // Number data: Valor numerico inicial
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
    dataValue: {
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
      numberValue: this.dataValue,
      // Defino una variable para poder parametrizar el CSS
      textSizeCSS: this.textSize + 'px',
      componentBorderRadiusCSS: this.componentBorderRadius + 'px'
    }
  },
  methods: {
    // Logica para los botones del componente
    incrementValue(){
      this.numberValue += 1
    },
    decrementValue(){
      this.numberValue = (this.numberValue - 1 < 0) ? 0 : this.numberValue - 1
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

.text-style {
  font-size: v-bind(textSizeCSS);
}

.input-style {
  outline: none;
  border-radius: 4px;
  background-color: white;
  width: 100%;
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