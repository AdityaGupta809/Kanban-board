const cards = document.querySelectorAll('.card');

const containers = document.querySelectorAll('.container');
const taskInputForm = document.querySelector('.task-input-form');
const todobtn = document.querySelector('#todobutton');
const todosavebtn = document.querySelector('#todosavebutton');
const totalno = document.querySelector(".nooftodo");


cards.forEach(card => {


    attachdraggableitem(card);

    const deleteIcon = card.querySelector('.delete-icon');
    const editicon = card.querySelector('.edit-icon');
    const lockimage = card.querySelector('.lock');

    setlockstate(lockimage, card);

    deleteIcon.addEventListener('click', () => {
        deleteCard(card);
    });


    editicon.addEventListener('click', () => {
        editCard(card);
    });


});


containers.forEach((container) => {
    const cards = container.querySelectorAll('.card');
    const nobox = container.querySelector(".nooftodo").getElementsByTagName('p')[0];

    nobox.textContent = cards.length;



    container.addEventListener("dragover", (e) => {
        e.preventDefault(); // Prevent default to allow drop

        container.classList.add('drag-over');
        const cardsArea = container.querySelector('.cards');
        const draggingCard = document.querySelector('.dragging');
        const imp = draggingCard.querySelector('.tag')
        const closecard = gettheclosestcard(container, e.clientY);
        updateState(draggingCard.id, container.id);

        if (closecard === null) {
            cardsArea.append(draggingCard);




        } else {
            if (closecard.parentNode === cardsArea) {
                cardsArea.insertBefore(draggingCard, closecard);


            } else {
                cardsArea.appendChild(draggingCard); // fallback


            }

        }


        changecolor(imp, container);



    });

    container.addEventListener("dragleave", (e) => {
        e.preventDefault();

        const draggingCard = document.querySelector('.dragging');
        localStorage.getItem('todos');
        const imp = draggingCard.querySelector(".tag");


        container.classList.remove('drag-over');
    });

    container.addEventListener("drop", (e) => {
        //e.preventDefault();
        const itemId = e.dataTransfer.getData("text/plain");
        const currbox = container.querySelector(".nooftodo").getElementsByTagName('p')[0];
        const prevbox = document.querySelector(`#${itemId}`).querySelector(".nooftodo").getElementsByTagName('p')[0];


        prevbox.textContent = parseInt(prevbox.textContent) - 1;
        currbox.textContent = parseInt(currbox.textContent) + 1;

    });

});

todobtn.addEventListener('click', (e) => {
    e.preventDefault();

    taskInputForm.classList.remove('deactive');


});

todosavebtn.addEventListener('click', (e) => {
    e.preventDefault();

    const todo = document.querySelector('#todo');
    const todoText = todo.value.trim();
    if (todoText === '') {

        return;
    }
    const todoobj = { state: "todocont", desc: `${todoText}`, id: Date.now() };
    addtodo(todoobj);
    const todoCard = document.createElement('div');
    todoCard.classList.add('card');
    todoCard.setAttribute('id', todoobj.id);
    todoCard.setAttribute('draggable', 'true');
    todoCard.innerHTML = `
        <div class="card-content">

                           <div class="box">
                                <div class="icons">

                                    <img src="edit.png" alt="delete" width="25px" height="25px" class="edit-icon">
                                    <img src="deleteicon.png" alt="delete" width="22px" height="22px"class="delete-icon">
                                    <img src="unlock.png" alt="unlock image" width="25px" height="25px" class="lock">
                                </div>

                                <div class="tag">
                                    <h4>Importatnt</h4>
                                </div>
                            </div>
                            <div class="desc">
                                <div class="editinput deactive">
                                    <input type="text"  class="editinp" name="desc" />
                        
                                </div>
                                <p>${todoText}</p>
                            </div>
                        </div>
    `;

    const todoContainer = document.querySelector('#todocards');
    const deleteIcon = todoCard.querySelector('.delete-icon');
    const editicon = todoCard.querySelector('.edit-icon');
    const lockimage = todoCard.querySelector('.lock');
    const nobox = document.querySelector("#todocont").querySelector(".nooftodo").getElementsByTagName('p')[0];

    nobox.textContent = parseInt(nobox.textContent) + 1;

    setlockstate(lockimage, todoCard);

    
    
    deleteIcon.addEventListener('click', (e) => {
        
        deleteCard(todoCard);
    });


    editicon.addEventListener('click', () => {
        editCard(todoCard);
    });
    
    // Attach draggable functionality to the new card
    
    attachdraggableitem(todoCard);


    todoContainer.appendChild(todoCard);



    todo.value = '';
    taskInputForm.classList.add('deactive');


});