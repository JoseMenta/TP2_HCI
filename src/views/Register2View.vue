<template>
  <div>
    <v-card height="100" flat color="#27496D" class="d-flex justify-center mb-5 top_card">
      <v-img src="@/assets/fiti-logo.png"
             contain
             class="image-style"
             @click="changeView({name: 'landing'})"/>
      <LanguageSelect :id="1" v-bind:options="['Español','English']" v-bind:abrev="['ESP','ENG']"
                      @menuChanged="changeMenu" class="Lenguage-fixed"></LanguageSelect>
    </v-card>
    <v-sheet class="d-flex center-card-margin flex-column" flat>
      <v-card class="d-flex login-card-style justify-center flex-column" height="400" flat>
        <h1 class="d-flex justify-center mb-2">Registro</h1>
        <TextInput class="margin-style" @input="emailInput"
                   :required="required" textError="Correo Electronico es requerido"
                   placeHolder="Ingrese su Correo Electronico"></TextInput>
        <PasswordInput class="margin-style" @input="password1Input"
                       :required="required" textError="Contraseña es requerida"
                       placeHolder="Ingrese Contraseña"></PasswordInput>
        <PasswordInput class="margin-style" @input="password2Input"
                       :required="required" :textError="this.errorPassword"
                       placeHolder="Ingrese Contraseña nuevamente"></PasswordInput>
        <LoginButton class="d-flex margin-btn-style" @click.native="nextView({name: 'verification'})" :text-size="10" text="Ingresar" :border-radius="12"/>
      </v-card>
    </v-sheet>
  </div>
</template>

import TextInput from "./components/TextInput";
import PasswordInput from "@/components/PasswordInput";

<script>
import TextInput from "@/components/TextInput";
import PasswordInput from "@/components/PasswordInput";
import LoginButton from "@/components/LoginButton";
import LanguageSelect from "@/components/LanguageSelect";

export default {
  name: "Register2View",
  components: {
    TextInput,
    PasswordInput,
    LoginButton,
    LanguageSelect
  },
  data() {
    return {
      email: false,
      inputEmail: '',
      password1: false,
      inputpassword1: '',
      password2: false,
      inputpassword2: '',
      required: false,
      correct: false,
      errorPassword: 'Contraseña es requerida'
    }
  },
  methods: {
    changeView(nameView) {
      this.$router.push(nameView);
    },
    changeMenu(menuId,newValue){
      console.log(menuId)
      console.log(newValue)
    },
    nextView(nameView){
      if(this.email && this.password1 && this.password2){
        if(this.inputpassword1 === this.inputpassword2){
          this.$router.push(nameView);
        }
      }
      else
        this.required=true;
    },
    emailInput(value, input) {
      this.email=value;
      this.inputEmail=input;
    },
    password1Input(value, input) {
      this.password1=value;
      this.inputpassword1=input;
    },
    password2Input(value, input) {
      this.password2=value;
      this.inputpassword2=input;
    }
  },
}
</script>

<style scoped>

.top_card{
  border-radius: 0;
}

.image-style{
  margin-bottom: auto;
  margin-top: auto;
  height: 70px;
}

.login-card-style{
  border-radius: 12px;
  border: 1px solid black;
  background: white;
}

.margin-btn-style{
  margin-right: auto;
  margin-left: auto;
}

.margin-style{
  margin-right: 50px;
  margin-left: 50px;
  margin-bottom: 5px;
}

.Lenguage-fixed{
  width: 100px;
  position: absolute;
  bottom: 0;
  right: 0;
}

.center-card-margin{
  margin-left: 200px;
  margin-right: 200px;
}
</style>
