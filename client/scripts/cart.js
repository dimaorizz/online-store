document.querySelectorAll('.delete-item').forEach(button => button.addEventListener('click', deleteItem))

function deleteItem(e){
    let itemId = e.target.getAttribute('data-id')
    if(itemId === null) {
        return
    } else {
        return fetch(`/cart/${itemId}`, {method: 'DELETE'}).catch((e) => console.log(e))
    }
}