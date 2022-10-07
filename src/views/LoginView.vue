<template>
  <v-card >
    <v-card height="130" elevation="100" color="#27496D" class="d-flex justify-center align-center mb-3">
      <v-img src="@/assets/fiti-logo.png"
             contain height="70" width="70"
             class="image-style"/>
      <LanguageSelect :id="1" v-bind:options="['Español','English']" v-bind:abrev="['ESP','ENG']"
                      @menuChanged="changeMenu"  width="100" class="fixed"></LanguageSelect>
    </v-card>
    <v-card class="d-flex center-card-margin flex-column" flat>
      <v-card class="d-flex login-card-style justify-center flex-column" flat>
        <h1 class="d-flex justify-center mb-5">Inicio de Sesion</h1>
        <TextInput label="Correo Electronico" class="margin-style"></TextInput>
        <PasswordInput password="FYTY" class="margin-style"></PasswordInput>
        <LoginButton class="d-flex margin-btn-style justify-center" :text-size="10" text="Ingresar" :border-radius="12"/>
        <a href="#"
            class="d-inline-flex text-decoration-underline justify-center mt-5"
        >Olvidaste tu contraseña</a>
      </v-card>
      <v-card class="d-inline-flex justify-center align-center justify-space-around" height="80" flat>
        <h2 class="d-flex justify-center">Inicio de Sesion</h2>
        <LoginButton :text-size="10" text="Ingresar" :border-radius="12"/>
      </v-card>
    </v-card>
  </v-card>
</template>

import TextInput from "./components/TextInput";
import PasswordInput from "@/components/PasswordInput";

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
  }
}
</script>

<style scoped>
.login-card-style{
  border-radius: 20px;
  border: 1px solid black;
  background: white;
}

.margin-btn-style{
  margin-right: 200px;
  margin-left: 200px;
  margin-bottom: 10px;
}

.margin-style{
  margin-right: 50px;
  margin-left: 50px;
  margin-bottom: 10px;
}

.fixed{
  position: absolute;
  bottom: 0;
  right: 0;
}

.center-card-margin{
  margin-left: 200px;
  margin-right: 200px;
}
</style>