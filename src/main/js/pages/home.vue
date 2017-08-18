<template>
    <div>
        <navi :paths="paths"></navi>
        <div class="file-list">
            <list-item v-for="item in files"
                  :row="item">
            </list-item>
            <div class="empty-content" v-if="files.length === 0">
                <div class="icon-folder"></div>
                <h2>无文件</h2>
            </div>
        </div>
        <video-player v-if="showVideo" :video-type="videoType" :video-path="videoPath"/>
    </div>
</template>

<script>
    import navi from '../components/navi.vue'
    import listItem from '../components/list-item.vue'
    import videoPlayer from '../components/video-player.vue'

    export default {
        components: {
            navi,
            listItem,
            videoPlayer
        },
        computed: {
            paths() {
                return this.$root.paths;
            },
            files() {
                return this.$root.files;
            },
            showVideo() {
                return this.$root.showVideo;
            },
            videoType() {
                return this.$root.videoType;
            },
            videoPath() {
                return this.$root.videoPath;
            }
        }
    }
</script>
