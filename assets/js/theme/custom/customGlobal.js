import utils from '@bigcommerce/stencil-utils';
import modalFactory from '../global/modal';
import { load } from 'webfontloader';
import event from '../global/jquery-migrate/event';
import { forEach } from 'lodash';

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
            console.log("JS is loaded");

            /* Add global function here */
            closeSidebar();
            clickOverlay();
            searchFormMobile();

            if (wWidth <= 1024) {
                searchMobileClick();
            }

            /* Mega Menu Editor */
            megaMenuEditor(context);
            activeMenuMobile();
            hoverMenu();
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

    /* Search Mobile */
    function searchFormMobile() {
        const quickSearchForm = document.getElementById("quickSearch"),
            hasOnDesktop = document.querySelector('.item--quicksearch #quickSearch'),
            searchSidebarDesktop = document.querySelector('.item--quicksearch'),
            searchSidebarMobile = document.querySelector('#custom-search-mobile .custom-sidebar-wrapper');

        if(window.innerWidth <= 1024) {
            if(hasOnDesktop) {
                searchSidebarMobile.appendChild(quickSearchForm);
            } 
        } else {
            if(!hasOnDesktop) {
                searchSidebarDesktop.appendChild(quickSearchForm);
            }
        }
    }

    function searchMobileClick() {
        const body = document.body,
            searchMobileButton = document.querySelector("[data-search='quickSearch']");

        if(!searchMobileButton) return;

        searchMobileButton.addEventListener('click', (e) => {
            e.preventDefault();
            if(searchMobileButton.classList.contains('is-open')) {
                body.classList.remove('openSearchMobile');
                searchMobileButton.classList.remove('is-open');
            } else {
                body.classList.add('openSearchMobile');
                searchMobileButton.classList.add('is-open');
            }
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
                    menuItem.classList.add('animated');
                });

                menuItem.addEventListener('mouseleave', (e) => {
                    document.body.classList.remove('openMenuPC');
                    menuItem.classList.remove('animated');
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
}