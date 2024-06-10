import { template } from "lodash";
import utils from '@bigcommerce/stencil-utils';

export default function (context) {
    if(!context.themeSettings.enaCalculateShipping) return;

    console.log('Calculate Free Shipping');

    let defaultMessage = `<span class="freeShipping__message--default">${context.themeSettings.calculateFreeDefault}</span>`;
    let priceRemaining = `<span data-left-to-spend="">${context.themeSettings.calculalePriceRequire}</span>`;
    let successMessage = `<span class="freeShipping__message--success hidden">${context.themeSettings.calculateFreeSuccess}</span>`;

    if(defaultMessage && priceRemaining) {
        defaultMessage = defaultMessage.replace("{{remaining}}", priceRemaining);
    }
    
    function loadFreeShippingMessage() {
        const options = {
            template: 'custom/cart/caculate-free-shipping-message-tmp'
        }

        utils.api.cart.getContent(options, (err, response) => {
            showFreeShippingMessage(response);
        });
    }

    loadFreeShippingMessage();

    function showFreeShippingMessage(message) {
        console.log(document.querySelector('.freeShipping__message'))


        let messageWrapper = document.querySelector('.freeShippingMessage__wrapper');
        messageWrapper.innerHTML = defaultMessage + successMessage;


        if($(message).length > 0) {
            $(message).find('.freeShippingMessage__text').each((index, element) => {
                if($('.condition_remaining', element).text() != "" || $('.congratulation', element).text()){
                    if(context.themeSettings.calculateFreeShippingType == 'all'){
                        showProgress(message, element);
                    } else if (context.themeSettings.calculateFreeShippingType == 'custom'){
                        var countryCode,
                            country,
                            countryList;

                        $.getScript('https://ssl.geoplugin.net/javascript.gp?k=9247556ec91c71e9', event => {
                            countryCode = geoplugin_countryCode();
                            country = $('.country', element).text();
                            countryList = country.split(",");

                            if ($.inArray(countryCode, countryList) != -1){
                                showProgress(message, element);
                            }
                        });
                    }
                }
            });
        }
    }

    function showProgress(message, scope) {
        var max_percent = 0;

        const condition_required = $('.condition_required', scope).text(),
            condition_matched = $('.condition_matched', scope).text(),
            condition_remaining = $('.condition_remaining', scope).text(),
            num_required = (condition_required != "" ? Number(condition_required.replace(/[^0-9.-]+/g,"")) : 0),
            num_matched = (condition_matched != "" ? Number(condition_matched.replace(/[^0-9.-]+/g,"")) : 0),
            num_remaining = (condition_remaining != "" ? Number(condition_remaining.replace(/[^0-9.-]+/g,"")) : 0);

        var percent = parseInt(num_matched/num_required * 100);
            percent = (percent > 100 ? 100 : percent);

        var progressBar = document.querySelector(".freeShipping__progress"),
            messageDefault = document.querySelector(".freeShipping__message--default"),
            messageCongratulation = document.querySelector(".freeShipping__message--success");       

        if(num_required == num_remaining){
            percent = 100;
        }

        if($('.congratulation', scope).text() != ""){
            percent = 100;
        }

        if(percent > max_percent){
            max_percent = percent;
        } else{
            return;
        }

        if(percent == 100){
            messageDefault.classList.add("hidden");
            messageCongratulation.classList.remove("hidden");
        } else{
            messageDefault.classList.remove("hidden");
            messageCongratulation.classList.add("hidden");
            messageDefault.querySelector("[data-left-to-spend]").textContent = condition_remaining;
        }

        progressBar.setAttribute("value", percent);
    }
}