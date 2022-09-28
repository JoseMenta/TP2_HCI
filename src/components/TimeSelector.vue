<!-- Componente para el selector de tiempo -->
<!-- TODO: Setear los colores theme, estan puestos a mano -->
<template>
  <v-sheet class="sheet-style d-inline-flex pl-3 pr-1 " :width="componentWidth">
    <div class="my-1 div-style">
      <div class="div-style">
        <span class="text-style">{{ dataText }}</span>
        <v-icon class="float-right black--text" @click="add5Seconds">mdi-menu-up</v-icon>
      </div>
      <div class="div-style">
        <TimeObject :text-size="textSize" text-color="black" :seconds="getSeconds()" :minutes="getMinutes()"/>
        <v-icon class="float-right black--text" @click="reduce5Seconds">mdi-menu-down</v-icon>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import TimeObject from "@/components/TimeObject";

export default {
  name: "TimeSelector",
  components: {
    TimeObject
  },
  // --------------------------------------------
  // Number componentWidth: Largo del componente (en px)
  // Number componentBorderRadius: Radio del borde del componente (en px)
  // String dataText: Significado del valor numerico
  // Number minutes: Minutos del tiempo
  // Number seconds: Segundo del tiempo
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
      textSizeCSS: this.textSize + 'px',
      componentBorderRadiusCSS: this.componentBorderRadius + 'px'
    }
  },
  mounted() {
    this.time = this.minutes * 60 + this.seconds
  },
  methods: {
    add5Seconds(){
      this.time += 5
    },
    reduce5Seconds(){
      this.time = ((this.time - 5) > 0 ? this.time - 5 : 0)
    },
    getSeconds() {
      return ((this.time % 60) > 0 ? parseInt(this.time % 60) : 0)
    },
    getMinutes() {
      return ((this.time / 60) > 0 ? parseInt(this.time / 60) : 0)
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
  width: 100%;
}

</style>