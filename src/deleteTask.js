export function deleteTask(itemID) {
    fetch('/.netlify/functions/remove-task', {
        method: 'POST',
        body: JSON.stringify({
            id: itemID,
        })
    })
        .then(function (response) {
            if (response.statis = 200) {
                window.location.reload();
            }
        });
}