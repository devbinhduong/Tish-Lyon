export default function () {
    function checkAcceptPolicy() {
        let policyCheckbox = document.querySelector('.policy__checkbox input[type="checkbox"]'),
            checkOutButton = document.querySelector('.previewCartAction-checkout [data-primary-checkout-now-action]');

        if (policyCheckbox && checkOutButton) {

            if(policyCheckbox.checked) {
                checkOutButton.classList.remove('button--disabled');
            }

            policyCheckbox.addEventListener('change', function () {
                if (this.checked) {
                    checkOutButton.classList.remove('button--disabled');
                } else {
                    checkOutButton.classList.add('button--disabled');
                }
            });
        }
    }

    setTimeout(() => {
        checkAcceptPolicy();
    }, 3000)
}