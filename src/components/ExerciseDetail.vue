<!-- Detalle de un ejercicio. Sirve tanto para la creacion de una rutina (readOnly = false) como para
 el agregado de un ejercicio a una rutina (readOnly = true) -->
<!-- TODO: Setear los colores theme, estan puestos a mano -->
<template>
  <div>
    <span class="description-style black--text d-flex font-weight-bold mb-2 mt-5">{{ getTitleText }}</span>
    <v-textarea v-if="readOnly" class="textarea-style ml-5 mr-2"
                solo flat hide-details readonly no-resize :value="textareaValue"/>
    <v-textarea v-else class="textarea-style ml-5 mr-2 not-readonly-style"
        solo flat hide-details no-resize :placeholder="getPlaceholderText"/>
  </div>
</template>

<script>
export default {
  name: "ExerciseDetail",
  // --------------------------------------------
  // String language: Indica el lenguaje en que se debe mostrar el contenido estatico (Valores aceptados: 'es' y 'en')
  // Boolean readOnly: Indica si el textarea es editable (false) o no (true)
  // String textAreaValue: Permite ingresar contenido al textarea, util cuando readonly = true
  // Number textSize: Tamaño del titulo Descripcion (en px)
  // Number textareaSize: Tamaño del texto en el textarea (en px)
  // Number textareaBorderRadius: Radio del borde del textarea (en px)
  // --------------------------------------------
  props: {
    language: {
      type: String,
      required: true,
      validator(value) {
        return ['es', 'en'].includes(value)
      }
    },
    readOnly: {
      type: Boolean,
      required: true
    },
    textareaValue: {
      type: String,
      required: false
    },
    titleSize: {
      type: Number,
      required: true
    },
    textareaSize: {
      type: Number,
      required: true
    },
    textareaBorderRadius: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      // De esta manera, podemos parametrizar el contenido estático en funcion del lenguaje del usuario
      defaultText: [
        {titleText: 'Descripción:', placeholderText: 'Escriba una descripción del ejercicio', lang: 'es'},
        {titleText: 'Description:', placeholderText: 'Write some info about the exercise', lang: 'en'}
      ],
      titleSizeCSS: this.titleSize + 'px',
      textareaSizeCSS: this.textareaSize + 'px',
      textareaBorderRadiusCSS: this.textareaBorderRadius + 'px'
    }
  },
  computed: {
    getTitleText(){
      return this.defaultText[this.defaultText.map(e => e.lang).indexOf(this.language)].titleText
    },
    getPlaceholderText(){
      return this.defaultText[this.defaultText.map(e => e.lang).indexOf(this.language)].placeholderText
    }
  }
}
</script>

<style scoped>

.description-style {
  font-size: v-bind(titleSizeCSS);
}

.textarea-style {
  max-height: none;
  border-radius: v-bind(textareaBorderRadiusCSS);
  border: 1px solid black;
  font-size: v-bind(textareaSizeCSS);
}

.textarea-style:deep(textarea) {
  padding-left: 10px;
}

.not-readonly-style:deep(textarea:focus) {
  color: black;
}

.not-readonly-style:deep(textarea:not(:focus)){
  color: var(--v-darkGrey-base);
}

</style>