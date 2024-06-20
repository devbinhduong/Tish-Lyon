import utils from '@bigcommerce/stencil-utils';
import modalFactory from '../global/modal';
import { load } from 'webfontloader';
import event from '../global/jquery-migrate/event';
import { forEach, head, map } from 'lodash';

import Aos from 'aos';

import megaMenuEditor from './megaMenuEditor';
import { data } from 'jquery';

export default function(context) {
    const themeSettings = context.themeSettings;

    /* Scroll position */
    var scroll_position = window.scrollY;

    var check_JS_load = true;

    /* Contains all functions  that are needed to be executed after JS is loaded */
    function loadFunction () {
        if(check_JS_load) {
            check_JS_load = false;
            const wWidth = window.innerWidth;

            /* Add global function here */
            closeSidebar();
            clickOverlay();

            /* Mega Menu Editor */
            megaMenuEditor(context);
            activeMenuMobile();
            hoverMenu();
            openSearchDropdown();
            getScrollbarWidth();
            loadFindAStoreMap();
            toggleSidebarProductListing();
            hideCustomSidebar2();
            
            setTimeout(() => {
                cardOptionsEvent();
                showOptions();
            }, 1000);

            toggleContent();
            homeProductsListIDGrid();

            /* AOS */
            Aos.init();
        }
    }

    function eventLoad(){
        /* Load when DOM ready */
        window.addEventListener('load', (e) =>{
            /* Load Section when scroll */
            sectionLoad();
        });

        /* Load when scroll */
        window.addEventListener('scroll', (e) => {
            scroll_position = window.scrollY;
            headerSticky(scroll_position);
        });

        /* Load when user action on site */
        ['keydown', 'mousemove', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => {
                loadFunction();
            });
        });

        if(document.body.classList.contains('storeLocator')) {
            readMapdata();
        }

        /* Load when resize */
        window.addEventListener('resize', (e) => {});
    }
    eventLoad();

    /* Hide all Sidebar */
    function hideAllSidebar() {
        const body = document.body,
            menuMobileIcon = document.querySelector('.mobileMenu-toggle'),
            searchMobileButton = document.querySelector("[data-search='quickSearch']"),
            pageSidebar = document.querySelector('.page-sidebar'),
            pageSidebarMobile = document.querySelector('.page-sidebar-mobile');

        /* Hide menu sidebar */
        if(body.classList.contains('has-activeNavPages')) {
            menuMobileIcon.click();
        }

        searchMobileButton.classList.remove('is-open');
        body.classList.remove('openSearchMobile');
        body.classList.remove('openSearchDropdown2');
        body.classList.remove('openSidebar');
        body.classList.remove('openProductListingSidebar');
        pageSidebar?.classList.remove('is-open');
        pageSidebarMobile?.classList.remove('is-open');

    }

    /* Close sidebar */
    function closeSidebar() {
        const closeButtons = document.querySelectorAll('.custom-sidebar-close');
        if(!closeButtons) return;
        
        for(let i = 0; i < closeButtons.length; i++) {
            closeButtons[i].addEventListener('click', (e) => {
                e.preventDefault();
                hideAllSidebar();
            });
        }
    }

    function clickOverlay() {
        const backgroundOverlay = document.querySelector('.background-overlay');
        if(!backgroundOverlay) return;

        backgroundOverlay.addEventListener('click', (e) => {
            hideAllSidebar();
        });
    }

    /* Custom Animate */
    function customAnimate(section) {
        if(section.matches('.animate-loaded')) return;
        section.classList.add('animate-loaded');
        section.classList.add('animated');
    }

    /* Global Init Slick Slider */
    function globalInitSlickSlider(section) {
        const slickOptions = section.getAttribute('data-slick-options');
        if(!slickOptions) return;

        const options = JSON.parse(slickOptions);
        $(section).slick(options);
    }

    // * ------ Add Animate for first section before action on site ------
    function addAOSManually(section) {
        const aosItems = section.querySelectorAll('[data-aos]');

        if(!aosItems) return;

        aosItems.forEach(item => {
            item.classList.add('aos-animate');
        });
    }

    function sectionLoad() {
        const handler = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const section = entry.target;
                    const sectionType = section.getAttribute('data-section-load');

                    switch(sectionType) {
                        case 'animation':
                            customAnimate(section);
                            break;

                        case 'slick-slider':
                            if(section.classList.contains('slick-initialized')) return;
                            globalInitSlickSlider(section);
                            break;

                        case 'check-aos':
                            if(!check_JS_load) return;

                            addAOSManually(section);
                            break;
                        
                        default:
                            break;
                    }
                }
            });
        }

        const sections = document.querySelectorAll('[data-section-load]'),
        options = {
            threshold: .05
        };

        if(!sections) return;

        const observer = new IntersectionObserver(handler, options);

        sections.forEach(section => {
            observer.observe(section);
        });
    }


    function activeMenuMobile() {
        var menuPc = document.querySelector('#menu .navPages-list:not(.navPages-list--user)'),
            menuMobile = document.querySelector('#custom-menu-mobile .navPages-list:not(.navPages-list--user)'),
            menuMobileToggle = document.querySelector('.mobileMenu-toggle');

        if (window.innerWidth <= 1024) {
            menuMobileToggle.addEventListener('click', function(event) {
                if (menuPc) {
                    if (!menuMobile.children.length) {
                        while (menuPc.children.length > 0) {
                            menuMobile.appendChild(menuPc.children[0]);
                        }
                    }
                }
            });
        }

    }


    function hoverMenu () {
        const menuItemList = document.querySelectorAll('.navPages-list:not(.navPages-list--user) > .navPages-item.has-dropdown');

        if(window.innerWidth > 1024 && menuItemList.length) {
            menuItemList.forEach(menuItem => {
                menuItem.addEventListener('mouseover', (e) => {
                    document.body.classList.add('openMenuPC');
                    setTimeout(() => {
                        menuItem.classList.add('animated');
                    }, 20);
                });

                menuItem.addEventListener('mouseleave', (e) => {
                    document.body.classList.remove('openMenuPC');
                    setTimeout(() => {
                        menuItem.classList.remove('animated');
                    }, 20);
                });
            });
        }
    }

    function headerSticky(scroll_position) {
        const header = document.querySelector('.header');

        if(scroll_position > 2 ) {
            header.classList.add('is-sticky');
        } else {
            header.classList.remove('is-sticky');
        }
    }

    function openSearchDropdown() {
        const body = document.body;
        const closeButton = document.querySelector('.search-popdown__close__button');
        const headerSearchIcons = document.querySelectorAll(".headerSearch__button");


        if (!headerSearchIcons) return;

        for(let i = 0; i < headerSearchIcons.length; i++) {
            headerSearchIcons[i].addEventListener('click', (e) => {
                e.preventDefault();
                body.classList.toggle('openSearchDropdown2');
            });
        }

        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            body.classList.remove('openSearchDropdown2');
        });
    }

    function getScrollbarWidth() {
        const width = window.innerWidth - document.documentElement.clientWidth;
      
        if (width > 17) return;
        document.documentElement.style.setProperty('--scrollbar-width', `${width}px`);
    }

    function readMapdata() {
        const mapContainer = document.querySelector(".address__list");

        mapData.forEach(data => {
            const mapElement = document.createElement("div");
            mapElement.classList.add("address__item");
            mapElement.setAttribute("data-map", data.embedMap);
            mapElement.innerHTML = `
                <h2 class="title">${data.title}</h2>
                ${data.Address ? `<div class="text">${data.Address}</div>` : ''}
                ${data.phone ? `<a class="hover-link-2" href="tel:${data.phone}" class="phone">${data.phone}</a>` : ''}
                ${data.mail ? `<a class="hover-link-2" href="mailto:${data.mail}" class="mail">${data.mail}</a>` : ''}
                ${data.siteLink ? `<a class="hover-link-2" href="${data.siteLink}" class="website">${data.siteName}</a>` : ''}
            `;

            mapContainer.appendChild(mapElement);
        });

        // * ------ Active first item ------
        const mapView = document.getElementById("storeLocator__map");
        const firstItem = mapContainer.querySelector(".address__item");
        firstItem.classList.add("is-active");
        mapView.innerHTML = firstItem.getAttribute('data-map');
    }


    function loadFindAStoreMap() {
        const mapView = document.getElementById("storeLocator__map");
        const dataMapList = document.querySelectorAll(".storeLocator__address .address__item");

        if (!mapView || !dataMapList) return;

        dataMapList.forEach(dataMapItem => {
            dataMapItem.addEventListener('click', (e) => {
                const dataMap = dataMapItem.getAttribute('data-map');

                if (dataMapItem.classList.contains('is-active')) return;

                dataMapList.forEach(item => {
                    item.classList.remove('is-active');
                });
                dataMapItem.classList.add('is-active');

                if (!dataMap) return;
                mapView.classList.add('map-loading');

                mapView.innerHTML = dataMap;

                setTimeout(() => {
                    mapView.classList.remove('map-loading');
                }, 1000);
            });
        });
    }

    function toggleSidebarProductListing() {
        const filterButton = document.querySelector('.popout--group .popout__toggle');
        const filterSidebar = document.querySelector(".productListingPage__sidebar");
        const sortButton = document.querySelector('.popout--sort .popout__toggle');

        if (!filterButton || !filterSidebar) return;

        filterButton.addEventListener('click', (e) => {
            e.preventDefault();
            filterButton.getAttribute('aria-expanded') === 'true' ? filterButton.setAttribute('aria-expanded', 'false') : filterButton.setAttribute('aria-expanded', 'true');
            filterSidebar.classList.toggle('is-show');
            document.body.classList.toggle('openProductListingSidebar');
        });

        if (!sortButton) return;

        document.addEventListener('click', (e) => {
            if (!sortButton.parentElement.contains(e.target)) {
                sortButton.parentElement.classList.remove('is-active');
                sortButton.setAttribute('aria-expanded', 'false');

            } else {
                sortButton.parentElement.classList.toggle('is-active');
                sortButton.getAttribute('aria-expanded') === 'true' ? sortButton.setAttribute('aria-expanded', 'false') : sortButton.setAttribute('aria-expanded', 'true');
            }
        });
        
        const sortDropdownList = document.querySelectorAll('.popout--sort .form-select option');

        if (!sortDropdownList) return;

        sortDropdownList.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                sortButton.parentElement.classList.remove('is-active');
            });
        });
    }

    function hideCustomSidebar2() {
        const closeButton = document.querySelector('.collection__sidebar__close');
        const sidebar = document.querySelector('.productListingPage__sidebar ');

        if (!closeButton) return;

        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.remove('is-show');
            document.body.classList.remove('openProductListingSidebar');
        });
    }

    function cardOptionsEvent() {
        const optionsList = document.querySelectorAll('.card-option .form-option-swatch');

        if (!optionsList) return;

        for (let option of optionsList) {
            option.addEventListener('mouseenter', (e) => {
                const card = option.closest('.card');
                const cardImageWrapper = card.querySelector('.card-img-container-options');
                const cardImage = cardImageWrapper.querySelector('img');
                const optionImage = option.getAttribute('data-image');

                cardImage.setAttribute('src', optionImage);
                cardImageWrapper.classList.add('is-visible');
            });

            option.addEventListener('mouseleave', (e) => {
                const card = option.closest('.card');
                const cardImageWrapper = card.querySelector('.card-img-container-options');
                const cardImage = cardImageWrapper.querySelector('img');

                cardImage.setAttribute('src', '');
                cardImageWrapper.classList.remove('is-visible');
            });
        }
    }

    function showOptions() {
        const countOptions = document.querySelectorAll('.customCard__options');

        if (!countOptions) return;

        countOptions.forEach(option => {
            option.addEventListener('mouseenter', (e) => {
                e.stopPropagation();

                const card = option.closest('.card');
                const optionForm = card.querySelector('.card-option');
                optionForm.classList.add('is-visible');
            });

            option.addEventListener('mouseleave', (e) => {
                e.stopPropagation();

                const card = option.closest('.card');
                const optionForm = card.querySelector('.card-option');
                optionForm.classList.remove('is-visible');
            });
        });
    }

    function toggleContent() {
        const $toggleTitle = $('.toggle__title');

        if (!$toggleTitle) return;

        $toggleTitle.on('click', (e) => {
            e.preventDefault();

            const $target = $(e.currentTarget);
            const $toggleContent = $target.next();

            $target.toggleClass('is-active');

            if ($target.hasClass('is-active')) {
                $toggleContent.slideDown(400);  
            }
            else {
                $toggleContent.slideUp(400);
            }
        });
    }

    function homeProductsListIDGrid() {
        var $options;

        $(document).ready(function () {
            const tScroll = $(this).scrollTop();

            homeListId(tScroll);
        });

        function homeListId(tScroll) {
            if ($('.productsByListId2[data-list-id-2]').length > 0) {
                $('.productsByListId2[data-list-id-2]').each((index, element) => {
                    let thisOffetTop =
                        $(element).offset().top - screen.height * 1.5;

                    if (!$(element).hasClass('is-loaded')) {
                        $(element).addClass('is-loaded');

                        var $prodWrapId = $(element).attr('id'),
                            $wrap,
                            $listId = $(element).data('list-id-2');

                        if ($(element).find('.productGridCustom').length > 0) {
                            $wrap = $(element).find('.productGridCustom');
                            $options = {
                                template:
                                    'custom/products/custom-product-block',
                            };
                        }

                        if (!$('#product-by-list-' +$prodWrapId +' .productGridCustom .productCarousel-slide').length) {
                            if ($listId.length > 1) {
                                loadListID($listId, $options, $wrap);

                            } else {
                                loadListID($($listId), $options, $wrap);
                            }
                        }
                    }
                });
            }
        }

        function loadListID(id, options, wrap) {
            if (id.length <= 1) {
                var arr = id;
            } else {
                var arr = id.split(',');
            }

            var list = arr;

            var num = 0;

            var isHideLoading = true;

            const shopLook = document.querySelector(".shopLook")

            for (var i = 0; i <= list.length; i++) {
                var $prodId = list[i];

                if ($prodId != undefined) {
                    utils.api.product.getById($prodId, options, (err, response) => {
                        let hasProd = $(response).find('.card').data('product-id');
                        if (hasProd != undefined && hasProd != '' && hasProd != null && !$(response).find('.page-content--err').length) {
                            if (isHideLoading) {
                                wrap.parents('.productsByListId2[data-list-id-2]')
                                    .find('.custom_productLoading')
                                    .remove();

                                isHideLoading = false;
                            }
                            wrap.append(response);
                        }

                        num++;

                        if (num === list.length) {
                            shopLook.classList.add("loaded-products");
                            handleScrollLookbook();
                            activeLookbookMobile();
                        }
                    });
                }
            }
        }

        function handleScrollLookbook() {
            const dotList = document.querySelectorAll(".look__dot__button");

            if (!dotList) return;

            dotList.forEach((dot) => {
                dot.addEventListener("click", (e) => {
                    const dataThumb = dot.getAttribute("data-slider-thumb");

                    const item = document.querySelector(`.productCarousel-slide .card[data-product-id="${dataThumb}"]`);

                    if (!item) return;

                    const itemOffset = item.offsetTop;

                    window.scrollTo({
                        top: itemOffset - 100,
                        behavior: "smooth",
                    });
                });
            });
        }

        function activeLookbookMobile() {
            const showLookbookButton = document.querySelector(".shopLook__actions > a");
            const lookbook = document.querySelector(".shopLook__aside");
            const lookbookClose = document.querySelector(".shopLook__close");
            const lookbookOverlay = document.querySelector(".shopLook__overlay");

            if (!showLookbookButton) return;

            showLookbookButton.addEventListener("click", (e) => {
                e.preventDefault();
                lookbook.classList.add("is-open");
            });

            lookbookClose.addEventListener("click", (e) => {
                e.preventDefault();
                lookbook.classList.remove("is-open");
            });

            lookbookOverlay.addEventListener("click", (e) => {
                lookbook.classList.remove("is-open");
            });
        }
    }
}