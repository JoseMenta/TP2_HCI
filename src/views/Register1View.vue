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
        <h1 class="d-flex justify-center mb-7 mt-8">Registro</h1>
        <TextInput class="margin-style" @input="nameInput"
                   :required="required" textError="Nombre es requerido"
                   placeHolder="Ingrese su Nombre"></TextInput>
        <TextInput class="margin-style" @input="LastNameInput"
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

        <LoginButton class="d-flex margin-btn-style" @click.native="saveData" :text-size="20" text="Siguiente" :border-radius="12"/>
      </v-card>
    </v-sheet>
  </div>
</template>



<script>
import TextInput from "@/components/TextInput";
import LoginButton from "@/components/LoginButton";
import {mapState} from 'pinia'
import {useUsers} from "@/store/User";

export default {
  name: "Register1View",
  components: {
    TextInput,
    LoginButton,
  },
  data() {
    return {
      activePicker: null,
      menu: false,
      name: false,
      inputName: '',
      LastName: false,
      inputLastName: '',
      Date: false,
      inputDate: '',
      required: false,
      correct: false,
      rules: {
        required: value => !!value || "Fecha de nacimiento es requerida",
      },
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    changeMenu(menuId,newValue){
      console.log(menuId)
      console.log(newValue)
    },
    changeView(viewName){
      this.$router.push({name:viewName})
    },
    saveData(){
      if(this.name && this.LastName && this.inputDate.length>0) {
        //guardamos los datos en el store
        this.user.firstName = this.inputName
        this.user.lastName = this.inputLastName
        this.user.birthdate = new Date(this.inputDate).valueOf()
        this.$router.push({name:'register2'})
      }else{
        this.required = true
      }
    },
    nameInput(value, input) {
      this.name=value;
      this.inputName=input;
    },
    LastNameInput(value, input) {
      this.LastName=value;
      this.inputLastName=input;
    }
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


.center-card-margin{
  margin-left: 200px;
  margin-right: 200px;
}

/*.v-date-picker-header {*/
/*  display: none*/
/*}*/

.date-picker{
  width: 100%;
}
</style>
