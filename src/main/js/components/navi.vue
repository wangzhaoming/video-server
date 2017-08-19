<script>
    import ajax from '../ajax';

    export default {
        render(h) {
            let child = [
                h('span', {
                    'class': 'dir',
                    on: {
                        click: this.jump
                    }
                }, [
                    h('img', {
                        'class': 'svg',
                        attrs: {
                            src: '../img/home.svg'
                        }
                    })
                ])
            ];

            let children = [];
            for (let i = 1; i <= Math.min(3, this.paths.length); i++) {
                if (i === 3 && this.paths.length > 3) {
                    children.unshift(h('span', {
                        'class': 'dir',
                        attrs: {
                            'data-path': '...'
                        },
                        domProps: {
                            textContent: '...'
                        }
                    }));
                } else {
                    children.unshift(h('span', {
                        'class': 'dir',
                        on: {
                            click: this.jump
                        },
                        attrs: {
                            'data-path': this.getPath(this.paths.length - i)
                        },
                        domProps: {
                            textContent: this.paths[this.paths.length - i]
                        }
                    }));
                }
            }

            child = child.concat(children);

            return h('div', {
                'class': 'navi'
            }, child);
        },
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

                if (target === '...') {
                    return;
                }

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