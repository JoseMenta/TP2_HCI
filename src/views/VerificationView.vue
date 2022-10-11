<template>
  <div>
    <v-card height="100" flat color="#27496D" class="d-flex justify-center mb-5 top_card">
      <v-img src="@/assets/fiti-logo.png"
             contain
             class="image-style"
             @click="changeView('landing')"/>
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
        <LoginButton class="d-flex margin-btn-style" @click.native="verify" :text-size="20" text="Ingresar" :border-radius="12" block :status="!isActive" :waiting="waiting">
        </LoginButton>
      </v-card>
    </v-sheet>
  </div>
</template>


<script>
import LoginButton from "@/components/LoginButton";

import {useUsers} from "@/store/User";

export default {
  name: "VerificationView",
  data: () => ({
    otp:'',
    length: 6,
    waiting:false,
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
  created() {
    console.log(this.code)
    console.log(this.email)
    console.log(this.otp)
  },
  components: {
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
      this.waiting = true
      const users = useUsers();
      let mail = this.email
      if(this.email.length===0){
        mail=users.user.email
      }
      console.log(users.user.email)
      const result = await users.verifyEmail(mail,this.otp);
      this.waiting = false
      switch(result){
        case -1:
          console.log('Error crítico.');
          return;
        case 1:
          console.log('El código es incorrecto.');
          return;
        case 0:
          console.log('Codigo correcto, cuenta verificada');
          this.changeView({name: 'login'});
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
