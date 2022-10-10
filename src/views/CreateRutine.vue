<template>
  <div class="mx-7 mt-7">
    <v-sheet class="d-inline-flex justify-space-around mb-10" flat width="100%">
      <v-sheet class="d-flex flex-column" width="70%" flat>
        <v-text-field
            :rules="[rules.required]"
            :error="required"
            @input="updateIsEmpty"
            v-model="RutineName"
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
                 @click="saveRutine({name: 'createdRoutines'})">
            <v-icon small color="white">done</v-icon>
            <span class="white--text my-3 mx-3 text-style">Guardar</span>
          </v-btn>
          <v-dialog persistent width="50%" v-model="alertDialog">
            <template v-slot:activator="{on, attrs}">
              <v-btn class="text-capitalize btn-style"
                     color="#27496D"
                     ripple
                     width="45%"
                     height="auto"
                     v-on="on"
                     v-bind="attrs"
                     @click="alertDialog = true">
                <v-icon small color="white">delete</v-icon>
                <span class="white--text  my-3 mx-3 text-style">Descartar</span>
              </v-btn>
            </template>
            <AlertPopUp @closeWarning="alertDialog = false" @cancel="removeRutine({name: 'createdRoutines'})" :title="'¡Atención!'" :text="'¿Está seguro que desea descartar la rutina? Se perderán todos los cambios.'"/>
          </v-dialog>

        </v-card>
      </v-sheet>
    </v-sheet>
    <v-card flat  >
      <blockRutine class="mb-5" v-for="i in blocks" :key="i.id" @input="readTitle" :id="i.id" :required="required"></blockRutine>
      <NewBlock class="mb-5" :action="addBlock"></NewBlock>
      <block-rutine class="mb-5" @input="readTitle" :id="-1" :required="required"></block-rutine>
    </v-card>
  </div>
</template>

<script>
import BlockRutine from "@/components/blockRutine";
import NewBlock from "@/components/NewBlock";
import AddTagPopUp from "@/components/AddTagPopUp";
import AlertPopUp from "@/components/AlertPopUp";

export default {
  name: "CreateRutine",
  data(){
    return{
      level :0,
      tags: 0,
      tagsText: [],
      imageHover: false,
      addTagDialog: false,
      alertDialog: false,
      tagKey: 0,
      RutineName: '',
      NameEmpty: true,
      required: false,
      blocks: [{id: 0, name:"pepe", empty: false}, {id:1, name:"jose", empty: false}],
      finalBlock:{id: -1, name:"", empty: false},
      rules: {
        required: value => !!value || "Es necesario un Titulo de Rutina"
      },
    }
  },
  components: {AlertPopUp, AddTagPopUp, NewBlock, BlockRutine},
  methods: {
    addBlock() {
      this.blocks.push({id: this.blocks.length, name:"jose", empty: false})
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
    saveRutine(nameView) {
      this.required=true;
      for(const index in this.blocks){
        if(!this.blocks[index].empty){
          return;
        }
      }
      if(!this.finalBlock.empty || this.NameEmpty){
        return;
      }
      this.$router.push(nameView)
    },
    removeRutine(nameView) {
      this.$router.push(nameView)
    },
    changeImage(){
      alert("Upload new image.")
    },
    closeTagPopUp(){
      this.tagKey++
      this.addTagDialog = false
    },
    readTitle(value, title, id){
      if(id === -1){
        this.finalBlock.empty=value;
        this.finalBlock.name=title;
        return
      }
      this.blocks[id].empty=value;
      this.blocks[id].name=title;
    },
    updateIsEmpty() {
      this.NameEmpty = (this.RutineName === '')
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