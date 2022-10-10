<template>
  <div>
    <v-card height="100" flat color="#27496D" class="d-flex justify-center mb-5 top_card">
      <v-img src="@/assets/fiti-logo.png"
             contain
             class="image-style"/>
<!--      <LanguageSelect :id="1" v-bind:options="['Español','English']" v-bind:abrev="['ESP','ENG']"-->
<!--                      @menuChanged="changeMenu" class="Lenguage-fixed"></LanguageSelect>-->
    </v-card>
    <v-sheet class="d-flex center-card-margin flex-column" flat>
      <v-card class="d-flex login-card-style justify-center flex-column" height="80%" flat>
        <h1 class="d-flex justify-center mb-2">Inicio de Sesion</h1>
        <TextInput class="margin-style" @input="emailInput"
                   :required="required" textError="Se requiere un email"
                   placeHolder="Ingrese Email"></TextInput>
        <PasswordInput class="margin-style" @input="passwordInput"
                   :required="required" textError="Se requiere una contraseña"
                   placeHolder="Ingrese Contraseña"></PasswordInput>
        <h3 v-if="incorrect" class="red--text d-flex justify-center mb-2">{{errorMessage}}</h3>
        <LoginButton class="d-flex margin-btn-style" :text-size="20" text="Ingresar" :border-radius="12" @click.native="logIn"/>
        <a
            class="d-inline-flex text-decoration-underline justify-center mt-5 text-h6" @click="changeView({name: 'resendVerification'})"
        >Reenviar el código de verificación</a>
      </v-card>
      <v-card class="d-inline-flex justify-center align-center justify-space-around" height="80" flat>
        <h2 class="d-flex justify-center">¿No tienes cuenta aún?</h2>
        <LoginButton :text-size="20" text="Registrarse" :border-radius="12" @click.native="changeView({name: 'register1'})"/>
      </v-card>
    </v-sheet>
  </div>
</template>


<script>
import TextInput from "@/components/TextInput";
import PasswordInput from "@/components/PasswordInput";
import LoginButton from "@/components/LoginButton";
// import LanguageSelect from "@/components/LanguageSelect";

import {useUsers} from "@/store/User";

export default {
  name: "LoginView",
  components: {
    TextInput,
    PasswordInput,
    LoginButton,
    // LanguageSelect
  },
  data() {
    return {
      email: false,
      inputEmail: '',
      password: false,
      inputPassword: '',
      required: false,
      incorrect: false,
      errorMessage: ''
    }
  },
  methods:{
    changeMenu(menuId,newValue){
      console.log(menuId)
      console.log(newValue)
    },
    changeView(nameView) {
      this.$router.push(nameView);
    },
    async logIn(){
      if(!this.name || !this.password){
        this.required = true;
      }
      const users = useUsers();
      switch(await users.login({username: this.inputEmail, password: this.inputPassword}, false)){
        case -1:
          this.errorMessage = 'Error crítico.';
          this.incorrect = true;
          break;
        case 1:
          this.errorMessage = 'El email y/o la contraseña son inválidos.';
          this.incorrect = true;
          break;
        case 0:
          this.incorrect = false;
          this.changeView({name: 'createdRoutines'});
      }
    },
    /*nextView(nameView){
      if(this.email && this.password)
          if(this.inputPassword==="pepe" && this.inputEmail==="pepe")
              this.$router.push(nameView);
          else
            this.incorrect=true;
      else
        this.required=true;
    },*/
    emailInput(value, input) {
      this.email=value;
      this.inputEmail=input;
    },
    passwordInput(value, input) {
      this.password=value;
      this.inputPassword=input;
    }
  }
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