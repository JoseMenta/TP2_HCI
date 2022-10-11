<!-- Botones para las pantalla de iniciar sesion, registrarse y recuperar la cuenta y validar -->
<!-- TODO: Setear los colores theme, estan puestos a mano -->
<template>
  <!-- Al poner width=auto y height=auto, el tamaño del boton se ajustara al margen del contenido interno -->
  <v-btn class="text-capitalize btn-style"
         color="#00909E"
         ripple
         width="auto"
         height="auto"
         @click="action ? action : null"
        :disabled=status>
    <span class="white--text my-3 mx-16 text-style" v-if="!waiting">{{text}}</span>
    <span class="white--text my-3 mx-16 text-style" v-else><v-progress-circular indeterminate></v-progress-circular></span>
  </v-btn>
</template>

<script>
export default {
  name: "LoginButton",
  // --------------------------------------------
  // String text: Texto a mostrar
  // Number textSize: Tamaño del texto (en px)
  // Number borderRadius: Radio del borde (en px)
  // --------------------------------------------
  props:{
    text: {
      type: String,
      required: true
    },
    textSize: {
      type: Number,
      required: true
    },
    borderRadius: {
      type: Number,
      required: true
    },
    action: {
      type: Function,
      required: false
    },
    status: {
      type: Boolean,
      required: false,
      default: false
    },
    waiting:{
      type:Boolean,
      required:false,
      default: false
    }
  },
  data(){
    return {
      // Defino una variable para poder parametrizar el CSS
      textSizeCSS: this.textSize + 'px',
      borderRadiusCSS: this.borderRadius + 'px'
    }
  }
}
</script>

<style scoped>

.btn-style {
  border-radius: v-bind(borderRadiusCSS);
}

/* Con v-bind puedo utilizar una variable para parametrizar el valor de un estilo */
.text-style {
  font-size: v-bind(textSizeCSS);
}

</style>