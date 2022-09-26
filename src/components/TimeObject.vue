<!-- Objeto que permite mostrar un temporizador con formato mm:ss -->
<!-- TODO: Setear los colores theme, estan puestos a mano -->
<template>
  <span class="time-object-style ma-0">{{getTime()}}</span>
</template>

<script>
export default {
  name: "TimeObject",
  // --------------------------------------------
  // Number minutes: Minutos del tiempo
  // Number seconds: Segundo del tiempo
  // Number textColor: Color del texto del contador
  // Number textSize: Tamaño del texto del contador (en px)
  // --------------------------------------------
  props: {
    minutes: {
      type: Number,
      required: true
    },
    seconds: {
      type: Number,
      required: true
    },
    textColor: {
      type: String,
      required: true
    },
    textSize: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      textColorCSS: this.textColor,
      textSizeCSS: this.textSize + 'px'
    }
  },
  methods: {
    // Funcion para dar formato al contador mm:ss
    getTime(){
      return this.minutes.toString().padStart(2, '0') + ':' + this.seconds.toString().padStart(2, '0')
    }
  }
}
</script>

<style scoped>

.time-object-style {
  color: v-bind(textColorCSS);
  font-size: v-bind(textSizeCSS);
}

</style>