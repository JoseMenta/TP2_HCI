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
      <v-card class="d-flex login-card-style justify-center flex-column" height="400" flat>
        <h1 class="d-flex justify-center mb-2">Registro</h1>
        <TextInput label="Correo Electronico" class="margin-style"></TextInput>
        <PasswordInput password="FYTY" class="margin-style"></PasswordInput>
        <PasswordInput password="FYTY" class="margin-style"></PasswordInput>
        <LoginButton class="d-flex margin-btn-style" :action="nextRegister" :text-size="10" text="Ingresar" :border-radius="12"/>
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
  methods: {
    nextRegister() {
      console.log("Pasar a proximo paso de registro")
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
