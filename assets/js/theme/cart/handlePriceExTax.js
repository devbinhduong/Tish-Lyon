export default function(context) {

    function getDataCurrency(context) {
        const token = context.token;
        const currencyCode = document.querySelector('.body').getAttribute('data-currency-code');
    
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
                                currency (currencyCode: `+currencyCode+`) {
                                    display {
                                        symbol
                                        symbolPlacement
                                    }
                                }
                            }
                        }`
                    }),
                }).then(res => res.json())
                .then(res => res.data);
    }
    
    function renderCurrencyDisplay(context) {
        getDataCurrency(context).then(data => {
            const symbol = data.site.currency.display.symbol;
            const symbolPlacement = data.site.currency.display.symbolPlacement;
    
            caclulatePriceExTaxItem(symbol, symbolPlacement);
            caclulatePriceExTaxTotal(symbol, symbolPlacement);
        });
    }
    
    
    function caclulatePriceExTaxItem(symbol, symbolPlacement) {
        const cartTax = document.querySelector("[data-cart-tax]").getAttribute("data-cart-tax");
        const cartTotalIncTax = document.querySelector("[data-cart-incTax]").getAttribute("data-cart-incTax");
    
        if (!cartTax || !cartTotalIncTax) return;
    
        const taxRate = parseFloat(cartTax) / parseFloat(cartTotalIncTax);
    
        let itemPrices = document.querySelectorAll("[data-item-price]");
    
        for(let itemPrice of itemPrices) {
            const priceWithTax = parseFloat(itemPrice.getAttribute("data-item-price"));
    
            if (priceWithTax) {
                const priceWithoutTax = (priceWithTax - (priceWithTax * taxRate)).toFixed(2);
                const priceWithoutTaxTmp = `<span class="price price--withoutTax">${symbolPlacement === 'LEFT' ? symbol + priceWithoutTax : priceWithoutTax + symbol} exc. VAT |</span>`;
                const currentItem = itemPrice.closest(".cart-item");
                const priceWithoutTaxElement = currentItem.querySelector(".cartItemPriceExTax");
    
                if(priceWithoutTaxElement) {
                    priceWithoutTaxElement.insertAdjacentHTML("beforeend", priceWithoutTaxTmp);
                }
            }
        }
    }
    
    function caclulatePriceExTaxTotal(symbol, symbolPlacement) {
        const cartTax = document.querySelector("[data-cart-tax]").getAttribute("data-cart-tax");
        const cartTotalIncTax = document.querySelector("[data-cart-incTax]").getAttribute("data-cart-incTax");
    
        if(!cartTax || !cartTotalIncTax) return;
    
        const cartTotalExTax = parseFloat(cartTotalIncTax) - parseFloat(cartTax);
        const cartTotalExTaxTmp = `<span>${symbolPlacement === 'LEFT' ? symbol + cartTotalExTax.toFixed(2) : cartTotalExTax.toFixed(2) + symbol} exc. VAT |</span>`;
        const totalElement = document.querySelector(".cartTotalPriceExTax");
    
        if(totalElement) {
            totalElement.insertAdjacentHTML("beforeend", cartTotalExTaxTmp);
        }
    
    }

    renderCurrencyDisplay(context);
}