export default function handleFilterSort() {
    const selectedItem = document.querySelector('.popout-list__option.selected'),
        sortTextList = document.querySelectorAll('.popout__toggleable-text');

    if(!selectedItem || !sortTextList) return;

    for(let text of sortTextList) {
        text.textContent = selectedItem.querySelector('.color-base').textContent;
    }
}