<!-- Componente para el buscador de la navegacion persistente -->
<!-- TODO: Setear los colores theme, estan puestos a mano -->
<template>
  <v-sheet class="d-inline-flex"
           :width="searchBoxWidth">
    <v-text-field class="text-field-style"
                  :placeholder="getPlaceholderText"
                  background-color="#DAE1E7"
                  color="#1C1B1F"
                  solo flat hide-details single-line clearable>
      <v-icon slot="prepend-inner"
              class="mx-3"
              color="#1C1B1F"
              :size="iconSize"
              @click="searchMethod">mdi-magnify</v-icon>
    </v-text-field>
  </v-sheet>
</template>

<script>
export default {
  name: "SearchBox",
  // --------------------------------------------
  // String language: Indica el lenguaje en que se debe mostrar el contenido estatico (Valores aceptados: 'es' y 'en')
  // Function searchMethod: Funcion que se debe ejecutar al clickear la lupa
  // Number searchBoxWidth: Largo del search box (en px)
  // Number iconSize: Tamaño del icono (en px)
  // Number btnBorderRadius: Radio del borde (en px)
  // Number textSize: Tamaño del texto (en px)
  // --------------------------------------------
  props: {
    language: {
      type: String,
      required: true,
      validator(value) {
        return ['es', 'en'].includes(value)
      }
    },
    searchMethod: {
      type: Function,
      required: true
    },
    searchBoxWidth: {
      type: Number,
      required: true
    },
    iconSize: {
      type: Number,
      required: true
    },
    btnBorderRadius: {
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
      placeholder: [
        {text: 'Buscar rutinas', lang: 'es'}, {text: 'Search routines', lang: 'en'}
      ],
      // Defino una variable para poder parametrizar el CSS
      textSizeCSS: this.textSize + 'px',
      btnBorderRadiusCSS: this.btnBorderRadius + 'px'
    }
  },
  computed: {
    getPlaceholderText() {
      return this.placeholder[this.placeholder.map(e => e.lang).indexOf(this.language)].text;
    }
  }
}
</script>

<style scoped>

/* Con v-bind puedo utilizar una variable para parametrizar el valor de un estilo */
.text-field-style {
  border-radius: v-bind(btnBorderRadiusCSS);
}

.v-text-field ::v-deep(input) {
  font-size: v-bind(textSizeCSS);
  color: #7A7A7A;
  /* max-height:none permite sacar la restriccion que tiene por default los inputs */
  max-height: none;
}

.v-text-field ::v-deep(input::placeholder) {
  color: #7A7A7A;
}

</style>