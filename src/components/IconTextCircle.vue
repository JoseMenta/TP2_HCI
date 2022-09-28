<!-- Componente estatico para una vista circular con icono y texto -->
<!-- TODO: Setear los colores theme, estan puestos a mano -->
<template>
  <!-- El tamaño de la vista, el icono y el texto a utilizar, al igual que sus tamaños estan parametrizados -->
  <v-sheet class="rounded-circle d-inline-flex justify-center align-center space-between-elements"
           color="#27496D"
           :height="size"
           :width="size">
    <v-icon v-text="icon"
            :size="iconSize"
            class="white--text mx-1"/>
    <span class="text-class white--text mx-1" > {{text}} </span>
  </v-sheet>
</template>

<script>
export default {
  name: "IconTextCircle",
  // --------------------------------------------
  // Number size: Diametro del circulo (en px)
  // String icon: Icono a utilizar (mdi-...)
  // Number iconSize: Tamaño del icono (en px)
  // String text: Texto a mostrar
  // Number textSize: Tamaño del texto (en px)
  // --------------------------------------------
  props: {
    size: {
      type: Number,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    iconSize: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    textSize: {
      type: Number,
      required: true
    }
  },
  data(){
    // Defino una variable para poder parametrizar el CSS
    return {
      textSizeCSS: this.textSize + 'px'
    }
  }
}
</script>

<style scoped>

/* Con v-bind puedo utilizar una variable para parametrizar el valor de un estilo */
.text-class {
  font-size: v-bind(textSizeCSS);
}

.space-between-elements {
  margin: 2px;
}


</style>