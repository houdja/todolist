const form = document.querySelector('.add__tasks');


//RECUPERER LES TACHES

// AJOUTER UNE TACHE

form.addEventListener('submit', function(e){
    e.preventDefault();
    let data = new FormData(this);

    fetch('php/add_task.php', {
        method: 'POST',
        body: data
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }
    })
    .then(data => {
        if(data.success){
            alert(data.msg);
            form.querySelector('input').value = '';
        }else{
            alert(data.msg);
        }
    })
})