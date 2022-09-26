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
        max-width="40"
        x-small
        class="align-self-center"
        @click="clickPrev"
    >
      <v-icon color="#FFFFFF" large>fast_rewind</v-icon>
    </v-btn>
    <v-btn
        :color="play? '#00909E' : 'rgb(0, 144, 158, 0.2)'"
        min-height="54"
        max-width="54"
        x-small
        @click="clickPlay"
    >
      <v-icon color="#FFFFFF" x-large>play_arrow</v-icon>
    </v-btn>
    <v-btn
        :color="next? '#00909E' : 'rgb(0, 144, 158, 0.2)'"
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
  data() {
    return {
      prev:true,
      play:true,
      next:true,
    }
  },
  methods:{
    clickPrev(){
      this.prev = !this.prev;
      console.log(`Click in prev`)
      this.$emit(`${this.select}`)
    },
    clickPlay(){
      this.play = !this.play;
      console.log(`Click in play`)
      this.$emit(`${this.select}`)
    },
    clickNext(){
      this.next = !this.next;
      console.log(`Click in next`)
      this.$emit(`${this.select}`)
    }
  }
}
</script>

<style scoped>

</style>