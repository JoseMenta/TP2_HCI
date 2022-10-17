<template>
  <div>
    <TopBarLogo/>
    <v-sheet class="d-flex center-card-margin flex-column" flat>
      <v-card class="d-flex login-card-style justify-center flex-column" flat>
        <h1 class="d-flex justify-center mb-5 my-4">Verificación</h1>
        <h3 class="d-flex justify-start margin-style text-format">Ingrese el código de verificación enviado a su mail</h3>
        <v-spacer></v-spacer>
        <v-otp-input
            :length="length"
            v-model="otp"
            plain
            class="margin-style"
        ></v-otp-input>
        <h3 v-if="incorrect" class="red--text d-flex justify-center text- mb-2">{{errorMessage}}</h3>
        <LoginButton :disabled="otp.length!==6" :loading="buttonLoading" class="d-flex margin-btn-style" @click.native="verify" :text-size="20" text="Ingresar" :border-radius="12" block :status="!isActive" :waiting="waiting">
        </LoginButton>
        <a class="d-inline-flex text-decoration-underline justify-center mt-5 text-h6" @click="changeView({name: 'resendVerification'})"
        >Reenviar el código de verificación</a>
      </v-card>
    </v-sheet>
  </div>
</template>


<script>
import LoginButton from "@/components/LoginButton";

import {useUsers} from "@/store/User";
import TopBarLogo from "@/components/TopBarLogo";

export default {
  name: "VerificationView",
  data: () => ({
    otp:'',
    length: 6,
    waiting:false,
    buttonLoading:false,
    incorrect:false,
    errorMessage:'',
  }),
  props:{
    user: {
      type: String,
      required: false,
      default:''
    },
    email:{
      type:String,
      required:false,
      default:''
    }
  },
  computed: {
    isActive () {
      return this.otp.length === this.length
    },
  },
  components: {
    TopBarLogo,
    LoginButton,
  },
  methods: {
    changeMenu(menuId,newValue){
      console.log(menuId)
      console.log(newValue)
    },
    changeView(nameView) {
      this.$router.push(nameView)
    },
    async verify(){
      this.buttonLoading = true
      const users = useUsers();
      const result = await users.verifyEmail(this.email,this.otp);
      this.buttonLoading = false
      // console.log(result)
      switch(result){
        case 0:
          // console.log('Error crítico.');
          this.errorMessage = 'Error desconocido';
          this.incorrect = true
          return;
        case 99:
          this.errorMessage = 'No fue posible conectarse con el servidor';
          this.incorrect = true;
          return
        case 8:
          this.errorMessage = 'El codigo ingresado no es correcto, intente nuevamente';
          this.incorrect = true;
          return;
        case 1:
          // console.log('El código es incorrecto.');
          this.errorMessage = 'El código ingresado no es correcto, intente nuevamente';
          this.incorrect = true
          return;
        case -1:
          // console.log('Codigo correcto, cuenta verificada');
          this.changeView({name: 'login'});
      }

    }
  }
}

</script>

<style scoped>

.login-card-style{
  border-radius: 12px;
  border: 1px solid black;
  padding-bottom: 20px;
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
  margin-bottom: 30px;
}


.center-card-margin{
  margin-left: 15%;
  margin-right: 15%;
}

.v-date-picker-header {
  display: none
}

.text-format{
  color: #7A7A7A;
}
</style>
