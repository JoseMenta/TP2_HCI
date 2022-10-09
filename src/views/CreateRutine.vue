<template>
  <div class="mx-7 mt-7">
    <v-sheet class="d-inline-flex justify-space-around mb-10" flat width="100%">
      <v-sheet class="d-flex flex-column" width="70%" flat>
        <v-text-field
            hide-details
            placeholder="Nombre de Rutina"
            solo
            flat
            class="title_rutine mb-2 pa-0 ml-0"
        ></v-text-field>
        <v-card class="d-inline-flex mb-5" flat tile>
          <h2 class="text-truncate mr-2">Dificultad: </h2>
          <v-icon v-for="i in 5" :key="i" :color="setColorLevel(i)" @click="setLevel(i)">bolt</v-icon>
        </v-card>
        <div class="d-flex overflow-auto py-4 px-1">
          <v-card class="tag-style" flat>
            <v-dialog persistent v-model="addTagDialog" :key="tagKey">
              <template v-slot:activator="{ on, attrs }">
                <v-btn label class="tag rounded-lg mr-4" height="56"
                       v-bind="attrs" :color="$vuetify.theme.themes.light.grey"
                       v-on="on">+ Tag</v-btn>
              </template>
              <AddTagPopUp @closeWindow="closeTagPopUp" @addTag="newTag"/>
            </v-dialog>
          </v-card>
          <v-card v-for="(tag, index) in tagsText" :color="$vuetify.theme.themes.light.grey"
                  :key="index" height="56" class="mr-4 d-inline-flex align-center tag-style">
            <v-card-text class="text-h6 font-weight-bold black--text">{{tag}}</v-card-text>
            <v-btn icon class="tag-icon-style" color="white" @click="removeTag(index)">
              <v-icon v-text="$vuetify.icons.values.delete" :size="25" color="white"/>
            </v-btn>
          </v-card>
        </div>
      </v-sheet>
      <v-sheet width="30%" class="d-flex flex-column justify-end" flat>
        <v-img
            :src="require('@/assets/placeholder.jpg')"
            max-height="200"
            width="auto" @mouseover="imageHover = true" @mouseleave="imageHover = false"
            class="img_rutine elevation-5 d-flex justify-center align-center"
        >
          <v-icon v-text="$vuetify.icons.values.edit" :size="80" color="black"
                  class="d-flex mx-auto image-icon-style" :class="showImageEditIcon"
                  @click="changeImage"/>
        </v-img>
        <v-card class="d-inline-flex justify-center justify-space-between" flat>
          <v-btn class="text-capitalize btn-style"
                 color="#00909E"
                 ripple
                 width="45%"
                 height="auto"
                 @click="changeView({name: 'createdRoutines'})">
            <v-icon small color="white">done</v-icon>
            <span class="white--text my-3 mx-3 text-style">Guardar</span>
          </v-btn>
          <v-btn class="text-capitalize btn-style"
                 color="#27496D"
                 ripple
                 width="45%"
                 height="auto"
                 @click="changeView({name: 'createdRoutines'})">
            <v-icon small color="white">delete</v-icon>
            <span class="white--text  my-3 mx-3 text-style">Descartar</span>
          </v-btn>
        </v-card>
      </v-sheet>
    </v-sheet>
    <v-card flat  >
      <block-rutine class="mb-5"></block-rutine>
      <block-rutine class="mb-5" v-for="i in blocks" :key="i"></block-rutine>
      <NewBlock class="mb-5" :action="addBlock"></NewBlock>
      <block-rutine class="mb-5"></block-rutine>
    </v-card>
  </div>
</template>

<script>
import BlockRutine from "@/components/blockRutine";
import NewBlock from "@/components/NewBlock";
import AddTagPopUp from "@/components/AddTagPopUp";

export default {
  name: "CreateRutine",
  data(){
    return{
      blocks: 2,
      level :0,
      tags: 0,
      tagsText: [],
      imageHover: false,
      addTagDialog: false,
      tagKey: 0
    }
  },
  components: {AddTagPopUp, NewBlock, BlockRutine},
  methods: {
    addBlock() {
      this.blocks = this.blocks +1;
      this.$emit('newExercise')
    },
    setLevel(i){
      this.level = i;
    },
    setColorLevel(i){
      return i>this.level ? "grey" : "black";
    },
    newTag(name){
      this.tagsText.push(name)
      this.tags = this.tags + 1;
      this.closeTagPopUp()
    },
    removeTag(index){
      this.tagsText.splice(index, 1)
    },
    changeView(nameView) {
      this.$router.push(nameView)
    },
    changeImage(){
      alert("Upload new image.")
    },
    closeTagPopUp(){
      this.tagKey++
      this.addTagDialog = false
    }
  },
  computed: {
    showImageEditIcon(){
      return (this.imageHover) ? 'image-hover-style' : ''
    }
  }
}
</script>

<style scoped>

.custom-text-field.v-text-field.v-text-field--enclosed .v-input__slot {
  padding: 0;
}

:deep(.v-label) {
  font-size: 30px
}

.title_rutine{
  font-size: 30px;
}

.tag-style {
  border-radius: 10px;
}

.tag-icon-style {
  position: absolute;
  background-color: var(--v-blue-base);
  top: -15px;
  right: -15px;
}

.img_rutine{
  margin-bottom: 15px;
  border-radius: 20px !important;
}
/* se como cambiarlo al importarnt */

.btn-style {
  border-radius: 12px;
}

.image-icon-style {
  visibility: hidden;
}

.image-hover-style {
  visibility: visible;
}

/* Con v-bind puedo utilizar una variable para parametrizar el valor de un estilo */
.text-style {
  font-size: v-bind(textSizeCSS);
}
</style>