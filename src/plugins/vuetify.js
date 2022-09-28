import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
    dark:false,
    theme:{
        options: { customProperties: true },
    themes: {
        light: {
            darkBlue: '#142850',
            blue: '#27496D',
            lightBlue:'#E8F1F6',
            green: '#00909E',
            grey: '#DAE1E7',
            error: '#FF0000',
            black:'#000000',
            white:'#FFFFFF',
            primary: colors.red.darken1, // #E53935
            secondary: colors.red.lighten4, // #FFCDD2
            accent: colors.indigo.base, // #3F51B5
        },
        dark: {
            primary: colors.blue.darken1,
        },

    }
    },
    icons:{
        font:'md',
        values:{
            favoriteFull:'favorite',
            favoriteEmpty:'favorite_border',
            edit:'edit',
            delete:'delete',
            starFull:'star',
            starEmpty:'star_border',
            up:'expand_less',
            down:'expand_more',
            next:'navigate_next',
            prev:'navigate_before'
        }
    }
});
