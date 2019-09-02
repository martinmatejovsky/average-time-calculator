import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        averageTime: 0
    },
    mutations: {
        mutateAverageTime (averageTime) {
            this.state.averageTime = averageTime;
        }
    }
})