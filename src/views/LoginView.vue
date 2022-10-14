<template>
  <div>
    <v-card height="100" flat color="#27496D" class="d-flex justify-center mb-5 top_card">
      <v-img src="@/assets/fiti-logo.png"
             contain
             class="image-style"
             @click="changeView({name: 'landing'})"/>
    </v-card>
    <v-sheet class="d-flex center-card-margin flex-column" flat>
      <v-card class="d-flex login-card-style justify-center flex-column" flat>
        <h1 class="d-flex justify-center mb-2">Inicio de Sesion</h1>
        <TextInput class="margin-style" v-model="inputEmail"
                   :required="required" textError="Se requiere un email"
                   placeHolder="Ingrese Email"></TextInput>
        <PasswordInput class="margin-style" v-model="inputPassword"
                   :required="required" textError="Se requiere una contraseña"
                   placeHolder="Ingrese Contraseña"></PasswordInput>
        <h3 v-if="incorrect" class="red--text d-flex justify-center mb-2">{{errorMessage}}</h3>
        <v-checkbox
            v-model="rememberMe"
            :label="`Mantener la sesión iniciada:${this.rememberMe}`"
            class="px-4"
        ></v-checkbox>
        <LoginButton :disabled = "!inputEmail ||!inputPassword" class="d-flex margin-btn-style" :text-size="20" text="Ingresar" :border-radius="12" @click.native="logIn"/>
        <a class="d-inline-flex text-decoration-underline justify-center mt-5 text-h6" @click="changeView({name: 'resendVerification'})"
        >Reenviar el código de verificación</a>
      </v-card>
      <v-card class="d-inline-flex justify-center align-center text-truncate justify-center" height="80" flat>
        <h2 class="justify-center px-4 mr-2 text-truncate">¿No tienes cuenta aún?</h2>
        <LoginButton :text-size="20" text="Registrarse" :border-radius="12" @click.native="changeView({name: 'register'})"/>
      </v-card>
    </v-sheet>
  </div>
</template>


<script>
import TextInput from "@/components/TextInput";
import PasswordInput from "@/components/PasswordInput";
import LoginButton from "@/components/LoginButton";

import {useUsers} from "@/store/User";

export default {
  name: "LoginView",
  components: {
    TextInput,
    PasswordInput,
    LoginButton,
  },
  data() {
    return {
      email: false,
      inputEmail: '',
      inputPassword: '',
      required: false,
      incorrect: false,
      errorMessage: '',
      rememberMe:false
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
      console.log(this.rememberMe)
      if(!this.inputEmail || !this.inputPassword){
        this.required = true;
        return;
      }
      const users = useUsers();
      const redirectPath = this.$route.query.redirect || '/created_routines'
      switch(await users.login({username: this.inputEmail, password: this.inputPassword}, this.rememberMe)){
        case -1:
          this.errorMessage = 'Error crítico.';
          this.incorrect = true;
          break;
        case 4:
          this.errorMessage = 'El usuario o la contraseña son incorrectos'
          this.incorrect = true;
          break
        case 1:
          this.errorMessage = 'El email y/o la contraseña son inválidos.';
          this.incorrect = true;
          break;
        case 8:
          this.changeView({name:'verification',
            query:{
          email:this.inputEmail
        }});
          break
        case 99:
          this.errorMessage = 'No fue posible comunicarse con el servidor';
          this.incorrect = true;
          break;
        case 0:
          this.incorrect = false;
          this.changeView(redirectPath);
      }
    },
    emailInput(value, input) {
      this.email=value;
      this.inputEmail=input;
    },
    passwordInput(value, input) {
      this.password=value;
      this.inputPassword=input;
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
  margin-bottom: 30px;
}

.margin-style{
  margin-right: 5%;
  margin-left: 5%;
  margin-bottom: 5px;
}


.center-card-margin{
  margin-left: 15%;
  margin-right: 15%;
}

</style>