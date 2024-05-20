import utils from '@bigcommerce/stencil-utils';

export default class megaMenuFunction {
    constructor() {}

    menuItem(num) {
        return {
            setMegaMenu(param) {
                param = $.extend({
                    style: '',
                    dropAlign: 'fullWidth',
                    dropWidth: '493px',
                    cateColumns: 1,
                    imageColumns: 4,
                    disabled: false,
                    bottomCates: '',
                    products:'',
                    productId: '',
                    label: '',
                    labelType: '',
                    content: '',
                    contentLeft: '',
                    contentRight: '',
                    images:'',
                    imagesTop: '',
                    imagesCustom: '',
                    imagesLeft: '',
                    imagesRight: '',
                    imageAspectRatio: '1.0',
                }, param);

                var $scope = $('.navPages-list-custom > li:nth-child('+num+')');

                if(!$scope.hasClass('navPages-item-toggle')){
                    if (param.disabled === false) {
                        const subMegaMenu = $scope.find('> .navPage-subMenu');

                        /* Custom Mega Menu Style By Mint */
                        if(param.style === 'style custom') {
                            if(!$scope.hasClass('has-megamenu')){
                                $scope.addClass('has-megamenu style-custom fullWidth');

                                if(!subMegaMenu.find('.cateArea').length){
                                    subMegaMenu.find('.container > .navPage-subMenu-list').wrap(`<div class="cateArea columns-${param.cateColumns}"></div>`);
                                }

                                if(!subMegaMenu.find('.imageArea').length){
                                    subMegaMenu.find('.container').append(`<div class="imageArea columns-${param.imageColumns}" style="--aspect-ratio: ${param.imageAspectRatio};"><div class="megamenu-right-item custom-fadeInLeft" data-step-animate="0">${param.imagesRight}</div></div>`);
                                }

                                subMegaMenu.find('.imageArea').css({
                                    'width': '100%',
                                    'max-width': param.imageAreaWidth
                                });

                                subMegaMenu.find('.cateArea').css({
                                    'width': '100%',
                                    'max-width': param.cateAreaWidth
                                });

                                subMegaMenu.addClass('customScrollbar');
                            }
                        }

                        if(param.style === 'style custom 2') {
                            if(!$scope.hasClass('has-megamenu')){
                                $scope.addClass('has-megamenu style-custom style-custom-2 fullWidth');

                                if(!subMegaMenu.find('.cateArea').length){
                                    subMegaMenu.find('.container > .navPage-subMenu-list').wrap(`<div class="cateArea columns-${param.cateColumns}"></div>`);
                                }

                                if(!subMegaMenu.find('.imageArea').length){
                                    subMegaMenu.find('.container').append(`<div class="imageArea"><div class="megamenu-right-item custom-fadeInLeft" data-step-animate="0">${param.imagesRight}</div></div>`);
                                }

                                subMegaMenu.find('.imageArea').css({
                                    'width': '100%',
                                    'max-width': param.imageAreaWidth
                                });

                                subMegaMenu.find('.cateArea').css({
                                    'width': '100%',
                                    'max-width': param.cateAreaWidth
                                });

                                subMegaMenu.addClass('customScrollbar');
                            }
                        }
                    }
                }

                return this;
            }
        }
    }
}