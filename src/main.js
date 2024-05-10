import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import router from "./router";
import { createPersistedState } from "pinia-plugin-persistedstate";

// Vuetify のインポートを追加 **********/
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();
pinia.use(createPersistedState());

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(pinia);
app.mount("#app");
