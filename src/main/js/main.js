import Vue from 'vue';
import routes from './routes';
import ajax from './ajax';

import style from './css/style.css';

const app = new Vue({
  el: '.root',
  data: {
    currentRoute: window.location.pathname,
    files: [],
    showVideo: false,
    videoType: '',
    videoPath: '',
    paths: [],
    currentPath: ''
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute];
      return require('./pages/' + matchingView + '.vue');
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
});

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
});

ajax.get(`/list/`).then(files => app.files = files);