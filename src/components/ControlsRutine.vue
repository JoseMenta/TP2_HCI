<template>
  <!--      Si bien ahora es repetir 3 veces lo mismo, en la implementacion cada boton va a hacer cosas diferentes-->
  <!--      Hacer componentes de botones seria repetir lo mismo pero com paraetros-->
  <v-card
      class="d-flex justify-space-between mb-6"
      flat
      tile
      width="200"
  >
    <v-btn
        :color="prev?  '#00909E' : 'rgb(0, 144, 158, 0.2)'"
        min-height="40"
        :disabled="!prev"
        max-width="40"
        x-small
        class="align-self-center"
        @click="clickPrev"
    >
      <v-icon color="#FFFFFF" large>fast_rewind</v-icon>
    </v-btn>
    <v-btn
        :color="play? '#00909E' : 'rgb(0, 144, 158, 0.2)'"
        :disabled="!play"
        height="80"
        width="40%"
        x-small
        @click="clickPlay"
    >
      <v-icon color="#FFFFFF" x-large>{{ this.paused?'play_arrow':'pause' }}</v-icon>
    </v-btn>
    <v-btn
        :color="next? '#00909E' : 'rgb(0, 144, 158, 0.2)'"
        :disabled = "!next"
        min-height="40"
        max-width="40"
        x-small
        class="align-self-center"
        @click="clickNext"
    >
      <v-icon color="#FFFFFF" large>fast_forward</v-icon>
    </v-btn>
    </v-card>
</template>

<!--      Si bien ahora es repetir 3 veces lo mismo, en la implementacion posta cada boton va a hacer cosas diferentes-->
<script>
export default {
  name: "ControlsRutine",
  props:{
    prev:{
      type:Boolean,
      required:true,
    },
    play:{
      type:Boolean,
      required:true,
    },
    paused:{
      type:Boolean,
      required:true,
    },
    next:{
      type:Boolean,
      required:true,
    },
  },
  data() {
    return {
    }
  },
  methods:{
    clickPrev(){
      this.$emit('prev')
    },
    clickPlay(){
      this.$emit('play')
    },
    clickNext(){
      this.$emit('next')
    }
  }
}
</script>

<style scoped>

</style>