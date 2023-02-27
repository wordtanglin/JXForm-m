import { createSSRApp } from 'vue'
import App from './App.vue'
import './static/css/reset.scss'
import './static/css/common.scss'

// #ifdef H5

import Vant from 'vant'
import 'vant/lib/index.css'
// #endif

export function createApp() {
  const app = createSSRApp(App)

  // #ifdef H5
  app.use(Vant)
  // #endif

  return {
    app,
  }
}
