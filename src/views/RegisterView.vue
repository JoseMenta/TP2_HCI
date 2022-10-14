<template>
  <div>
  <v-card height="100" flat color="#27496D" class="d-flex justify-center mb-5 top_card">
    <v-img src="@/assets/fiti-logo.png"
           contain
           class="image-style"
           @click="changeView('landing')"/>
  </v-card>
  <v-sheet class="d-flex center-card-margin flex-column" flat>
    <v-card class="d-flex login-card-style justify-center flex-column" flat>
      <h1 class="d-flex justify-center mb-7 mt-8">Registro</h1>
    <v-carousel hide-delimiters hide-delimiter-background :show-arrows="false" height="auto" v-model="step">
          <v-carousel-item>
              <TextInput class="margin-style" v-model="inputName"
                         :required="required" textError="Nombre es requerido"
                         placeHolder="Ingrese su Nombre"></TextInput>
              <TextInput class="margin-style" v-model="inputLastName"
                         :required="required" textError="Apellido es requerido"
                         placeHolder="Ingrese su Apellido"></TextInput>

              <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      :rules="[rules.required]"
                      :error="required"
                      v-model="inputDate"
                      placeholder="Fecha de Nacimiento"
                      solo
                      background-color="#DAE1E7"
                      class="margin-style"
                      readonly
                      flat
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    color="black"
                    no-title
                    v-model="inputDate"
                    :active-picker.sync="activePicker"
                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                    class="date-picker"
                ></v-date-picker>
              </v-menu>
          </v-carousel-item>
          <v-carousel-item>
              <TextInput class="margin-style"
                         v-model="inputEmail"
                         :required="required2" textError="Se requiere un correo electrónico"
                         placeHolder="Ingrese su correo electrónico"></TextInput>
              <PasswordInput class="margin-style" v-model="inputPassword1"
                             :required="required2" :textError="this.errorPassword"
                             placeHolder="Ingrese una contraseña"></PasswordInput>
              <PasswordInput class="margin-style" v-model="inputPassword2"
                             :required="required2" :textError="this.errorPassword"
                             placeHolder="Ingrese la contraseña nuevamente"></PasswordInput>
          </v-carousel-item>
    </v-carousel>
      <h3 v-if="incorrect" class="red--text d-flex justify-center text- mb-2">{{errorMessage}}</h3>
      <v-row>
        <LoginButton class="d-flex margin-btn-style" @click.native="previousAction" :text-size="20" text="Atras" :border-radius="12" :loading="this.buttonLoading"/>
        <LoginButton :disabled="(step===0)?(!inputName || !inputLastName || !inputDate ): (!inputPassword1 || !inputPassword2 || !inputEmail)" class="d-flex margin-btn-style" @click.native="nextAction" :text-size="20" :text="buttonText" :border-radius="12" :loading="this.buttonLoading"/>
      </v-row>
    </v-card>
  </v-sheet>
  </div>
</template>

<script>
import LoginButton from "@/components/LoginButton";
import TextInput from "@/components/TextInput";
import PasswordInput from "@/components/PasswordInput";
import {mapActions, mapState} from "pinia";
import {useUsers} from "@/store/User";
export default {
  name: "RegisterView",
  components: {
    TextInput,
    LoginButton,
    PasswordInput
  },
  data() {
    return {
      buttonText:'Siguiente',
      buttonLoading:false,
      step:0,
      activePicker: null,
      menu: false,
      inputName: '',
      inputLastName: '',
      Date: false,
      inputDate: '',
      required: false,
      rules: {
        required: value => !!value || "Fecha de nacimiento es requerida",
      },
      email: false,
      inputEmail: '',
      inputPassword1: '',
      inputPassword2: '',
      required2: false,
      errorMail:'Se requiere un correo electrónico',
      errorPassword: 'Contraseña es requerida.',
      incorrect:false,
      errorMessage:''
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    changeView(viewName){
      this.$router.push({name:viewName})
    },
    previousAction(){
      if(this.step===0){
        this.$router.back()
      }else{
        this.step--
        this.required = false
      }
    },
    async nextAction(){
      if(this.step===0){
        if(this.inputName && this.inputLastName && this.inputDate.length>0) {
          this.user.firstName = this.inputName
          this.user.lastName = this.inputLastName
          this.user.birthdate = new Date(this.inputDate).valueOf()
          this.buttonText = "Crear usuario"
          this.step++
        }else{
          this.required = true
        }
      }else{
        this.buttonLoading = true
        if(this.inputEmail && this.inputPassword1 && this.inputPassword2){
          if(this.inputPassword1 === this.inputPassword2){
            this.user.password = this.inputPassword1
            this.user.email = this.inputEmail
            this.user.username = this.inputEmail
            switch (await this.createUser()){
              case -1:
                this.errorMessage = 'Faltan datos para crear el usuario';
                console.log(this.user)
                this.incorrect = true;
                this.buttonLoading = false
                return;
              case 1:
                this.errorMessage='El email no es válido';
                this.incorrect = true;
                this.buttonLoading = false;
                return
              case 2:
                this.errorMessage='Ya existe un usuario con ese mail';
                this.incorrect = true;
                this.buttonLoading = false;
                return
              case -2:
                this.$router.push({
                        name:'verification',
                        query:{
                          email:this.user.email
                        }});
                break
              case 99:
                this.errorMessage = "No fue posible conectarse al servidor";
                this.incorrect = true;
                this.buttonLoading = false
                return
              default:
                this.errorMessage = 'Error desconocido'
                this.incorrect = true
                this.buttonLoading = false
                return
            }
          }else{
            this.errorMessage = "La contraseña debe ser igual en ambos campos"
            this.incorrect = true
            this.buttonLoading = false
          }
        }else{
          this.errorPassword = "Se require una contraseña"
          this.buttonLoading = false
          this.required2= true;
        }
      }
    },
    ...mapActions(useUsers,['createUser'])
  },
  computed:{
    ...mapState(useUsers,{user:'newUser'})
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
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
button.v-btn[disbled]{
  opacity: 0.6;
}
.login-card-style{
  border-radius: 12px;
  border: 1px solid black;
  background: white;
  padding-bottom: 20px;
}

.margin-btn-style{
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 30px;
}

.margin-style{
  margin-right: 5%;
  margin-left: 5%;
  margin-bottom: 5px;
}


.center-card-margin{
  margin-left: 15%;
  margin-right: 15%;
}
/*.v-date-picker-header {*/
/*  display: none*/
/*}*/

.date-picker{
  width: 100%;
}
</style>