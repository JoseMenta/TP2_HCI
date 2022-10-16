<template>
  <v-dialog persistent v-model="show" max-width="80%">
    <v-card>
      <v-app-bar height="40">
        <v-row class="d-flex justify-space-between px-4 py-4" width="100%">
          <v-icon color="black" v-text="$vuetify.icons.values.arrowBack" @click="touchBack" ></v-icon>
          <v-icon color="black" @click="changeIcon" >{{icon}}</v-icon>
        </v-row>
      </v-app-bar>
      <div>
        <v-text-field flat class="profile mt-4"
                      v-model="userName"
                      solo
                      :disabled="!edit"/>
        <div class="d-inline-flex ml-12 topStyle mb-5">
          <v-list-item v-for="info in infoRutines"
                       :key="info.text" >
            <div align="center">
              <v-list-item-title class="profile-items">{{info.number}}</v-list-item-title>
              <v-list-item-title class="profile-items">{{info.text.split(' ')[0]}}</v-list-item-title>
              <v-list-item-title class="profile-items">{{info.text.split(' ')[1]}}</v-list-item-title>
            </div>
          </v-list-item>
          <v-dialog width="50%" persistent v-model="imageDialog">
            <template v-slot:activator="{ on, attrs }">
              <v-img
                  :src="getImageSrc"
                  height="50%" max-width="40%"
                  @mouseover="imageHover = edit" @mouseleave="imageHover = false"
                  class="image-style elevation-5 d-flex justify-center align-center"
              >
                <v-icon v-text="$vuetify.icons.values.edit" :size="60" color="black"
                        class="d-flex mx-auto " :class="showImageEditIcon"
                        @click="changeImage" v-on="on" v-bind="attrs"/>
              </v-img>
            </template>
            <UploadUrl title="Cargar contenido (URL)"
                       text="Colocar el url de una imagen o video, preferentemente que no sea de youtube"
                       @closeWarning="imageDialog = false" @subir="uploadUrl"/>
          </v-dialog>

        </div>
      </div>
      <div class="pt-3 background font-color pb-5" >
        <span class="profile d-block " >Datos personales:</span>
        <div class="ml-12 align-content-center profile-bot-items pt-1 pb-3" >
          <span>Email: </span>
          <span class="white--text">{{this.userEmail}}</span>
        </div>
        <v-sheet flat class="d-inline-flex ml-12 profile-bot-items flex-row align-center mb-5" color="#27496D" height="30">
        <span class="white--text">Fecha de nacimiento: </span>
          <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="inputDate"
                  placeholder="Fecha de Nacimiento"
                  background-color="#27496D"
                  readonly
                  :disabled="!edit"
                  flat
                  solo
                  class="style-text-input"
                  top
                  v-bind="attrs"
                  v-on="on"
                  hide-details
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
        </v-sheet>
        <div class="ml-12 align-content-center profile-bot-items mb-5">
          <span>Fecha de registro: </span>
          <span>{{userDate}}</span>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import UploadUrl from "@/components/UploadUrl";

import {mapActions, mapState} from "pinia";

import {useUsers} from "@/store/User";


export default {
  name: "ProfilePopUp",
  components: {
    UploadUrl
  },
  props:{
    dialog: {
      type: Boolean,
      required:true
    },
    // user: {
    //   type: Object,
    //   required: true
    // },
    // userNameImg: {
    //   type: String,
    //   required: true
    // }
  },
  data() {

    return {
      inputDate: '',
      edit: false,
      show: this.dialog,
      menu:false,
      user:{},
      // datef:'',
      activePicker:null,
      icon: "edit",
      userName:'',
      userEmail:'',
      userBirthdate:'',
      userDate:'',
      // closeDialog:false,
      textField: true,
      imageHover: false,
      infoRutines: [
        {text: 'Horas entrenando', number: ''},
        {text: 'Rutinas creadas', number: ''},
      ],
      imageDialog: false
    }
  },
  methods:{
    uploadUrl(url){
      this.imageDialog = false;
      this.getCurrentUser.avatarUrl = url;
    },
    save (date) {
       this.$refs.menu.save(date)
    },
    // getDatepicker(){
    //   return (new Date((new Date(this.user.birthdate)) - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
    // },
    // formatDate () {
    //   if (!this.computedDateFormatted) return null
    //   const [year, month, day] = this.computedDateFormatted.split('-')
    //   return `${day}/${month}/${year}`
    // },
    touchBack(){
      this.show = false
    },
    changeIcon() {
      this.edit=!this.edit
      if (this.icon==='check'){
        this.saveData();
      }
      this.icon = (this.icon === "edit" ? "check" : "edit")
    },
    changeImage(){
      this.imageDialog = true;
    },
    nameInput(value,input) {
      this.userName=value;
      this.inputName=input;
    },
    ...mapActions(useUsers,['getExecutedSeconds']),
    ...mapActions(useUsers,['getCurrentUserRoutines']),
    ...mapActions(useUsers,['modifyCurrentUser']),
    async saveData() {
      if (this.userName) {
        let n=this.userName.split(' ')
        //guardamos los datos en el store
        this.getCurrentUser.firstName = n[0];
        this.getCurrentUser.lastName = (n[1]) ? n[1] : '';
        this.getCurrentUser.username=this.userEmail;
        this.getCurrentUser.email=this.userEmail;
        this.getCurrentUser.birthdate = new Date(this.inputDate).valueOf();
        console.log(this.getCurrentUser)
        await this.modifyCurrentUser(this.getCurrentUser);
      }
    },

  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  computed: {

    showImageEditIcon(){
      return (this.imageHover) ? 'image-hover-style' : 'image-icon-style'
    },
    getImageSrc(){
      return (!this.getCurrentUser.avatarUrl || this.getCurrentUser.avatarUrl === "") ? require('@/assets/placeholder.jpg') : this.getCurrentUser.avatarUrl
    },
    ...mapState(useUsers,{getCurrentUser:'getUser'}),
  },
  async beforeMount() {
    //guuardamos el usuario actual para no tener problemas de consistencia aca
    const userStore = useUsers()
    await userStore.getCurrentUser
    this.inputDate = new Date(this.getCurrentUser.birthdate).toISOString().substr(0,10);
    this.userDate = new Date(this.getCurrentUser.date).toISOString().substr(0,10);
    this.userName = this.getCurrentUser.firstName + ' ' + this.getCurrentUser.lastName;
    this.userEmail=this.getCurrentUser.email;
    console.log(this.getCurrentUser.date)
    console.log('segundos entrenando')
    console.log(await this.getExecutedSeconds())
    this.infoRutines[0].number = await this.getExecutedSeconds()/3600
    this.infoRutines[1].number = (await userStore.getCurrentUserRoutines()).totalCount;
  },



}


</script>

<style scoped>

.background{

  background-color: #27496D;
  height: 100%;
}

.image-style {
  border-radius: 20px;
  border-width: 2px;
  border-style: solid;
  border-color: black;
  position: absolute;
  right:40px;
  top: 70px;

}

.profile{
  margin-left: 25px;
  font-weight: bold;
  font-size: 30px;
}

.profile-items {
  font-weight: bold;
  font-size: 22px;
  margin-left: 3rem;
}

.profile-bot-items{
  font-size: 20px;
}

.font-color{
  color: white;
}

.topStyle{
  height: 80px;
}

.image-hover-style {
  visibility: visible;
}

.image-icon-style {
  visibility: hidden;
}

.style-text-input{
  margin-left: 8px;
  padding: 0;
  font-size: 20px;
}

.style-text-input:deep(input){
  color: white;
}

.text-format{
  background-color: #27496D;
}
</style>