<template>
  <v-btn class="text-capitalize border-style"
         ripple
         width="100%"
         height="50"
          @click="action">
    <v-icon small color="black">add</v-icon>
    <span class="black--text my-3 mx-3 text-style">Agregar Bloque</span>
  </v-btn>
</template>

<script>
export default {
  name: "NewBlock",
  props: {
    action: {
      type: Function,
      required: true
    }
  }
}

</script>

<style scoped>
.border-style{
  border: solid;
  border-color: #79747E;
  border-radius: 20px !important;
}
.theme--light.v-btn.v-btn--has-bg{
  background-color: #E8F1F6;
}
</style>