let optionscont = document.querySelector(".option-cont");
let optionsFlag = true;
let toolCont = document.querySelector(".tools-cont");
let pencilCont = document.querySelector(".pencil-tool-cont");
let eraserCont = document.querySelector(".eraser-tool-cont");
let pencil = document.querySelector(".fa-pencil-alt");
let eraser = document.querySelector(".fa-eraser");
let sticky = document.querySelector(".fa-sticky-note");
let unpload = document.querySelector(".fa-upload");
let pencilFlag = false;
let eraserFlag = false;
let cTool;

//by default tools are open
optionscont.addEventListener("click", function () {
    if (optionsFlag == true) {
        optionsFlag = false;
        openTools();
    } else {
        optionsFlag = true;
        closeTools();
    }
})

function openTools() {
    let iconElement = optionscont.children[0];
    iconElement.classList.remove("fa-times");
    iconElement.classList.add("fa-bars");
    toolCont.style.display = "flex";
}
function closeTools() {
    let iconElement = optionscont.children[0];
    iconElement.classList.remove("fa-bars");
    iconElement.classList.add("fa-times");
    toolCont.style.display = "none";

    pencilCont.style.display = "none";
    eraserCont.style.display = "none";
}

//pencil
pencil.addEventListener("click", function () {
    if (pencilFlag == false) {
        pencilFlag = true;
        pencilCont.style.display = "block";
    } else {
        pencilFlag = false;
        pencilCont.style.display = "none"
    }
})

//eraser
eraser.addEventListener("click", function () {
    if (eraserFlag == false) {
        eraserFlag = true;
        eraserCont.style.display = "flex";
    } else {
        eraserFlag = false;
        eraserCont.style.display = "none"
    }
})



//upload
unpload.addEventListener("click", function () {
    //open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", function () {
        let file = input.files[0]; //files k array me se
        // sbse upr vali file to as the input ke lie
        let url = URL.createObjectURL(file);

        let stickyCont = document.createElement("div");
        stickyCont.setAttribute("class", "sticky-cont");
        stickyCont.innerHTML = `
        <div class="header-cont">
            <i class="fas fa-compress-arrows-alt"></i>
            <i class="fas fa-times"></i>
        </div>
        <div class="note-cont">
            <img src="${url}"/>
        </div>
        `;
        document.body.appendChild(stickyCont);
        //here we can access the body through document 
        // bcoz body is unique in the ccde

        let minimize = stickyCont.querySelector(".fa-compress-arrows-alt");
        let remove = stickyCont.querySelector(".fa-times");

        //minimize and remove
        notesAction(minimize, remove, stickyCont);
        stickyCont.onmousedown = function (event) {
            DragandDrop(stickyCont, event);
        }
        stickyCont.ondragstart = function () {
            return false;
        }
    })
})

//To create sticky
sticky.addEventListener("click", function () {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = `
    <div class="header-cont">
        <i class="fas fa-compress-arrows-alt"></i>
        <i class="fas fa-times"></i>
    </div>
    <div class="note-cont">
        <textarea ></textarea>
    </div>
    `;
    document.body.appendChild(stickyCont);
    //here we can access the body through document 
    // bcoz body is unique in the ccde

    let minimize = stickyCont.querySelector(".fa-compress-arrows-alt");
    let remove = stickyCont.querySelector(".fa-times");

    //minimize and remove
    notesAction(minimize, remove, stickyCont);
    stickyCont.onmousedown = function (event) {
        DragandDrop(stickyCont, event);
    }
    stickyCont.ondragstart = function () {
        return false;
    }
})

//drag and drop function
function DragandDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}

//minimize and remove sticky notes
function notesAction(minimize, remove, stickyCont) {
    remove.addEventListener("click", function () {
        stickyCont.remove();
    })
    minimize.addEventListener("click", function () {
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display == "none") {
            noteCont.style.display = "block";
        } else {
            noteCont.style.display = "none";
        }
    })
}

