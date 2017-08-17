let data = {
  files: [],
  showVideo: false,
  videoType: '',
  videoPath: '',
  paths: [],
  currentPath: ''
};

Vue.component('navi', {
  props: ['paths'],
  template: `
    <div class="navi">
        <span class="dir" @click="jump($event)">
            <img class="svg" src="../img/home.svg" alt="首页">
        </span>
        <template v-for="(path, i) in paths">
            <span class="dir" @click="jump($event)" :data-path="getPath(i)">{{path}}</span>
        </template>
    </div>
  `,
  methods: {
    getPath: function(i) {
      let s = '';
      for (let j = 0; j <= i; j++) {
        s += this.paths[j] + '/';
      }
      return s ? s.substring(0, s.length - 1) : s;
    },
    jump: function(e) {
      let target = e.target.dataset.path || '';
      if (data.currentPath === target) {
        return;
      }

      ajax.get(`/list/${target}`).then(files => data.files = files);
      data.paths = target ? target.split('/') : [];
      data.currentPath = target;
    }
  }
});

Vue.component('item', {
  props: ['row'],
  template: `<div class="row" @click="itemClick(row)">
                <span :class="['type-icon', row.type]"></span><span>{{ row.name }}</span>
             </div>`,
  methods: {
    itemClick: function(item) {
      if (item.type === 'dir') {
        data.paths.push(item.name);
        data.currentPath += (data.currentPath ? '/' : '') + item.name;
        ajax.get(`/list/${item.path}`).then(files => data.files = files);
      } else {
        data.videoPath = '/video/' + item.path;
        // data.videoType = ''; // todo mime
        data.showVideo = true;
      }
    }
  }
});

Vue.component('video-player', {
  props: ['videoType', 'videoPath'],
  template: `
    <transition name="fade">
        <div id="videoplayer_overlay" @click="closeVideo($event)">
            <div id="videoplayer_outer_container">
                <div id="videoplayer_container">
                    <div id="videoplayer">
                        <video id="my_video_1" class="video-js vjs-sublime-skin" controls preload="auto" width="100%"
                               height="100%" poster="../img/poster.png" data-setup='{"techOrder": ["html5"]}'>
                            <source :type="videoType" :src="videoPath"/>
                        </video>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    `,
  methods: {
    closeVideo: function(e) {
      if (e.target === e.currentTarget) {
        data.videoPath = '';
        data.showVideo = false;
      }
    }
  }
});

let app = new Vue({
  el: '.root',
  data: data
});

ajax.get(`/list/`).then(files => data.files = files);