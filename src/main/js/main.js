import Vue from 'vue';
import ajax from './ajax';
import routerView from './pages/router-view.vue';
import swal from 'sweetalert';

import swalcss from 'sweetalert/dist/sweetalert.css';
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
    currentPath: '',
  },
  components: {
    routerView
  },
  methods: {
    shutdown() {
      swal({
          title: "是否关机？",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          closeOnConfirm: false
        },
        function(){
          // ajax.get('/shutdown');
        });
    }
  }
});

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
});

ajax.get(`/list/`).then(files => app.files = files);