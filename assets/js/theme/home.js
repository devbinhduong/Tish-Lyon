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

            if(window.innerWidth > 1024) {
                this.hoverGallerySection();
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

        this.loadScrollFunction();
    }

    hoverHomeMenu() {
        const navPageList = document.querySelectorAll(".navPages-container .navPages .navPages-item.has-dropdown"),
            header = document.querySelector(".header.header-layout-2");

        if(!navPageList || !header) return;

        navPageList.forEach((navPage) => {
            navPage.addEventListener('mouseover', (e) => {
                header.classList.add('is-visible');
            });

            navPage.addEventListener('mouseleave', (e) => {
                header.classList.remove('is-visible');
            });
        });
    }

    hoverGallerySection() {
        const galleryTitles = document.querySelectorAll(".homeHoverBanner__title");

        if (!galleryTitles) return;

        galleryTitles.forEach((title) => {
            title.addEventListener('mouseover', (e) => {
                const parentTitle = title.closest('.homeHoverBanner__item');
                const currentVisible = document.querySelector('.homeHoverBanner__item.is-visible');

                if (!parentTitle || !currentVisible) return;

                currentVisible.classList.remove('is-visible');
                parentTitle.classList.add('is-visible');

                const titleDataText = title.textContent;

                if (currentVisible.querySelector('.homeHoverBanner__title').textContent === titleDataText) return;

                changeBannerImage(titleDataText);
            });
        });

        function changeBannerImage(dataName) {
            const bannerImageList = document.querySelectorAll('.homeHoverBanner__imageItem');

            if (!bannerImageList) return;

            bannerImageList.forEach((image) => {
                if (image.getAttribute('data-section-name') === dataName) {
                    image.classList.add('is-visible');
                } else {
                    image.classList.remove('is-visible');
                }
            });
        }
    }

    loadScrollFunction() {
        const handler = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const section = entry.target;
                    const sectionType = section.getAttribute('data-section-load');

                    switch(sectionType) {
                        case 'active-title':
                            this.changeGalleryTitle(section);
                            break;

                        default:
                            break;
                    }
                }
            });
        }

        const sections = document.querySelectorAll('[data-section-load]'),
        options = {
            threshold: 1.0
        };

        if(!sections) return;

        const observer = new IntersectionObserver(handler, options);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    changeGalleryTitle(item) {
        const name = item.getAttribute('data-section-name');

        if (!name) return;

        const currentVisible = document.querySelector(`.homeHoverBanner__item[data-title-name='${name}']`);

        if (!currentVisible) return;

        const currentItem = document.querySelector('.homeHoverBanner__item.is-visible');

        if (currentItem) {
            currentItem.classList.remove('is-visible');
        }

        currentVisible.classList.add('is-visible');
    }
}
