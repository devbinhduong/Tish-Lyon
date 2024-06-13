import PageManager from './page-manager';
import utils from '@bigcommerce/stencil-utils';
import featuredBlogPost from './custom/featuredBlogPost';

export default class Blog extends PageManager {
    constructor(context) {
        super(context);
    }

	onReady() {
        featuredBlogPost(this.context);
    }

}