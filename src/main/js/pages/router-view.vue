<script>
    import routes from '../routes';

    export default {
        computed: {
            ViewComponent () {
                const matchingView = routes[this.$root.currentRoute];
                return require('../pages/' + matchingView + '.vue');
            }
        },
        render (h) {
            return h(this.ViewComponent)
        }
    };
</script>