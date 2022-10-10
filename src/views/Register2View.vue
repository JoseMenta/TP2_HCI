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
        <h1 class="d-flex justify-center mb-7">Registro</h1>
        <TextInput class="margin-style" @input="emailInput"
                   :required="required" textError="Se requiere un correo electrónico"
                   placeHolder="Ingrese su correo electrónico"></TextInput>
        <PasswordInput class="margin-style" @input="password1Input"
                       :required="required" textError="Se requiere una contraseña"
                       placeHolder="Ingrese una contraseña"></PasswordInput>
        <PasswordInput class="margin-style" @input="password2Input"
                       :required="required" :textError="this.errorPassword"
                       placeHolder="Ingrese la contraseña nuevamente"></PasswordInput>
        <LoginButton class="d-flex margin-btn-style" @click.native="nextView({name: 'verification'})" :text-size="20" text="Ingresar" :border-radius="12"/>
      </v-card>
    </v-sheet>
  </div>
</template>


<script>
import TextInput from "@/components/TextInput";
import PasswordInput from "@/components/PasswordInput";
import LoginButton from "@/components/LoginButton";
import {mapActions, mapState} from "pinia";
import {useUsers} from "@/store/User";

export default {
  name: "Register2View",
  components: {
    TextInput,
    PasswordInput,
    LoginButton,
  },
  data() {
    return {
      email: false,
      inputEmail: '',
      password1: false,
      inputPassword1: '',
      password2: false,
      inputPassword2: '',
      required: false,
      correct: false,
      errorPassword: 'Contraseña es requerida.'
    }
  },
  methods: {
    changeMenu(menuId,newValue){
      console.log(menuId)
      console.log(newValue)
    },
    async nextView(nameView){
      if(this.email && this.password1 && this.password2){
        if(this.inputpassword1 === this.inputPassword2){
          try{
            this.user.password = this.inputpassword1
            this.user.email = this.inputEmail
            this.user.username = this.inputEmail
            await this.createUser();
          }catch (e){
            console.log(e)
          }
          this.$router.push(nameView);
        }
      }
      else
        this.required=true;
    },
    emailInput(value, input) {
      this.email=value;
      this.inputEmail=input;
    },
    changeView(viewName){
      this.$router.push({name:viewName})
    },
    password1Input(value, input) {
      this.password1=value;
      this.inputpassword1=input;
    },
    password2Input(value, input) {
      this.password2=value;
      this.inputPassword2=input;
    },
    ...mapActions(useUsers,['createUser'])
  },
  computed:{
    ...mapState(useUsers,{user:'newUser'})
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

.center-card-margin{
  margin-left: 200px;
  margin-right: 200px;
}
</style>
