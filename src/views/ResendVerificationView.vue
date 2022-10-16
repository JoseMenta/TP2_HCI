<template>
  <div>
    <TopBarLogo/>
    <v-sheet class="d-flex center-card-margin flex-column " flat>
      <v-card class="d-flex login-card-style justify-center flex-column" height="320" flat>
        <h1 class="d-flex justify-center mb-7 my-4">Reenviar código de verificación</h1>
        <TextInput class="margin-style" v-model="inputEmail"
                   :required="required" textError="Se requiere un correo electrónico"
                   placeHolder="Ingrese su correo electrónico"></TextInput>
        <h3 v-if="incorrect" class="red--text d-flex justify-center text- mb-2">{{errorMessage}}</h3>
        <LoginButton :loading="loading" :disabled="!inputEmail" class="d-flex margin-btn-style" @click.native="sendVerification()" :text-size="20" text="Enviar" :border-radius="12"/>
        <v-sheet height="50">
          <h3 v-show="send" class="margin-style">Se ha enviado un mail con el nuevo código de verificación.</h3>
          <h3 v-show="send" class="margin-style">Verifique su casilla de correo electrónico.</h3>
        </v-sheet>
      </v-card>
      <v-card class="d-inline-flex justify-center align-center text-truncate justify-center" height="80" flat>
        <h2 class="d-flex justify-center px-4 mr-2 text-truncate">¿No tienes cuenta aún?</h2>
        <LoginButton :text-size="20" text="Registrarse" :border-radius="12" @click.native="changeView({name: 'register1'})"/>
      </v-card>
    </v-sheet>
  </div>
</template>


<script>
import TextInput from "@/components/TextInput";
import LoginButton from "@/components/LoginButton";
import {useUsers} from "@/store/User";
import TopBarLogo from "@/components/TopBarLogo";


export default {
  name: "ResendVerificationView",
  data(){
    return {
      required:false,
      send: false,
      inputEmail: '',
      incorrect:false,
      errorMessage:'',
      loading:false
    }
  },
  components: {
    TopBarLogo,
    TextInput,
    LoginButton,
  },
  methods:{
    async sendVerification(){
      if(!this.inputEmail){
        this.required = true
        return
      }
      this.loading = true
      const users = useUsers()
      switch (await users.resendVerification(this.inputEmail)){
        case 1:
          this.errorMessage = 'El mail ingresado no es valido';
          this.incorrect = true;
          this.loading = false
          return
        case 3:
          this.errorMessage = 'El mail ingresado no tiene una cuenta asociada';
          this.incorrect = true;
          this.loading = false
          return
        case -1:
          this.$router.push({name:'verification',
          query:{email:this.inputEmail}})
      }

    },
    changeMenu(menuId,newValue){
      console.log(menuId)
      console.log(newValue)
    },
    changeView(nameView) {
      this.$router.push(nameView)
    },
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

.Lenguage-fixed{
  width: 100px;
  position: absolute;
  bottom: 0;
  right: 0;
}

.center-card-margin{
  margin-left: 15%;
  margin-right: 15%;
}
</style>
