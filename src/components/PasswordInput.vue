<template>
  <v-sheet width="auto"
           height="auto" >
    <v-text-field
        :rules="[rules.required, rules.pass]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Ingresar Contraseña"
        solo
        counter
        background-color="#DAE1E7"
    >
      <v-icon slot="append"
              class="mx-3"
              color="#1C1B1F"
              v-text="show1 ? 'visibility' : 'visibility_off'"
              @click="show1 = !show1"/>
    </v-text-field>
  </v-sheet>
</template>

<script>
export default {
  name: "PasswordInput",
  props:{
    password:{
      type:String,
      required: true
    }
  },
  data () {
    return {
      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        pass: v => v === "FYTY" || 'Contraseña incorrecta',
      },
    }
  },
}
</script>

<style scoped>

</style>