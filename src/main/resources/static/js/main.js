let data = {
  files: [],
  showVideo: false,
  videoType: '',
  videoPath: ''
};

Vue.component('item', {
  props: ['data'],
  template: '<div @click="itemClick(data)">{{ data.name }}</div>',
  methods: {
    itemClick: function(item) {
      if (item.type === 'dir') {
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
  data: data,
});

ajax.get(`/list/`).then(files => data.files = files);