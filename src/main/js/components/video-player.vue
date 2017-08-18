<template>
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
</template>

<script>
    import poster from '../img/poster.png';

    export default {
        props: ['videoType', 'videoPath'],
        methods: {
            closeVideo: function(e) {
                if (e.target === e.currentTarget) {
                    this.$root.videoPath = '';
                    this.$root.showVideo = false;
                }
            }
        }
    };
</script>