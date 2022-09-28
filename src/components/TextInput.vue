<template>
  <v-sheet        width="auto"
                  height="auto" >
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
  },
  data () {
    return {
      show1: false,
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        pass: v => v === "FYTY" || 'Contraseña incorrecta',
      },
    }
  }
}
</script>

<style scoped>

</style>