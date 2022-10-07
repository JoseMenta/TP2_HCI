<!-- Componente para el visualizador del perfil en la navegacion persistente -->
<!-- TODO: Setear los colores theme, estan puestos a mano -->
<template>
  <v-btn class="d-inline-flex btn-style text-capitalize pa-0"
         width="auto" :height="btnHeight"
         @click="profileMethod">
    <v-row class="d-inline-flex py-2 px-1 row-style" align="center">
      <span class="font-weight-bold mr-3 text-style">{{userName}}</span>

      <v-img :src="userNameImg"
             contain :height="imgSize" :width="imgSize"
             class="image-style"/>
    </v-row>
  </v-btn>
</template>

<script>
export default {
  name: "ProfileButton",
  // --------------------------------------------
  // Function profileMethod: Funcion que se debe ejecutar al clickear el perfil
  // Number btnHeight: Altura del componente (en px)
  // String userName: Nombre del usuario
  // String userNameImg: URL de la imagen del perfil
  // Number imgSize: Dimensiones de la imagen (en px) [cuadrada]
  // Number btnBorderRadius: Radio del borde (en px)
  // Number imgBorderRadius: Radio de la imagen (en px)
  // Number textSize: Tamaño del texto (en px)
  // --------------------------------------------
  props: {
   profileMethod: {
      type: Function,
      required: true
    },
    btnHeight: {
      type: Number,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    userNameImg: {
      type: String,
      required: true
    },
    imgSize: {
      type: Number,
      required: true
    },
    btnBorderRadius: {
      type: Number,
      required: true
    },
    imgBorderRadius: {
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
      btnBorderRadiusCSS: this.btnBorderRadius + 'px',
      imgBorderRadiusCSS: this.imgBorderRadius + 'px'
    }
  }
}
</script>

<style scoped>
.row-style{
  align-items: center;
  justify-content: space-between;
}
/* Con v-bind puedo utilizar una variable para parametrizar el valor de un estilo */
.btn-style {
  letter-spacing: 0;
  border-radius: v-bind(btnBorderRadiusCSS);
  border: 1px solid black;
}

.text-style {
  font-size: v-bind(textSizeCSS);
}

.image-style {
  border-radius: v-bind(imgBorderRadiusCSS);
}

</style>