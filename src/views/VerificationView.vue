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
      <v-card class="d-flex login-card-style justify-center flex-column" height="400" flat>
        <h1 class="d-flex justify-center mb-5">Verificación</h1>
        <h3 class="d-flex justify-start margin-style text-format">Código de Verificación:</h3>
        <h3 class="d-flex justify-start mb-10 pl-10 margin-style text-format">Esta acción requiere verificación de correo, revise su buzón e ingrese el código.</h3>
        <v-otp-input
            :length="length"
            v-model="otp"
            plain
            class="margin-style"
        ></v-otp-input>
        <LoginButton class="d-flex margin-btn-style" @click.native="verify" :text-size="20" text="Ingresar" :border-radius="12" block :status="!isActive"/>
      </v-card>
    </v-sheet>
    <p>{{this.user}}</p>
    <p>{{this.code}}</p>
  </div>
</template>


<script>
import LoginButton from "@/components/LoginButton";
// import LanguageSelect from "@/components/LanguageSelect";

import {useUsers} from "@/store/User";

export default {
  name: "VerificationView",
  data: () => ({
    otp: '',
    length: 6
  }),
  props:{
    user: {
      type: String,
      required: true
    },
    code:{
      type:String,
      required:true
    }
  },
  computed: {
    isActive () {
      return this.otp.length === this.length
    },
  },
  components: {
    LoginButton,
    // LanguageSelect
  },
  methods: {
    // nextRegister() {
    //   console.log("Pasar a proximo paso de registro")
    // },
    changeMenu(menuId,newValue){
      console.log(menuId)
      console.log(newValue)
    },
    changeView(nameView) {
      this.$router.push(nameView)
    },
    async verify(){
      const users = useUsers();
      // const user = await users.getUserById(this.user);
      // if(user === -1){
      //   console.log('Error crítico.');
      //   return;
      // }
      const result = await users.verifyEmail(this.otp);
      switch(result){
        case -1:
          console.log('Error crítico.');
          return;
        case 1:
          console.log('El código es incorrecto.');
          return;
        case 0:
          console.log('Codigo correcto, cuenta verificada');
          this.changeView({name: 'createdRoutines'});
      }
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
