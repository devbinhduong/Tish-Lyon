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
}