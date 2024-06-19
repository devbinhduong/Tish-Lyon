import PageManager from './page-manager';
import utils from '@bigcommerce/stencil-utils';

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

            this.homeProductsListIDCarousel();

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

    // * ------ Home Product List Id ------
    homeProductsListIDCarousel() {
        var $options;

        $(document).ready(function () {
            const tScroll = $(this).scrollTop();

            homeListId(tScroll);
        });

        function homeListId(tScroll) {
            if ($('.productsByListId[data-list-id]').length > 0) {
                $('.productsByListId[data-list-id]').each((index, element) => {
                    let thisOffetTop =
                        $(element).offset().top - screen.height * 1.5;

                    if (!$(element).hasClass('is-loaded')) {
                        $(element).addClass('is-loaded');

                        var $prodWrapId = $(element).attr('id'),
                            $wrap,
                            $listId = $(element).data('list-id');

                        var homeProColumn = $(element).parents('.product-block').data('columns');

                        var dots = $(element).parents('.product-block').data('dots');

                        var limit = $(element).parents('.product-block').data('limit');

                        if ($(element).find('.productCarouselCustom').length > 0) {
                            $wrap = $(element).find('.productCarouselCustom');
                            $options = {
                                template:
                                    'custom/products/custom-product-block',
                            };
                        }

                        if (!$('#product-by-list-' +$prodWrapId +' .productCarouselCustom .productCarousel-slide').length) {
                            if ($listId.length > 1) {
                                loadListID($listId, $options, $wrap, homeProColumn, dots, limit);
                            } else {
                                loadListID($($listId), $options, $wrap, homeProColumn, dots, limit);
                            }
                        }
                    }
                });
            }
        }

        function loadListID(id, options, wrap, homeProColumn, dots, limit) {
            if (id.length <= 1) {
                var arr = id;
            } else {
                var arr = id.split(',');
            }

            if (id.length > homeProColumn) {
                var list = arr.slice(0, parseInt(limit));
            } else {
                var list = arr;
            }

            var num = 0;

            var isHideLoading = true;

            for (var i = 0; i <= list.length; i++) {
                var $prodId = list[i];

                if ($prodId != undefined) {
                    utils.api.product.getById(
                        $prodId,
                        options,
                        (err, response) => {
                            let hasProd = $(response)
                                .find('.card')
                                .data('product-id');
                            if (
                                hasProd != undefined &&
                                hasProd != '' &&
                                hasProd != null &&
                                !$(response).find('.page-content--err').length
                            ) {
                                if (wrap.hasClass('slick-slider')) {
                                    wrap.slick('unslick');
                                    wrap.append(response);
                                } else {
                                    if(isHideLoading) {
                                        wrap.parents('.productsByListId[data-list-id]')
                                        .find('.custom_productLoading')
                                        .remove();

                                        isHideLoading = false;
                                        
                                    }

                                    wrap.append(response);
                                }
                            }

                            num++;

                            if (num == list.length) {
                                wrap.parents('.productsByListId[data-list-id]').addClass('show');
                                if (wrap.hasClass('productCarouselCustom')) {
                                    slickCarouselListId(wrap,homeProColumn,dots);
                                }
                                return;
                            }
                        }
                    );
                }
            }
        }

        function slickCarouselListId($wrap, homeProColumn, dots) {
            $wrap.slick({
                infinite: false,
                slidesToShow: 1.3,
                slidesToScroll: 1,
                dots: false,
                arrows: true,
                mobileFirst: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3.5,
                            slidesToScroll: 1
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2.5,
                            slidesToScroll: 1
                        },
                    },
                    {
                        breakpoint: 551,
                        settings: {
                            slidesToShow: 1.5,
                            slidesToScroll: 1
                        },
                    },
                ],
            });
        }
    }
}
