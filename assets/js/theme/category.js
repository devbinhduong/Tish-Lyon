import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';

import customAddOptionForProduct from './custom/customAddOptionForProduct';
import countFacetedFilter from './custom/countFacetedFilter';
import handleFilterSort from './custom/handleFilterSort';

export default class Category extends CatalogPage {
    constructor(context) {
        super(context);
        this.validationDictionary = createTranslationDictionary(context);
    }

    setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
        $element.attr({
            role: roleType,
            'aria-live': ariaLiveStatus,
        });
    }

    makeShopByPriceFilterAccessible() {
        if (!$('[data-shop-by-price]').length) return;

        if ($('.navList-action').hasClass('is-active')) {
            $('a.navList-action.is-active').focus();
        }

        $('a.navList-action').on('click', () => this.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive'));
    }

    onReady() {
        this.arrangeFocusOnSortBy();

        $('[data-button-type="add-cart"]').on('click', (e) => this.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite'));

        this.makeShopByPriceFilterAccessible();

        compareProducts(this.context);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        }

        if (!$('#facetedSearch').length) {
            // Refresh range view when shop-by-price enabled
            const urlParams = new URLSearchParams(window.location.search);

            if (urlParams.has('search_query')) {
                $('.reset-filters').show();
            }

            $('input[name="price_min"]').attr('value', urlParams.get('price_min'));
            $('input[name="price_max"]').attr('value', urlParams.get('price_max'));
        }

        $('a.reset-btn').on('click', () => this.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite'));

        this.ariaNotifyNoProducts();

        this.loadOptionForProductCard(this.context);

        window.addEventListener('scroll', (e) => {
            const scrollY = window.scrollY;

            this.productListingNavFixed(scrollY);
        });

        this.hoverHomeMenu();
        countFacetedFilter();
        handleFilterSort();
    }

    ariaNotifyNoProducts() {
        const $noProductsMessage = $('[data-no-products-notification]');
        if ($noProductsMessage.length) {
            $noProductsMessage.focus();
        }
    }

    initFacetedSearch() {
        const {
            price_min_evaluation: onMinPriceError,
            price_max_evaluation: onMaxPriceError,
            price_min_not_entered: minPriceNotEntered,
            price_max_not_entered: maxPriceNotEntered,
            price_invalid_value: onInvalidPrice,
        } = this.validationDictionary;
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('body').triggerHandler('compareReset');

            if($('#product-listing-container .product').length > 0){
                customAddOptionForProduct(this.context, 'product-listing-container');
            }

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        }, {
            validationErrorMessages: {
                onMinPriceError,
                onMaxPriceError,
                minPriceNotEntered,
                maxPriceNotEntered,
                onInvalidPrice,
            },
        });
    }

    loadOptionForProductCard(context) {
        if($('#product-listing-container .product').length > 0){
            customAddOptionForProduct(context, 'product-listing-container');
        }
    }

    productListingNavFixed(scrollY) {
        const productListingNav = document.querySelector(".productListingPage__nav");
        const headerHeight = document.querySelector(".header").offsetHeight
        
        if(!productListingNav) return;

        if (scrollY > headerHeight) {
            productListingNav.style.top = `${headerHeight}px`;
        };
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
}
