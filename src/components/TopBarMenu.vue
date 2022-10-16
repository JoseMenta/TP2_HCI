<template>
  <div class="d-flex justify-space-between ml-2 mr-3 toolbar-style">
    <SearchBox class="elements-style" placeholder="Buscar rutinas" :filters="true" :search-box-width="450" :icon-size="40" :btn-border-radius="12" :text-size="20" language="es"/>
    <ProfilePopUp ref="ProfilePopUp" :dialog="false"></ProfilePopUp>
    <ProfileButton class="elements-style" :profile-method="profile" :btn-height="50" :user-name="getCurrentUser.firstName +' '+ getCurrentUser.lastName" :user-name-img="require('@/assets/avatar.jpg')" :img-size="30" :btn-border-radius="12" :img-border-radius="4" :text-size="16"/>
  </div>
</template>

<script>
import SearchBox from "@/components/SearchBox";
import ProfileButton from "@/components/ProfileButton";
import ProfilePopUp from "@/components/ProfilePopUp";

import {mapState} from "pinia";
import {useUsers} from "@/store/User";

export default {
  name: "TopBarMenu",
  components: {
    ProfileButton,
    SearchBox,
    ProfilePopUp
  },
  methods:{
    profile(){
      this.$refs.ProfilePopUp.show=true;
    }
  },
  computed:{
    ...mapState(useUsers,{getCurrentUser:'getUser'}),
  },
  async beforeCreate(){
    const user=useUsers();
    await user.getCurrentUser();
  }
}
</script>

<style scoped>

.toolbar-style {
  width: 100%;
}

.elements-style {
  margin-top: 20px;
}


</style>