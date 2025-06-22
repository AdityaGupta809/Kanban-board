function attachdraggableitem(card) {

    if(!card) {
        return;
    }
       card.addEventListener('dragstart', (e) => {

           const container = card.parentNode.parentNode;
           e.dataTransfer.setData("text/plain", container.id);
   
            card.classList.add('dragging');
     
    });

    card.addEventListener('dragend', () => {
   
            
            card.classList.remove('dragging');
    });
}


const gettheclosestcard=(container,yAxis)=>{
    const allcards=container.querySelectorAll(".card:not(.dragging)");

    let closestCard = null;
    let closestdistance = Number.NEGATIVE_INFINITY;
    allcards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const top= cardRect.top;
        const distance = yAxis - top;
        if(distance < 0 && distance > closestdistance) {
            closestdistance = distance;
            closestCard = card;
        }

    });

    return closestCard;
}





const editCard = (card) => {
    if (!card) {
        return;
    }


  
    const description = card.querySelector('.desc').getElementsByTagName('p')[0];
    description.classList.add('deactive');
    const editInputdiv = card.querySelector('.editinput');
    const editInput = editInputdiv.querySelector('.editinp');
    editInputdiv.classList.remove('deactive');
    
    editInput.value = description.textContent;
    
   
    editInput.addEventListener('blur', (event) => {
       
            event.preventDefault();
          
            description.textContent = editInput.value;
            const todos=JSON.parse(localStorage.getItem('todos'));

             if(todos!=null){

                let t=todos.filter((todo)=>{return todo.id!=card.id});
                let toupdate=todos.filter((todo)=>{return todo.id==card.id});
                toupdate[0].desc=description.textContent ;
          
                const arr=[...toupdate,...t];

                localStorage.setItem('todos',JSON.stringify(arr));

            }
            
            description.classList.remove('deactive');
            editInputdiv.classList.add('deactive');
        
    });
}

const setlockstate=(lockimage,card)=>{
     lockimage.addEventListener('click',()=>{

        if(lockimage.getAttribute('src')=='unlock.png'){
            card.setAttribute('draggable',false);
            lockimage.setAttribute("src","lock.jpg");
        }else{
            card.setAttribute('draggable',true);

            lockimage.setAttribute("src","unlock.png")

        }

    });
}


const changecolor=(imp,container)=>{
    if(container.getAttribute('id')=="todocont"){
        imp.style.color="red";
        
    }else if(container.getAttribute('id')=="inprogresscont"){
        imp.style.color="#f79e0b";
        
    }else if(container.getAttribute('id')=="donecont"){
        imp.style.color="#23c45e";
        
    }
   
}


const addtodo=(todo)=>{

    const todos=JSON.parse(localStorage.getItem('todos'));
    const newtodo=[todo,...todos];
    localStorage.setItem('todos',JSON.stringify(newtodo));
}



const deleteCard = (card) => {
    if (card) {
      
        const todos=JSON.parse(localStorage.getItem('todos'));
        if(todos!=null){

            const updatedtodo=todos.filter((todo)=>{ return todo.id!=card.id});
            const deletedtodo=todos.filter((todo)=>{ return todo.id==card.id});

            const cont= document.querySelector(`#${deletedtodo[0].state}`).querySelector(".nooftodo").getElementsByTagName('p')[0];
            cont.textContent=parseInt(cont.textContent)-1;


            localStorage.setItem('todos',JSON.stringify(updatedtodo));
        }
        card.remove();

    }

};

const updateState=(id,s)=>{
      const todos=JSON.parse(localStorage.getItem('todos'));
        if(todos!=null){

            let t=todos.filter((todo)=>{return todo.id!=id});
            let toupdate=todos.filter((todo)=>{return todo.id==id});
                toupdate[0].state=s;
          
                const arr=[...toupdate,...t];

                localStorage.setItem('todos',JSON.stringify(arr));

            
        }
       
       

}