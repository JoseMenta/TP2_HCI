<!-- Componente para el visualizador del perfil en la navegacion persistente -->
<!-- TODO: Setear los colores theme, estan puestos a mano -->
<template>
  <div>
    <v-btn class="d-flex btn-style text-capitalize pa-0"
           width="auto" :height="btnHeight"
           @click="showProfile">
      <v-row class="d-inline-flex py-2 px-1 row-style">
        <v-col :cols="8" class="pr-0">
          <span class="font-weight-bold text-style">{{`${user.firstName} ${user.lastName}`}}</span>
        </v-col>
        <v-col :cols="4">
          <v-img :src="!user.avatarUrl? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' : user.avatarUrl "
                 contain :height="imgSize" :width="imgSize"
                 class="image-style ml-auto mr-2"/>
        </v-col>
      </v-row>
    </v-btn>
    <v-dialog persistent width="90%" v-model="showProfileDialog">
      <ProfilePopUp ref="ProfilePopUp" :key="popUpKey" @goBack="closeWindow"/>
    </v-dialog>
  </div>


</template>

<script>
import ProfilePopUp from "@/components/ProfilePopUp";

import {useUsers} from "@/store/User";
import {mapState} from "pinia";


export default {
  name: "ProfileButton",
  components: {
    ProfilePopUp
  },
  // --------------------------------------------
  // Function profileMethod: Funcion que se debe ejecutar al clickear el perfil
  // Number btnHeight: Altura del componente (en px)
  // String userName: Nombre del usuario
  // String userNameImg: URL de la imagen del perfil
  // Number imgSize: Dimensiones de la imagen (en px) [cuadrada]
  // Number btnBorderRadius: Radio del borde (en px)
  // Number imgBorderRadius: Radio de la imagen (en px)
  // Number textSize: Tamaño del texto (en px)
  // --------------------------------------------
  props: {
    btnHeight: {
      type: Number,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    imgSize: {
      type: Number,
      required: true
    },
    btnBorderRadius: {
      type: Number,
      required: true
    },
    imgBorderRadius: {
      type: Number,
      required: true
    },
    textSize: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      // Defino una variable para poder parametrizar el CSS
      textSizeCSS: this.textSize + 'px',
      btnBorderRadiusCSS: this.btnBorderRadius + 'px',
      imgBorderRadiusCSS: this.imgBorderRadius + 'px',

      showProfileDialog: false,
      popUpKey: 0
    }
  },
  computed:{
    ...mapState(useUsers,{user:'getUser'})
  },
  methods: {
    showProfile(){
      this.showProfileDialog = true;
    },
    closeWindow(){
      this.showProfileDialog = false;
      this.popUpKey++;
    }
  },
  async created() {
    const userStore = useUsers()
    await userStore.getCurrentUser()
  }
}
</script>

<style scoped>
.row-style{
  align-items: center;
}
/* Con v-bind puedo utilizar una variable para parametrizar el valor de un estilo */
.btn-style {
  letter-spacing: 0;
  border-radius: v-bind(btnBorderRadiusCSS);
  border: 1px solid black;
}

.text-style {
  font-size: v-bind(textSizeCSS);
}

.image-style {
  border-radius: v-bind(imgBorderRadiusCSS);
}

</style>