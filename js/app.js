const form = document.querySelector('.add__tasks');
const todo = document.querySelector('.todo div');


//CREATE TASK

function createTask(t){

    let div = document.createElement('div')
    div.classList.add('task')
    div.innerHTML = `
        <p>${t.task}</p>
        <div class="contain__btn">
            <span class="material-icons">
                trip_origin
            </span>
            <span class="material-icons">
                edit
            </span>
        </div>`

        return div;
}

//RECUPERER LES TACHES

let tasks = function(){
    fetch('php/get_task.php')
    .then(response => {
        if(response.ok){
            return response.json();
        }
    })
    .then(data => {
        if(data[0]){
            data.forEach(task => {
                todo.appendChild(createTask(task));
            })
        }else{
            todo.innerHTML = 'Aucun tâche...'
        }
    })
    .catch(e => {
        console.log("Erreur" + e);
    })
}

tasks();

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
            todo.innerHTML = '';
            tasks();
        }else{
            alert(data.msg);
        }
    })
})