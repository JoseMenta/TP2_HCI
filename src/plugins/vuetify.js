import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
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
                darkGrey: '#808080',
                error: '#FF0000',
                black:'#000000',
                white:'#FFFFFF'
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
            search: 'search',
            keyboardArrowUp: 'keyboard_arrow_up',
            keyboardArrowDown: 'keyboard_arrow_down',
            replay: 'replay',
            next:'navigate_next',
            prev:'navigate_before',
            add: 'add',
            arrowBack: 'arrow_back',
            done: 'done',
            playCircle: 'play_circle',
            clear: 'clear'
        }
    }
});
