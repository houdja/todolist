const form = document.querySelector('.add__tasks');
const todo = document.querySelector('.todo div');
const completed = document.querySelector('.completed div');
const updateForm = document.querySelector('.update')
const updateTask = document.getElementById('update_task');
const idTask = document.getElementById('id_task');

//CREATE TASK

function createTask(t){

    let div = document.createElement('div')
    div.classList.add('task')
    div.innerHTML = `
        <p data-id='${t.id}'>${t.task}</p>
        <div class="contain__btn">
            <span class="material-icons done">
                trip_origin
            </span>
            <span class="material-icons edit">
                edit
            </span>
        </div>`

        return div;
}

function createCompletedTask(t){

    let div = document.createElement('div')
    div.classList.add('task')
    div.innerHTML = `
        <p data-id='${t.id}'>${t.task}</p>
        <div class="contain__btn">
            <span class="material-icons delete">
                delete
            </span>
        </div>`

        return div;
}

//RECUPERER LES TACHES

let tasks = function(){
    todo.innerHTML = 'Chargement ...';
    fetch('php/get_task.php')
    .then(response => {
        if(response.ok){
            return response.json();
        }
    })
    .then(data => {
        todo.innerHTML = '';
        if(data[0]){
            data.forEach(task => {
                todo.appendChild(createTask(task));
            })
            let editsBtn = document.querySelectorAll('.edit');
            let donesBtn = document.querySelectorAll('.done');
            editsBtn.forEach(btn => {
                btn.addEventListener('click', function(e){
                    let task = e.target.parentNode.parentNode;
                    let p = task.querySelector('p');
                    let id = p.getAttribute('data-id');
                    let taskContent = p.innerHTML;
                    updateTask.value = taskContent;
                    idTask.value = id;
                    updateForm.classList.add('active')
                })
            })
            donesBtn.forEach(done => {
                done.addEventListener('click', e => {
                    let task = e.target.parentNode.parentNode;
                    let p = task.querySelector('p');
                    let id = p.getAttribute('data-id');
                    let content = p.innerHTML;
                    fetch('php/done.php?data=' + JSON.stringify(
                        {
                            'id': id,
                            'content': content
                        }
                    ), {
                        method: 'GET'
                    })
                    .then(response => {
                        if(response.ok){
                            return response.json();
                        }
                    })
                    .then(data => {
                        if(data.success){
                            alert(data.msg);
                            tasks();
                            completedTasks();
                        }else{
                            alert(data.msg);
                        }
                    })
                    .catch(e => {
                        alert("ERREUR : " + e)
                    })
                })
            })

        }else{
            todo.innerHTML = 'Aucune tâche...'
        }
    })
    .catch(e => {
        alert("Erreur" + e);
    })
}

tasks();

//RECUPERE LES TACHES ACCOMPLIE
let completedTasks = function(){
    completed.innerHTML = 'Chargement...';
    fetch('php/completed_tasks.php')
    .then(response => {
        if(response.ok){
            return response.json();
        }
    })
    .then(data => {
        if(data.success){
            let cTasks = JSON.parse(data.data);
            if(cTasks.length != 0){
                completed.innerHTML = '';
                cTasks.forEach(task => {
                    completed.appendChild(createCompletedTask(task));
                })
            }else{
                completed.innerHTML = 'Aucune tâche';
            }
        }
    })
    .catch( e => {
        console.error("Tache accomplie: " + e);
    })
}

completedTasks();

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
            form.querySelector('input').value = '';
            tasks();
        }else{
            alert(data.msg);
        }
    })
})

//MODIFIER UNE TACHE

updateForm.addEventListener('submit', function(e){
    e.preventDefault();
    let data = new FormData(this);
    fetch('php/update_task.php', {
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
            alert(data.msg)
            updateForm.classList.remove('active')
            tasks();
        }else{
            alert(data.msg)
        }
    })
    .catch(e => {
        console.log("ERREUR" + e);
    })
})