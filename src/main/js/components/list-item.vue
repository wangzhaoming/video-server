<template>
    <div class="row" @click="itemClick(row)">
        <span :class="['type-icon', row.type]"></span><span>{{ row.name }}</span>
    </div>
</template>

<script>
    import ajax from '../ajax';

    export default {
        props: ['row'],
        methods: {
            itemClick: function(item) {
                if (item.type === 'dir') {
                    this.$root.paths.push(item.name);
                    this.$root.currentPath += (this.$root.currentPath ? '/' : '') + item.name;
                    ajax.get(`/list/${item.path}`).then(files => this.$root.files = files);
                } else {
                    this.$root.videoPath = '/video/' + item.path;
                    // this.$root.videoType = ''; // todo mime
                    this.$root.showVideo = true;
                }
            }
        }
    };
</script>