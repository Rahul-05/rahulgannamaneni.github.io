let mouseCursor = document.querySelector(".cursor");
let hoverElem = document.querySelectorAll('.c');

let hoverElem1 = document.querySelectorAll('.c1');

window.addEventListener("mousemove", cursor);

function cursor(e) {
    
    
    mouseCursor.style.top = e.pageY + 'px'  ;
    mouseCursor.style.left = e.pageX + 'px' ;
}

hoverElem.forEach(link =>{
    link.addEventListener('mouseleave', () =>{
        mouseCursor.classList.remove("link-grow");
        
    });
    link.addEventListener('mouseover', () =>{
        mouseCursor.classList.add("link-grow");
        
    });
})


hoverElem1.forEach(link =>{
    link.addEventListener('mouseleave', () =>{
        mouseCursor.classList.remove("link-grow1");
        
    });
    link.addEventListener('mouseover', () =>{
        mouseCursor.classList.add("link-grow1");
        
    });
})




