import Vue from "vue";
import Router from "vue-router";
import AverageTime from "./views/AverageTimeCalculator"
import Settings from "./views/Settings"

Vue.use(Router);

export default new Router({
   routes: [
       {
           path: "/",
           name: "average-time",
           component: AverageTime
       },
       {
           path: "/nastaveni",
           name: "settings",
           component: Settings
       }
   ]
});