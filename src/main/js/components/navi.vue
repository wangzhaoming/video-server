<template>
    <div class="navi">
        <span class="dir" @click="jump($event)">
            <img class="svg" src="../img/home.svg" alt="首页">
        </span>
        <template v-for="(path, i) in paths">
            <span class="dir" @click="jump($event)" :data-path="getPath(i)">{{path}}</span>
        </template>
    </div>
</template>

<script>
    import ajax from '../ajax';

    export default {
        props: ['paths'],
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
                if (this.$root.currentPath === target) {
                    return;
                }

                ajax.get(`/list/${target}`).then(files => this.$root.files = files);
                this.$root.paths = target ? target.split('/') : [];
                this.$root.currentPath = target;
            }
        }
    };
</script>