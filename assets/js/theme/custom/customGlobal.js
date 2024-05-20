import utils from '@bigcommerce/stencil-utils';
import modalFactory from '../global/modal';
import { load } from 'webfontloader';
import event from '../global/jquery-migrate/event';
import { forEach, head } from 'lodash';

import megaMenuEditor from './megaMenuEditor';

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
        }
    }

    function eventLoad(){
        /* Load when DOM ready */
        window.addEventListener('load', (e) =>{

            /* Global Slick Slider */
            const sectionSlicks = document.querySelectorAll('.section-slick');
            if(sectionSlicks.length > 0) {
                for(let i = 0; i < sectionSlicks.length; i++) {
                    const sectionSlick = sectionSlicks[i];
                    const sectionSlickOptions = sectionSlick.getAttribute('data-slick-options');
                    if(sectionSlickOptions) {
                        const options = JSON.parse(sectionSlickOptions);
                        $(sectionSlick).slick(options);
                    }
                }
            }

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
}