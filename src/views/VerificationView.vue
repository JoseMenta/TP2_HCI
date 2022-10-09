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
        <h1 class="d-flex justify-center mb-5">Verificacion</h1>
        <h3 class="d-flex justify-start margin-style text-format">Código de Verificacion:</h3>
        <h3 class="d-flex justify-start mb-10 pl-10 margin-style text-format">Esta acción requiere verificación de correo, revise su buzón e ingrese el código.</h3>
        <v-otp-input
            :length="length"
            v-model="otp"
            plain
            class="margin-style"
        ></v-otp-input>
        <LoginButton class="d-flex margin-btn-style" @click.native="changeView({name: 'createdRoutines'})" :text-size="10" text="Ingresar" :border-radius="12" block :status="!isActive"/>
      </v-card>
    </v-sheet>
  </div>
</template>

import TextInput from "./components/TextInput";
import PasswordInput from "@/components/PasswordInput";

<script>
import LoginButton from "@/components/LoginButton";
import LanguageSelect from "@/components/LanguageSelect";

export default {
  name: "VerificationView",
  data: () => ({
    otp: '',
    length: 6,
  }),
  computed: {
    isActive () {
      return this.otp.length === this.length
    },
  },
  components: {
    LoginButton,
    LanguageSelect
  },
  methods: {
    changeMenu(menuId,newValue){
      console.log(menuId)
      console.log(newValue)
    },
    changeView(nameView) {
      this.$router.push(nameView)
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
  margin-bottom: 30px;
}

.margin-style{
  margin-right: 50px;
  margin-left: 50px;
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

.v-date-picker-header {
  display: none
}

.text-format{
  color: #7A7A7A;
}
</style>
