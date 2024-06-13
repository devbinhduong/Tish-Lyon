export default function(context) {
    const token = context.token;

    function getBlog(tag) {
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
                            content {
                                blog {
                                    name
                                    description
                                    path
                                    posts (filters: {tags:["`+tag+`"]}) {
                                        edges {
                                            node {
                                                entityId
                                                name
                                                author
                                                tags
                                                htmlBody
                                                plainTextSummary (characterLimit: 100)
                                                path
                                                thumbnailImage {
                                                    url (width: 1296, height: 1620)
                                                    urlOriginal
                                                    altText
                                                    isDefault
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                `
            }),
        })

        .then(res => res.json())
        .then(res => res.data);
    }

    function renderPostByTag() {
        const limitPost = 1;
        const futuredPostContain = document.querySelector(".sectionFuturePost__wrapper");
        const tag = "Featured";

        let count = 0;

        const insertPostHtml = (post) => {
            const postHtml = `
                <div class="postItem">
                    <div class="postItem__left">
                        <div class="postItem__content">
                            <p class="postItem__subHeading uppercase">Tish Tips Featured post</p>
                            <h3 class="title">
                                <a href="${post.path}" class="" style="-webkit-box-orient: vertical;">
                                    <span>${post.name}</span>
                                </a>
                            </h3>

                            <p class="desc">
                                ${post.plainTextSummary}&hellip;
                            </p>

                            <a class="readMore hover-link-2 uppercase" href="${post.path}" aria-label="Link to ${post.name}">
                                Read more
                            </a>
                        </div>
                    </div>
                    <div class="postItem__right">
                        <a class="postItem__image" href="${post.path}">
                            <img src="${post.thumbnailImage.url}" alt="${post.thumbnailImage.altText}">
                        </a>
                    </div>
                </div>
            `;

            futuredPostContain.insertAdjacentHTML('beforeend', postHtml);
            count++;
        };

        const getPostsByTag = (tag) => {
            return getBlog(tag).then(data => {
                const posts = data.site.content.blog.posts.edges;
    
                for (let i = 0; i < posts.length; i++) {
                    if (count < limitPost) {
                        const post = posts[i].node;
                        insertPostHtml(post);
                    }
                }
    
                return count;
            });
        };

        getPostsByTag(tag);
    }

    renderPostByTag();
}