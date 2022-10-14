<template>
  <v-sheet width="auto"
           height="auto" >
    <v-text-field
        :rules="[rules.required]"
        :type="show1 ? 'text' : 'password'"
        :error="IsEmpty || required"
        @input="updateIsEmpty"
        :placeholder="placeHolder"
        solo
        counter
        flat
        v-model="content"
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
  data () {
    return {
      content: '',
      show1: false,
      IsEmpty: false,
      rules: {
        required: value => !!value || this.textError,
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
    },
    value:{
      type:String,
      required:true,
    }
  },
  methods: {
    updateIsEmpty() {
      this.IsEmpty = (this.input === '')
      this.$emit('input', this.content)
    }
  },
}
</script>

<style scoped>
</style>