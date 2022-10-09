<template>
  <div>
    <v-card height="100" flat color="#27496D" class="d-flex justify-center mb-5 top_card">
      <v-img src="@/assets/fiti-logo.png"
             contain
             class="image-style"/>
      <LanguageSelect :id="1" v-bind:options="['Español','English']" v-bind:abrev="['ESP','ENG']"
                      @menuChanged="changeMenu" class="Lenguage-fixed"></LanguageSelect>
    </v-card>
    <v-sheet class="d-flex center-card-margin flex-column" flat>
      <v-card class="d-flex login-card-style justify-center flex-column" height="320" flat>
        <h1 class="d-flex justify-center mb-7">Olvidé mi cuenta</h1>
        <TextInput class="margin-style" @input="emailInput"
                   :required="false" textError="Correo Electronico es requerido"
                   placeHolder="Ingrese su Correo Electronico"></TextInput>
        <LoginButton :status="!this.email" class="d-flex margin-btn-style" @click.native="sendVerification()" :text-size="10" text="Recuperar" :border-radius="12"/>
        <v-sheet height="50">
          <h3 v-show="send" class="margin-style">Se ha enviado un mail para restaurar su contraseña</h3>
          <h3 v-show="send" class="margin-style">Verifique su casilla de correo electronico</h3>
        </v-sheet>
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
import LoginButton from "@/components/LoginButton";
import LanguageSelect from "@/components/LanguageSelect";

export default {
  name: "ForgotUser",
  data(){
    return {
      send: false,
      email: false,
      inputEmail: '',
    }
  },
  components: {
    TextInput,
    LoginButton,
    LanguageSelect
  },
  methods:{
    sendVerification(){
        this.send = true
    },
    changeMenu(menuId,newValue){
      console.log(menuId)
      console.log(newValue)
    },
    changeView(nameView) {
      this.$router.push(nameView)
    },
    emailInput(value, input) {
      this.email=value;
      this.inputEmail=input;
    },
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
  margin-bottom: 30px;
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
