import PageManager from './page-manager';

export default class Home extends PageManager {
    constructor(context) {
        super(context);
        this.check_JS_load = true;
    }

    onReady() {
        this.eventLoad();
    }

    loadFunction() {
        const themeSettings = this.context.themeSettings;

        if (this.check_JS_load) {
            this.check_JS_load = false;

            if(themeSettings.enable_header_layout_2 && window.innerWidth > 1024) {
                this.hoverHomeMenu();
            }
        }
    }

    eventLoad() {
        const events = ['keydown', 'mousemove', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, () => {
                this.loadFunction();
            });
        });
    }

    hoverHomeMenu() {
        const navPages = document.querySelector(".navPages-container .navPages"),
            header = document.querySelector(".header.header-layout-2");

        if(!navPages || !header) return;

        navPages.addEventListener('mouseover', (e) => {
            header.classList.add('is-visible');
        });

        navPages.addEventListener('mouseleave', (e) => {
            header.classList.remove('is-visible');
        });
    }
}
