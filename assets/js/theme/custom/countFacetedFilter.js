export default function countFacetedFilter() {
    let filterResults = document.querySelectorAll(".facetedSearch-refineFilters.has-result ul li").length;

    let countTextList = document.querySelectorAll(".popout__toggleable-text .filter-count");

    for(let countItem of  countTextList) {
        if(filterResults == 0) {
            countItem.classList.add("hidden");
        } else {
            countItem.classList.remove("hidden");
        }

        countItem.textContent = `(${filterResults})`;
    }

    // * ------ Count Search Count Each Filter Block ------

    const blockFilters = document.querySelectorAll('.accordion .accordion-block');

    blockFilters.forEach((item) => {
        const itemList = item.querySelectorAll('.navList-action');
        
        let count = 0;
        
        itemList.forEach((item) => {
            if (item.classList.contains('is-selected')) {
                count++;
            }
        });
        
        const itemCount = item.querySelector('.filterTab__count');
        
        if(count == 0) {
            itemCount.classList.add("hidden");
        } else {
            itemCount.classList.remove("hidden");
        }
        
        itemCount.textContent = `(${count})`;
    });

}