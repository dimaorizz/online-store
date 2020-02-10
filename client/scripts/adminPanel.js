document.querySelectorAll('.delete').forEach(button => button.addEventListener('click', deleteItem))

function deleteItem(e){
    let itemId = e.target.getAttribute('data-id')
    console.log(itemId)
    if(itemId === null) {
        return
    } else {
        return fetch(`/admin/${itemId}`, {method: 'DELETE'}).catch((e) => console.log(e))
    }
}