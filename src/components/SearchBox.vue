<!-- Componente para el buscador de la navegacion persistente -->
<!-- TODO: Setear los colores theme, estan puestos a mano -->
<template>
  <v-sheet class="d-inline-flex"
           :width="searchBoxWidth">
    <v-text-field class="text-field-style"
                  :placeholder="this.placeholder"
                  background-color="#DAE1E7"
                  color="#1C1B1F"
                  solo flat hide-details single-line clearable>
      <v-icon slot="prepend-inner"
              class="mx-3"
              color="#1C1B1F"
              :size="iconSize"
              v-text="$vuetify.icons.values.search"
              @click="searchMethod"/>
    </v-text-field>
  </v-sheet>
</template>

<script>
export default {
  name: "SearchBox",
  // --------------------------------------------
  // String placeholder: Texto a mostrar como placeholder
  // Function searchMethod: Funcion que se debe ejecutar al clickear la lupa
  // Number searchBoxWidth: Largo del search box (en px)
  // Number iconSize: Tamaño del icono (en px)
  // Number btnBorderRadius: Radio del borde (en px)
  // Number textSize: Tamaño del texto (en px)
  // --------------------------------------------
  props: {
    placeholder: {
      type: String,
      required: true
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
      // Defino una variable para poder parametrizar el CSS
      textSizeCSS: this.textSize + 'px',
      btnBorderRadiusCSS: this.btnBorderRadius + 'px'
    }
  }
}
</script>

<style scoped>

/* Con v-bind puedo utilizar una variable para parametrizar el valor de un estilo */
.text-field-style {
  border-radius: v-bind(btnBorderRadiusCSS);
}

.v-text-field :deep(input) {
  font-size: v-bind(textSizeCSS);
  color: #7A7A7A;
  /* max-height:none permite sacar la restriccion que tiene por default los inputs */
  max-height: none;
}

.v-text-field:deep(input::placeholder) {
  color: #7A7A7A;
}

</style>