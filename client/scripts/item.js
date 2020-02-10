document.querySelectorAll('.itm').forEach(element => {
    element.addEventListener('click', addItem)
})

function addItem(e) {
    let itemId = e.target.getAttribute('data-id')
    if(itemId === null) {
        return
    } else {
        return fetch(`/cart/${itemId}`, {method: 'POST'}).then(res => res.json)
    }
}
