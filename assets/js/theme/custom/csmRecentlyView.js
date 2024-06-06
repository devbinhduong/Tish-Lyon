

export default function(context){
    const token = context.token;
    const curCode = $('.body').data('currency-code');

    function setCookie(cookieName, cookieValue, daysToExpire) {
        const date = new Date();
        date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + date.toUTCString();
        document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
    }
    
    function getCookie(cookieName) {
        const name = cookieName + '=';
        const cookies = document.cookie.split(';');
    
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return '';
    }
    

    function getProduct(arr) {
      return fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          query: `
            query MyQuery {
                site {
                    products (entityIds: [`+arr+`]) {
                      edges {
                        product: node {
                          ...ProductFields
                          }
                        }
                    }
                    currency (currencyCode: `+curCode+`) {
                        display {
                            symbol
                            symbolPlacement
                            decimalToken
                            thousandsToken
                            decimalPlaces
                        }
                    }
                }
            }
            fragment ProductFields on Product {
                id
                entityId
                name
                path
                inventory {
                    isInStock
                    hasVariantInventory
                }
                productOptions {
                    edges {
                        node {
                            entityId
                            displayName
                            isRequired
                        }
                    }
                }
                brand {
                    name
                }
                defaultImage {
                    img70px: url(width: 320)
                    altText
                }
                prices {
                    priceRange {
                        min {
                            ...MoneyFields
                        }
                        max {
                            ...MoneyFields
                        }
                    }
                    retailPrice {
                        ...MoneyFields
                    }
                    basePrice {
                        ...MoneyFields
                    }
                    price {
                        ...MoneyFields
                    }

                    savePrice {
                        ...MoneyFields
                    }
                }
            }
            fragment MoneyFields on Money {
                value
                currencyCode
            }
        `}),
    }).then(res => res.json())
       .then(res => res.data);
    }

    function formatMoney(amount, decimalPlaces, decimalSeparator, thousandSeparator) {
        const decimals = isNaN(decimalPlaces = Math.abs(decimalPlaces)) ? 2 : decimalPlaces;
        const decimalSep = decimalSeparator === undefined ? "." : decimalSeparator;
        const thousandSep = thousandSeparator === undefined ? "," : thousandSeparator;
        const sign = amount < 0 ? "-" : "";
        const integerPart = String(parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimals)));
        const firstGroupLength = integerPart.length > 3 ? integerPart.length % 3 : 0;
    
        return sign +
            (firstGroupLength ? integerPart.substr(0, firstGroupLength) + thousandSep : "") +
            integerPart.substr(firstGroupLength).replace(/(\d{3})(?=\d)/g, "$1" + thousandSep) +
            (decimals ? decimalSep + Math.abs(amount - integerPart).toFixed(decimals).slice(2) : "");
    }
    


    var RecentlyViewedProducts  = function() {
        var config = {
            itemsToShow: 3,
            itemsToStoreInMemory: 10,
            wrapperId: "recentlyViewedProducts",
            onComplete: null
        };
        var productIds = [];
        var $wrapper = null;
        var cookieManager = {
            configuration: {
                expires: context.themeSettings.csmRecentViewExpires,
                path: "/",
                domain: window.location.hostname
            },
            name: "bigcommerce_recently_viewed",
            write: function(ids) {
                setCookie(this.name, ids.join(" "), this.configuration.expires);
            },
            read: function() {
                var ids = [];
                var cookieValue = getCookie(this.name);
                if (cookieValue !== null && cookieValue !== undefined) {
                    ids = cookieValue.split(" ");
                }
                return ids;
            },
            destroy: function() {
                setCookie(this.name, null, this.configuration.expires);
            },
            remove: function(id) {
                var ids = this.read();
                var index = $.inArray(id, ids);
                if (index !== -1) {
                    ids.splice(index, 1);
                    this.write(ids);
                }
            }
        };
        var showProducts = function() {
            for (var i = 0; i < config.itemsToShow; i++) {
                var productId = productIds[i];
            }
            $wrapper.show();
            if (config.onComplete) {
                try {
                    config.onComplete();
                } catch (error) {}
            }
        };
        var fetchAndRenderProducts = function() {
            var $tempList = jQuery('#recentlyViewedListing');
            var list = productIds;
    
            if (productIds.length > 0) {
                getProduct(list).then(data => {
                    renderProduct(data.site.products.edges, data.site.currency.display, $tempList);
                    showProducts();
                });
            }
        };
        return {
            resizeImage: function(url, size) {
                if (size == null) {
                    return url;
                }
                if (size == "master") {
                    return url.replace(/http(s)?:/, "");
                }
                var match = url.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?/i);
                if (match != null && match != undefined) {
                    var parts = url.split(match[0]);
                    var extension = match[0];
                    return (parts[0] + "_" + size + extension).replace(/http(s)?:/, "");
                } else {
                    return null;
                }
            },
            showRecentlyViewed: function(options) {
                var options = options || {};
                jQuery.extend(config, options);
                productIds = cookieManager.read();
                $wrapper = jQuery("#" + config.wrapperId);
                config.itemsToShow = Math.min(productIds.length, config.itemsToShow);
                
                if (config.itemsToShow && $wrapper.length) {
                    fetchAndRenderProducts();
                }
            },
            getConfig: function() {
                return config;
            },
            clearList: function() {
                cookieManager.destroy();
            },
            recordRecentlyViewed: function(options) {
                var options = options || {};
                var productId = $('.productView').find('form[data-cart-item-add] [name="product_id"]').val();
                
                jQuery.extend(config, options);
                var ids = cookieManager.read();
                
                if (productId) {
                    var id = productId;
                    var index = jQuery.inArray(id, ids);
                    if (index === -1) {
                        ids.unshift(id);
                        ids = ids.splice(0, config.itemsToStoreInMemory);
                    } else {
                        ids.splice(index, 1);
                        ids.unshift(id);
                    }
                    cookieManager.write(ids);
                }
            }
        };
    }();

    function renderProduct(product, curDisplay, tmp) {
        if (product != undefined) {
            $.each(product, (index, element) => {
                const item = element.product,
                    symbol = curDisplay.symbol,
                    symbolPlacement = curDisplay.symbolPlacement.toLowerCase(),
                    decimalToken = curDisplay.decimalToken,
                    decimalPlaces = curDisplay.decimalPlaces,
                    thousandsToken = curDisplay.thousandsToken;
                let title, price, btnAct, img, brand;

                if ($('.body').hasClass('is-login') || context.themeSettings.restrict_to_login !== true) {
                    if (item.prices.priceRange.min.value < item.prices.priceRange.max.value && context.themeSettings.price_ranges) {
                        const priceMin = (symbolPlacement == "left" ? symbol : "") + (formatMoney(item.prices.priceRange.min.value, decimalPlaces, decimalToken, thousandsToken)) + (symbolPlacement != "left" ? symbol : "");
                        const priceMax = (symbolPlacement == "left" ? symbol : "") + (formatMoney(item.prices.priceRange.max.value, decimalPlaces, decimalToken, thousandsToken)) + (symbolPlacement != "left" ? symbol : "");

                        price = '<div class="price-section price-section--withoutTax non-sale-price--withoutTax price-none" style="display: none;">\
                                    <span data-product-non-sale-price-without-tax="" class="price price--non-sale"></span>\
                                </div>\
                                <div class="price-section price-section--withoutTax">\
                                    <span data-product-price-without-tax="" class="price price--withoutTax">'+priceMin+' - '+priceMax+'</span>\
                                </div>';
                    }
                    else {
                        const priceDef = (symbolPlacement == "left" ? symbol : "") + (formatMoney(item.prices.price.value, decimalPlaces, decimalToken, thousandsToken)) + (symbolPlacement != "left" ? symbol : "");

                        console.log("price info", item.prices);

                        if (item.prices.retailPrice == null) {
                            if (item.prices.basePrice.value > item.prices.price.value) {
                                const priceBas = (symbolPlacement == "left" ? symbol : "") + (formatMoney(item.prices.basePrice.value, decimalPlaces, decimalToken, thousandsToken)) + (symbolPlacement != "left" ? symbol : "");

                                price = '<div class="price-section price-section--withoutTax non-sale-price--withoutTax">\
                                            <span data-product-non-sale-price-without-tax="" class="price price--non-sale">'+priceBas+'</span>\
                                        </div>\
                                        <div class="price-section price-section--withoutTax">\
                                            <span data-product-price-without-tax="" class="price price--withoutTax">'+priceDef+'</span>\
                                        </div>';
                            }
                            else {
                                price = '<div class="price-section price-section--withoutTax non-sale-price--withoutTax price-none" style="display: none;">\
                                            <span data-product-non-sale-price-without-tax="" class="price price--non-sale"></span>\
                                        </div>\
                                        <div class="price-section price-section--withoutTax">\
                                            <span data-product-price-without-tax="" class="price price--withoutTax">'+priceDef+'</span>\
                                        </div>';
                            }
                        }
                        else {
                            if (item.prices.retailPrice.value > item.prices.price.value) {
                                const priceRet = (symbolPlacement == "left" ? symbol : "") + (formatMoney(item.prices.retailPrice.value, decimalPlaces, decimalToken, thousandsToken)) + (symbolPlacement != "left" ? symbol : "");
                            
                                price = '<div class="price-section price-section--withoutTax non-sale-price--withoutTax">\
                                            <span data-product-non-sale-price-without-tax="" class="price price--non-sale">'+priceRet+'</span>\
                                        </div>\
                                        <div class="price-section price-section--withoutTax">\
                                            <span data-product-price-without-tax="" class="price price--withoutTax">'+priceDef+'</span>\
                                        </div>';
                            }
                            else {
                                price = '<div class="price-section price-section--withoutTax non-sale-price--withoutTax price-none" style="display: none;">\
                                            <span data-product-non-sale-price-without-tax="" class="price price--non-sale"></span>\
                                        </div>\
                                        <div class="price-section price-section--withoutTax">\
                                            <span data-product-price-without-tax="" class="price price--withoutTax">'+priceDef+'</span>\
                                        </div>';
                            }
                        }
                    }
                }
                else {
                    price = '<p translate>Log in for pricing</p>';
                }

                if (item.inventory.isInStock == false) {
                    btnAct = '<a href="'+item.path+'" class="card_out_of_stock" disabled data-product-id="'+item.entityId+'">Out Of Stock</a>';

                }
                else if (item.productOptions.edges.length > 0) {
                    btnAct = '<a href="'+item.path+'" class="card-figcaption-link" data-product-id="'+item.entityId+'">Choose Options</a>';
                }
                else {
                    if ($('.recently-viewed-products-sidebar').data('tag-enabled') == false) {
                        btnAct = '<a href="/cart.php?action=add&product_id='+item.entityId+'" class="card-figcaption-link" data-product-id="'+item.entityId+'">Add to Cart</a>';
                    }
                    else {
                        btnAct = '<a href="/cart.php?action=add&product_id='+item.entityId+'" class="card-figcaption-link" data-product-id="'+item.entityId+'">Add to Cart</a>';
                    }
                }
                if (item.defaultImage != null) {
                    img = '<img src="'+item.defaultImage.img70px+'" alt="'+item.defaultImage.altText+'" title="'+item.defaultImage.altText+'" class="card-image" />';
                } else {
                    img = '<img src="/stencil/00000000-0000-0000-0000-000000000001/img/ProductDefault.gif" alt="Image coming soon" class="card-no-image ls-is-cached lazyloaded">';
                }
                if (item.brand != null) {
                    brand = item.brand.name;
                } else {
                    brand = '';
                }
                const html_card = `
                <div class="product">
                    <article
                        class="card
                        {{#if alternate}} card--alternate{{/if}}"
                        data-test="card-${item.entityId}"
                        data-event-type="{{event}}"
                        data-entity-id="${item.entityId}"
                        data-product-id="${item.entityId}"
                        data-position="{{position}}"
                        data-name="${item.name}" 
                        data-product-brand="{{brand.name}}"
                        data-product-price="${item.prices.price.value}"
                        data-section-load="animation"
                    >
                        <figure class="card-figure">
                            <a href="${item.path}"
                            class="card-figure__link"
                            aria-label="{{> components/products/product-info}}"
                            data-event-type="product-click"
                            >
                                <div class="card-img-container image-loader skeleton-loader">
                                    ${img}
                                </div>

                                <div class="card-img-container card-img-container-options" data-aos="img-in" data-aos-delay="0" data-aos-duration="300" data-aos-easing="ease-out-quart">
                                    <img class="lazyload" src="" data-src="" alt="">
                                </div>
                            </a>
                            <figcaption class="card-figcaption">
                                <div class="card-figcaption-body">
                                    <a
                                    href="/cart.php?action=add&amp;product_id=${item.entityId}"
                                    data-button-type="add-cart"
                                    class="button button--primary card-figcaption-button halo-add-to-cart"
                                    data-product-id="${item.entityId}"
                                    data-wait-message="Adding to Cart…"
                                    tabindex="0"
                                >
                                    Add To Cart
                                </a>
                                <span class="product-status-message aria-description--hidden">The item has been added</span>
                                </div>
                            </figcaption>
                        </figure>
                        <div class="card-body">
                            <h3 class="card-title">
                                <a aria-label=" ${item.name}"
                                href="${item.path}"
                                data-event-type="product-click"
                                >
                                    ${item.name}
                                </a>
                            </h3>

                            <div class="card-text" data-test-info-type="price">
                                <span class="card-price-lable-from custom-text">From</span>
                                ${price}
                            </div>
                        </div>
                    </article>
                </div>
                `;
                tmp.append(html_card);

            });
        }
    }
    
    $(document).ready(function(){
        RecentlyViewedProducts .recordRecentlyViewed();

        var cookieValue = getCookie("bigcommerce_recently_viewed");

        if (!(cookieValue !== null && cookieValue !== undefined && cookieValue !== "")) {
            // * ------ Handle When done have cookie ------
        }
        else {
            RecentlyViewedProducts .showRecentlyViewed({
                howManyToShow: context.themeSettings.halo_recently_viewed_products_count,
                howManyToStoreInMemory: context.themeSettings.halo_recently_viewed_products_count,
                wrapperId: 'recentlyViewedWrapper'
            });
        }
    });

}
