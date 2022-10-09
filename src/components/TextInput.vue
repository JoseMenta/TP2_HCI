<template>
  <v-sheet width="auto" height="auto" >
    <v-text-field :rules="[rules.required]"
                  :error="required"
                  @input="updateIsEmpty"
                  :placeholder="placeHolder"
                  solo
                  flat
                  v-model="input"
                  background-color="#DAE1E7"></v-text-field>
  </v-sheet>
</template>

<script>
export default {
  name: "TextInput",
  data() {
    return {
      input: '',
      IsEmpty: false,
      rules: {
        required: value => !!value || this.textError
      },
    }
  },
  props:{
    required:{
      type: Boolean,
      required: true
    },
    textError:{
      type: String,
      required: true
    },
    placeHolder:{
      type: String,
      required: true
    }
  },
  methods: {
    updateIsEmpty() {
      this.IsEmpty = (this.input === '')
      this.$emit('input', !this.IsEmpty, this.input)
    }
  }
}
</script>

<style scoped>
</style>