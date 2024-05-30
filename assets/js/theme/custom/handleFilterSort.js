export default function handleFilterSort() {
    const sortKey = window.location.search.replace('?', '').split('=')[1];
    let sortSelect = document.querySelector('[data-sort-button-text]');

    if(!sortKey || !sortSelect) return;

    switch(sortKey) {
        case 'featured':
            sortSelect.textContent = 'Featured';
            break;

        case 'newest':
            sortSelect.textContent = 'Newest';    
            break;

        case 'bestselling':
            sortSelect.textContent = 'Best Selling';    
            break;

        case 'alphaasc':
            sortSelect.textContent = 'Alphabetically, A-Z';    
            break;

        case 'alphadesc':
            sortSelect.textContent = 'Alphabetically, Z-A';
            break;

        case 'avgcustomerreview':
            sortSelect.textContent = 'Average customer review';
            break;
            
        case 'priceasc':
            sortSelect.textContent = 'Price, low to high';    
            break;
            
        case 'pricedesc':
            sortSelect.textContent = 'Price, high to low';    
            break;

        case 'relevance':
            sortSelect.textContent = 'Relevance';
            break;

        default:
            sortSelect.textContent = 'Featured';
            break;
    }
}