export default function() {
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