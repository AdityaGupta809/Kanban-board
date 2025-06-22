
const cardscontainer=document.querySelectorAll(".cards");


const todoContainer=cardscontainer.item(0);
const progresscontainer=cardscontainer.item(1);
const donecontainer=cardscontainer.item(2);


const todos=JSON.parse(localStorage.getItem('todos'));
if(todos==null){
   
    let arr=[];
    localStorage.setItem('todos',JSON.stringify(arr));
}else{
    todos.forEach(todo => {
            const todoCard = document.createElement('div');
            todoCard.classList.add('card');
            todoCard.setAttribute('id',todo.id);
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
                                        <p>${todo.desc}</p>
                                    </div>
                                </div>
            `;

            const imp=todoCard.querySelector(".tag");

      
        if(todo.state==="inprogresscont"){
            imp.style.color="#f79e0b";
            progresscontainer.append(todoCard);
            

        }else if(todo.state==="todocont"){
            imp.style.color="red";
            todoContainer.append(todoCard);



        }else if(todo.state==="donecont"){
             imp.style.color="#23c45e";
            donecontainer.append(todoCard);


        }
       
    }); 
}


