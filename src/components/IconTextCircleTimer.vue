<!-- Componente para un timer circular en formato mm:ss -->
<!-- REQUIERE DEFINIR LA VARIABLE SASS: '$progress-circular-underlay-stroke: none' -->
<!-- TODO: Setear los colores theme, estan puestos a mano -->
<template>
  <v-sheet color="#27496D" class="rounded-circle d-inline-flex">
    <v-progress-circular :size="size"
                         color="#00909E"
                         :value="value"
                         rotate="270"
                         :width="size/2"
                         class="progress-circular-style">
      <TimeObject class="text-style" :text-size="textSize" text-color="white" :seconds="getSecondsLeft()" :minutes="getMinutesLeft()"/>
    </v-progress-circular>

  </v-sheet>

</template>

<script>
import TimeObject from "@/components/TimeObject";

export default {
  name: "IconTextCircleTimer",
  components: {
    TimeObject
  },
  // --------------------------------------------
  // Number size: Tamaño del circulo (en px)
  // Number minutes: Minutos del contador
  // Number seconds: Segundo del contador
  // Number textSize: Tamaño del texto del contador (en px)
  // --------------------------------------------
  props: {
    size: {
      type: Number,
      required: true
    },
    minutes: {
      type: Number,
      required: true
    },
    seconds: {
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
      // interval almacena el objeto intervalo
      // value indica el valor del contador en porcentaje
      // timeLeft indica la cantidad de segundos que faltan para terminar
      interval: {},
      value: 100,
      timeLeft: 0,
      textSizeCSS: this.textSize + 'px'
    }
  },
  // Los intervalos se requieren destruir para que dejen de utilizar recursos (sino realiza el timeout infinitamente)
  beforeDestroy () {
    clearInterval(this.interval)
  },
  // mounted() permite ejecutar una funcion apenas se rendiriza el componente (en este caso, que comience el contador)
  mounted() {
    let initialTime = this.seconds + this.minutes * 60
    this.timeLeft = initialTime
    // setInterval permite ejecutar una funcion cada x milisegundos hasta destruirse
    this.interval = setInterval(() => {
      // Una vez que se termina el tiempo, destruyo el contador
      if(this.timeLeft <= 0){
        clearTimeout(this.interval)
      }
      this.timeLeft -= 1;
      this.value = (this.timeLeft / initialTime) * 100
      this.$emit("secondPassed")
    }, 1000)
  },
  methods: {
    getSecondsLeft(){
      return ((this.timeLeft % 60) > 0 ? parseInt(this.timeLeft % 60) : 0)
    },
    getMinutesLeft(){
      return ((this.timeLeft / 60) > 0 ? parseInt(this.timeLeft / 60) : 0)
    }
  }
}
</script>

<style scoped>

.text-style {
  z-index: 0;
}

</style>