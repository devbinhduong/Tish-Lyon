import PageManager from './page-manager';
import utils from '@bigcommerce/stencil-utils';

export default class Post extends PageManager {
    constructor(context) {
        super(context);
    }

	onReady() {
        this.getRecentlyPost();
        this.sharePost();
    }

    getRecentlyPost() {
        const url = `/blog/`;
        const currentURL = window.location.pathname;

        utils.api.getPage(url, { template: 'blog/recently-post' }, (err, response) => {
            if (err) {
                throw new Error(err);
            }

            const $responseClone = $(response);
            const $postItem = $responseClone.find('.recentPosts__item');

            $postItem.each(function() {
                const $this = $(this);
                const postURL = $this.attr('href');

                if (postURL === currentURL) {
                    $this.remove();
                }
            });

            $('.recentPosts__sidebar').html($responseClone);
        });
    }

    sharePost() {
        const shareURL = window.location.href;
        const shareButton = document.querySelector(".meta__share");

        if(!shareButton) return;

        shareButton.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: shareURL
                })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
            }
        });

    }
}