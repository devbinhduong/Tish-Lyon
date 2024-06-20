import PageManager from './page-manager';
import nod from './common/nod';
import forms from './common/models/forms';
import { announceInputErrorMessage } from './common/utils/form-utils';

export default class ContactUs extends PageManager {
    onReady() {
        this.registerContactFormValidation();
    }

    registerContactFormValidation() {
        const formSelector = 'form[data-contact-form]';
        const contactUsValidator = nod({
            submit: `${formSelector} input[type="submit"]`,
            tap: announceInputErrorMessage,
        });
        const $contactForm = $(formSelector);

        contactUsValidator.add([
            {
                selector: `${formSelector} input[name="contact_email"]`,
                validate: (cb, val) => {
                    const result = forms.email(val);

                    cb(result);
                },
                errorMessage: this.context.contactEmail,
            },
            {
                selector: `${formSelector} textarea[name="contact_question"]`,
                validate: (cb, val) => {
                    const result = forms.notEmpty(val);

                    cb(result);
                },
                errorMessage: this.context.contactQuestion,
            },
        ]);

        $contactForm.on('submit', event => {
            contactUsValidator.performCheck();

            event.preventDefault();

            if (contactUsValidator.areAll('valid')) {
                const currentTarget = event.currentTarget;
                const isUrgent = currentTarget.querySelector('input[name="csm_urgent"]');
                const selectOption = currentTarget.querySelector('select[name="csm_seclect"]');
                const selectLabel = currentTarget.querySelector("label.csm-label-select-form").textContent;

                let contactMessage = currentTarget.querySelector('textarea[name="contact_question"]').value;

                let message;

                if(isUrgent) {
                    message = `Message: ${contactMessage}\n  Urgent: ${isUrgent.checked ? 'Yes' : 'No'}\n ${selectLabel} : ${selectOption.value}\n\n`;
                } else {
                    message = `Message: ${contactMessage}\n  What type of business do you have? : ${selectOption.value}\n\n`;
                }

                $('#contact_question').val(message);

                $.ajax({
                    type: 'POST',
                    url: '/pages.php?action=sendContactForm',
                    data: $('.custom-form').serialize(),
                    success: function() {
                        $('.custom-form').hide();
                        $('#csm-form-results').html('<div class="alertBox alertBox--success">Thank you. We\'ve received your feedback and will respond shortly.</div>');
                    },
                });

                return;
            }
        });
    }
}
