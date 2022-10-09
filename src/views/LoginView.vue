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
      <v-card class="d-flex login-card-style justify-center flex-column" height="80%" flat>
        <h1 class="d-flex justify-center mb-2">Inicio de Sesion</h1>
        <TextInput class="margin-style" @input="nameInput"
                   :required="required" textError="Email es requerido"
                   placeHolder="Ingrese Email"></TextInput>
        <PasswordInput class="margin-style" @input="passwordInput"
                   :required="required" textError="Contraseña es requerida"
                   placeHolder="Ingrese Contraseña"></PasswordInput>
        <h3 v-if="correct" class="red--text d-flex justify-center mb-2">Usuario y contraseña incorrectos</h3>
        <LoginButton class="d-flex margin-btn-style" :text-size="10" text="Ingresar" :border-radius="12" @click.native="nextView({name: 'createdRoutines'})"/>
        <a
            class="d-inline-flex text-decoration-underline justify-center mt-5" @click="changeView({name: 'forgotUser'})"
        >Olvidaste tu contraseña</a>
      </v-card>
      <v-card class="d-inline-flex justify-center align-center justify-space-around" height="80" flat>
        <h2 class="d-flex justify-center">¿No tienes cuenta aún?</h2>
        <LoginButton :text-size="10" text="Registrarse" :border-radius="12" @click.native="changeView({name: 'register1'})"/>
      </v-card>
    </v-sheet>
  </div>
</template>


<script>
import TextInput from "@/components/TextInput";
import PasswordInput from "@/components/PasswordInput";
import LoginButton from "@/components/LoginButton";
import LanguageSelect from "@/components/LanguageSelect";

export default {
  name: "LoginView",
  components: {
    TextInput,
    PasswordInput,
    LoginButton,
    LanguageSelect
  },
  data() {
    return {
      name: false,
      inputName: '',
      password: false,
      inputpassword: '',
      required: false,
      correct: false
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
    nextView(nameView){
      if(this.name && this.password)
          if(this.inputpassword==="pepe" && this.inputName==="pepe")
              this.$router.push(nameView);
          else
            this.correct=true;
      else
        this.required=true;
    },
    nameInput(value, input) {
      this.name=value;
      this.inputName=input;
    },
    passwordInput(value, input) {
      this.password=value;
      this.inputpassword=input;
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