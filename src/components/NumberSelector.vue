<!-- Componente para el selector de cantidad de repeticiones o series -->
<!-- TODO: Setear los colores theme, estan puestos a mano -->
<template>
  <v-sheet class="sheet-style d-inline-flex pl-3 pr-1 " :width="componentWidth" :class="styleFunction">
    <div v-if="!readOnly" class="my-1">
      <div class="d-flex">
        <span class="text-style">{{ dataText }}</span>
        <v-icon class="ml-auto black--text" @click="incrementValue" v-text="$vuetify.icons.values.keyboardArrowUp"/>
      </div>
      <div class="d-flex">
        <!-- El oninput sirve para que solo se puedan ingresar enteros no negativos -->
        <input class="pl-1 text-style input-style" type="number" :readonly="deactivate"
               oninput="this.value = (!!this.value && Math.abs(this.value) >= 0) ? Math.abs(this.value) : 0"
               v-model="numberValue">
        <v-icon class="ml-auto black--text" @click="decrementValue" v-text="$vuetify.icons.values.keyboardArrowDown"/>
      </div>
    </div>
    <div v-else class="my-1">
      <div>
        <span class="text-style read-only-style">{{ dataText }}</span>
      </div>
      <div>
        <span class="text-style read-only-style"> {{numberValue}} </span>
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
  // Boolean deactivate: Indica si es posible usarlo (false) o no (true)
  // Boolean error: Da estilo para error
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
    },
    deactivate: {
      type: Boolean,
      required: true
    },
    error: {
      type: Boolean,
      required: false,
      default(){return false}
    },
    minimum: {
      type: Number,
      required: false,
      default() {
        return 0;
      }
    },
    readOnly: {
      type: Boolean,
      required: false,
      default(){
        return false;
      }
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
      if(this.deactivate){
        return
      }
      this.numberValue += parseInt(1)
    },
    decrementValue(){
      if(this.deactivate) {
        return
      }
      this.numberValue = parseInt((this.numberValue - 1 < this.minimum) ? this.minimum : this.numberValue - 1)
    }
  },
  beforeUpdate() {
    this.numberValue = parseInt((this.numberValue % 1 === 0) ? this.numberValue : this.minimum)
  },
  updated() {
    this.$emit('valueChanged', this.numberValue)
  },
  computed: {
    styleFunction(){
      return ((this.deactivate) ? 'deactivate-style' : '') + ' ' + ((this.error) ? 'error-style' : '')
    }
  },
  watch: {
    numberValue: function (val) {
      if(val < this.minimum) {
        this.numberValue = this.minimum
      }
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

.deactivate-style {
  opacity: 0.3;
}

.error-style {
  border: 1px solid red;
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

.read-only-style{
  color: var(--v-darkBlue-base);
  font-weight: bold;
}


</style>