let videoViewer = {
  UI: {
    playerTemplate: '<video id="my_video_1" class="video-js vjs-sublime-skin" controls preload="auto" width="100%" height="100%" poster="../img/poster.png" data-setup=\'{"techOrder": ["html5"]}\'>' +
    '<source type="%type%" src="%src%" />' +
    '</video>',
    show: function() {
      // insert HTML
      var overlay = $('<div id="videoplayer_overlay" style="display:none;"><div id="videoplayer_outer_container"><div id="videoplayer_container"><div id="videoplayer"></div></div></div></div>');
      overlay.appendTo('body');
      var playerView = videoViewer.UI.playerTemplate
        .replace(/%src%/g, videoViewer.location);
      if (videoViewer.mime) {
        playerView = playerView.replace(/%type%/g, videoViewer.mime);
      } else {
        playerView = playerView.replace(/type="%type%"/g, '');
      }
      $(playerView).prependTo('#videoplayer');
      // close when clicking on the overlay
      overlay.on("click", function(e) {
        if (e.target === this) {
          videoViewer.hidePlayer();
        }
      });
      // show elements
      overlay.fadeIn('fast');
      // initialize player
      videojs("my_video_1").ready(function() {
        videoViewer.player = this;
        // append close button to video element
        var closeButton = $('<a class="icon-view-close" id="box-close" href="#"></a>').click(videoViewer.hidePlayer);
        $("#my_video_1").append(closeButton);
        // autoplay
        videoViewer.player.play();
      });

    },
    hide: function() {
      $('#videoplayer_overlay').fadeOut('fast', function() {
        $('#videoplayer_overlay').remove();
      });
    }
  },
  mime: null,
  location: null,
  player: null,
  mimeTypes: [
    'video/mp4',
    'video/webm',
    'video/x-flv',
    'video/ogg',
    'video/quicktime',
    'video/x-matroska'
  ],
  mimeTypeAliasses: {
    'video/x-matroska': 'video/webm' // mkv support for Chrome. webm uses the same container format
  },
  onView: function(url, mime) {
    videoViewer.location = url;
    videoViewer.mime = mime;
    if (videoViewer.mimeTypeAliasses.hasOwnProperty(videoViewer.mime)) {
      videoViewer.mime = videoViewer.mimeTypeAliasses[videoViewer.mime];
    }
    videoViewer.showPlayer();
  },
  showPlayer: function() {
    videoViewer.UI.show();
  },
  hidePlayer: function() {
    if (videoViewer.player !== null && videoViewer.player !== false) {
      videoViewer.player.dispose();
      videoViewer.player = false;
      videoViewer.UI.hide();
    }
  },
  log: function(message) {
    console.log(message);
  }
};

function play(e) {
  let a = e.target;
  let path = a.dataset.path;
  console.log(`play: ${a.dataset.path}`);

  videoViewer.onView('/video/' + path, ''); // todo mime
}

function expand(e) {
  let a = e.target;
  let path = a.dataset.path;

  if (!a.classList.contains('loaded')) {
    let ul = document.createElement('ul');
    fetch(path, ul);
    a.parentNode.appendChild(ul);
    a.classList.add('loaded');
  }
}

function fetch(path, ul) {
  ajax.get(`/list/${path}`).then(data => {
    for (let file of data) {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.textContent = file.name;
      a.href = 'javascript:;';
      a.dataset.path = file.path;

      if (file.type === 'File') {
        a.classList.add('file');
        a.addEventListener('click', play);
      } else {
        a.classList.add('dir');
        a.addEventListener('click', expand);
      }

      li.appendChild(a);
      ul.appendChild(li);
    }
  });
}

let ul = document.querySelector('.root');
fetch('', ul);