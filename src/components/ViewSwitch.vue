<!-- Componente para un toggle de botones -->
<!-- TODO: Setear los colores theme, estan puestos a mano -->
<template>
  <!-- mandatory exige que siempre debe haber un boton seleccionado
   Dado que selectedItem empieza valiendo 0, el componente comienza seleccionando la primera opcion -->
  <v-btn-toggle mandatory
                class="btn-toggle-style"
                borderless
                v-model="selectedItem">
    <!-- v-model almacena en selectedItem el valor de la key que esta siendo seleccionada (en este caso, la
     key es el indice del boton seleccionado en el toggle), lo cual me permite cambiar el estilo del boton
     seleccionado con respecto al resto de los botones -->

    <!-- El v-for me permite parametrizar los botones que necesito definiendo un arreglo en el area data de
    <script> y utilizo como key el indice de cada elemento en el arreglo -->
    <v-btn v-for="(item, i) in items" :key="i"
           width="auto"
           height="auto"
           ripple
           :class="isClicked(i)">
      <span class="text-capitalize my-2 mx-5 btn-text-style">{{item.text}}</span>
    </v-btn>
  </v-btn-toggle>
</template>

<script>

export default {
  name: "ViewSwitch",
  // --------------------------------------------
  // Array items: Arreglo de objetos JSON con el campo 'text'
  // Number textSize: Tamaño del texto (en px) de cada boton
  // Number borderRadius: Radio del borde (en px)
  // --------------------------------------------
  props: {
    items: {
      type: Array,
      required: true
    },
    textSize: {
      type: Number,
      required: true
    },
    borderRadius: {
      type: Number,
      required: true
    }
  },
  // En data, almaceno el indice del item seleccionado y defino variables para poder hacer v-bind en <style>
  data(){
    return {
      selectedItem: 0,
      textSizeCSS: this.textSize + 'px',
      borderRadiusCSS: this.borderRadius + 'px'
    }
  },
  methods: {
    // Este metodo lo utilizo para preguntar si el boton que llama al metodo es el que esta seleccionado
    // Si es asi, adopta la clase active-btn-style, sino adopta la clase nonactive-btn-style
    isClicked(index){
      this.$emit('viewChanged', index);
      return (index === this.selectedItem) ? 'active-btn-style' : 'nonactive-btn-style'
    }
  },
}
</script>

<style scoped>

.btn-toggle-style {
  border-radius: v-bind(borderRadiusCSS);
}

.btn-text-style {
  font-size: v-bind(textSizeCSS);
}

.v-btn.active-btn-style {
  background-color: rgba(0, 144, 158, 1);
}

/* Estilo de texto para el boton seleccionado */
.active-btn-style span.btn-text-style {
  color: white;
}

.v-btn.nonactive-btn-style {
  background-color: rgba(0, 144, 158, 0.2);
}

/* Estilo de texto para el boton no seleccionado */
.nonactive-btn-style span.btn-text-style {
  color: black;
}

</style>