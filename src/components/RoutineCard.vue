<template>
    <v-card class="d-flex flex-column rounded" :width="width" hover @click="touchCard">
    <v-card class="d-flex rounded-t" flat tile>
      <v-img :src="img" :width="width" :alt="alt" height="100"></v-img>
    </v-card>
    <v-card class="d-flex rounded-b justify-space-between" :color="color" :width="width" flat tile>
      <v-card class="d-inline-flex" flat tile :color="color" >
        <h2>{{name}}</h2>
        <v-icon v-show="favorite===true" color="black" v-text="$vuetify.icons.values.favoriteFull"
                    @click="touchFavorite"></v-icon>
        <v-icon v-show="favorite===false" color="black" @click="touchFavorite"
                v-text="$vuetify.icons.values.favoriteEmpty"></v-icon>
      </v-card>
        <v-card class="d-inline-flex" flat tile :color="color">
          <v-icon v-text="$vuetify.icons.values.edit" color="black" class="action_icon" @click="touchEdit"></v-icon>
          <v-icon v-text="$vuetify.icons.values.delete" color="black" class="action_icon" @click="touchDelete"></v-icon>
        </v-card>
      </v-card>

      <v-card class="d-inline-flex" :width="width" flat tile :color="color">
        <v-rating
            background-color="black"
            color="black"
            :empty-icon="$vuetify.icons.values.starEmpty"
            :full-icon="$vuetify.icons.values.starFull"
            length="5"
            :value="stars"
            readonly
        ></v-rating>
<!--        <v-icon v-text="$vuetify.icons.values.starFull" color="black" v-for="i in stars" :key="i"></v-icon>-->
<!--        <v-icon v-text="$vuetify.icons.values.starEmpty" color="black" v-for="i in (5-stars)" :key="5-i"></v-icon>-->
      </v-card>
      <v-card class="d-inline-flex rounded-b" :width="width" flat tile :color="color">
        <InfoTag v-for="tag in tags" :key="tag" :content="tag"></InfoTag>
      </v-card>
    </v-card>
</template>

<script>

import InfoTag from "@/components/InfoTag";
export default {
  name: "RoutineCard",
  components: {InfoTag},
  props:{
    img:{
      type:String,
      required:true
    },
    alt:{
      type:String,
      required: false,
      default:''
    },
    name:{
      type:String,
      required:true
    },
    isFavorite:{
      type:Boolean,
      required:false,
      default:false
    },
    id:{
      type:Number,
      required:true
    },
    stars:{
      type:Number,
      required:true
    },
    tags:{
      type:Array,
      required:false,
      default(){return []}
    }
  },
  data(){
    return{
      favorite:this.isFavorite,
      width:354,
      color:'lightBlue'
    }
  },
  methods:{
    touchFavorite() {
      console.log(`Favorite set to ${this.favorite} in RoutineCard ${this.id}`)
      this.favorite = !this.favorite
      //Le avisamos al padre que se cambio el estado, para que lo mande a la api
      this.$emit('favoriteTouched',this.id,this.favorite)
    },
    touchEdit(){
      console.log(`Edit touched in RoutineCard ${this.id}`)
      this.$emit('editTouched',this.id)
    },
    touchDelete(){
      console.log(`Delete touched in RoutineCard ${this.id}`)
      this.$emit('deleteTouched',this.id)
    },
    touchCard(){
      console.log(`RoutineCard ${this.id} touched`)
      this.$emit('cardTouched',this.id)
    }
  },

}
</script>

<style scoped>
h2{
  display: inline;
  padding: 0 4px 0 0;
}
.action_icon{
  padding-left: 4px;
  padding-right: 4px;
}
</style>


<!--Esta es la version sin flex de vuetify-->
<!--<template>-->
<!--  <div class="routine_card">-->
<!--    <div class="routine_photo">-->
<!--      <img :src="img" class="routine_photo">-->
<!--    </div>-->
<!--    <div class="routine_info">-->
<!--      &lt;!&ndash;      div para la primera parte horizontal&ndash;&gt;-->
<!--      <div class="horizontal_info">-->
<!--        <div class="information">-->
<!--          <h2>{{name}}</h2>-->
<!--          <v-icon v-show="favorite===true" color="black" v-text="$vuetify.icons.values.favoriteFull"-->
<!--                  @click="touchFavorite" class="action_icon"></v-icon>-->
<!--          <v-icon v-show="favorite===false" color="black" @click="touchFavorite"-->
<!--                  v-text="$vuetify.icons.values.favoriteEmpty" class="action_icon"></v-icon>-->
<!--        </div>-->
<!--        <div class="edit_icons">-->
<!--          <v-icon v-text="$vuetify.icons.values.edit" color="black" class="action_icon"></v-icon>-->
<!--          <v-icon v-text="$vuetify.icons.values.delete" color="black" class="action_icon"></v-icon>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "RoutineCard",-->
<!--  props:{-->
<!--    img:{-->
<!--      type:String,-->
<!--      required:true-->
<!--    },-->
<!--    alt:{-->
<!--      type:String,-->
<!--      required: false,-->
<!--      default:''-->
<!--    },-->
<!--    name:{-->
<!--      type:String,-->
<!--      required:true-->
<!--    },-->
<!--    isFavorite:{-->
<!--      type:Boolean,-->
<!--      required:false,-->
<!--      default:false-->
<!--    },-->
<!--    id:{-->
<!--      type:Number,-->
<!--      required:true-->
<!--    }-->
<!--  },-->
<!--  data(){-->
<!--    return{-->
<!--      favorite:this.isFavorite-->
<!--    }-->
<!--  },-->
<!--  methods:{-->
<!--    touchFavorite() {-->
<!--      this.favorite = !this.favorite-->
<!--      //Le avisamos al padre que se cambio el estado, para que lo mande a la api-->
<!--      this.$emit('favoriteTouched',this.id,this.favorite)-->
<!--    }-->
<!--  },-->

<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.routine_photo{-->
<!--  border-radius: 12px 12px 0 0;-->
<!--  width: 354px;-->
<!--  height: 100px;-->
<!--  object-fit: cover;-->
<!--  display: inline;-->
<!--}-->
<!--.routine_info{-->
<!--  width: 354px;-->
<!--  height: 123px;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  border-radius: 0 0 12px 12px;-->
<!--  background-color: var(&#45;&#45;v-lightBlue-base);-->
<!--}-->
<!--.routine_card{-->
<!--  border: red;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--}-->
<!--.information{-->
<!--  display: inline-flex;-->
<!--}-->
<!--.horizontal_info{-->
<!--  width: 354px;-->
<!--  height: auto;-->
<!--  position: relative;-->
<!--}-->
<!--.edit_icons{-->
<!--  display: inline;-->
<!--  position: absolute;-->
<!--  right: 0;-->
<!--  top: 0;-->
<!--}-->
<!--h2{-->
<!--  display: inline;-->
<!--  padding: 0 4px 0 0;-->
<!--}-->
<!--.action_icon{-->
<!--  padding-left: 4px;-->
<!--  padding-right: 4px;-->
<!--}-->
<!--</style>-->