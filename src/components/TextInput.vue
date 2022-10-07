<template>
  <v-sheet width="auto" height="auto" >
    <v-text-field
        :label=label
        :placeholder=label
        solo
        background-color="#DAE1E7"
    ></v-text-field>
  </v-sheet>
</template>

<script>
export default {
  name: "TextInput",
  props:{
    label:{
      type:String,
      required: true,
    },
  }
}
</script>

<style scoped>
.input-group--text-field {
  padding: 5px;
}
</style>