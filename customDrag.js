"use strict"

const boxes = document.querySelectorAll(".box")
const cnt1 = document.querySelector(".container1").getBoundingClientRect()
const cnt2 = document.querySelector(".container2").getBoundingClientRect()
let a = "abc"

const dragStart = (boxClickedPos, posX, posY, bounds) => {
    boxClickedPos.left = posX - bounds.left
    boxClickedPos.top = posY - bounds.top
}

function dragMove() {
    
}

function dragStop(box) {
    box.style.zIndex = ""
    box.style.left = ""
    box.style.top = ""
    box.style.position = "relative"
}

for (const key in boxes) {
    if (Object.hasOwnProperty.call(boxes, key)) {
        const box = boxes[key];
        let boxClickedPos = {left: 0, top: 0}
        let moveable = false
        let oldPosY = 0

        box.addEventListener("touchstart", (e) => {
            moveable = true
            dragStart(boxClickedPos, e.targetTouches[0].pageX, e.targetTouches[0].pageY, e.target.getBoundingClientRect())
        })
        
        box.addEventListener("touchmove", (e) => {
            if (!moveable) return

            box.style.zIndex = 2
            box.style.position = "absolute"
            let touchLocation = e.targetTouches[0];

            if((touchLocation.pageX - boxClickedPos.left) >= cnt1.left &&
            (touchLocation.pageX + (e.target.clientWidth - boxClickedPos.left)) <= cnt2.right &&
            (touchLocation.pageY - boxClickedPos.top) >= cnt1.top &&
            (touchLocation.pageY + (e.target.clientHeight - boxClickedPos.top)) <= cnt1.bottom) {
                box.style.left = touchLocation.pageX - boxClickedPos.left - 8 + "px"
                box.style.top = touchLocation.pageY - boxClickedPos.top - 8 + "px"
            }

            box.hidden = true;
            let elemBelow = document.elementFromPoint(touchLocation.pageX, touchLocation.pageY)
            box.hidden = false;

            if (!elemBelow) return;

            if ((touchLocation.pageY + (e.target.clientHeight - boxClickedPos.top)) >= (cnt1.bottom - 75)) {
                elemBelow.parentElement.scrollBy({
                    top: 75,
                    left: 0,
                    behavior: 'smooth'
                })
            }

            if (touchLocation.pageY - boxClickedPos.top <= (cnt1.top + 75)) {
                elemBelow.parentElement.scrollBy({
                    top: -75,
                    left: 0,
                    behavior: 'smooth'
                })
            }

            let droppableBelow = elemBelow.closest('.spot')

            if (droppableBelow != null) {
                if(touchLocation.pageY < oldPosY) droppableBelow.before(box.parentNode)
                else if(touchLocation.pageY > oldPosY) droppableBelow.after(box.parentNode)
            } else if(elemBelow.classList.contains("container")) {
                if(touchLocation.pageY < oldPosY) elemBelow.appendChild(box.parentNode)
                else if(touchLocation.pageY > oldPosY) elemBelow.prepend(box.parentNode)
            }

            oldPosY = touchLocation.pageY;
        })
        
        box.addEventListener("touchend", () => {
            moveable = false
            dragStop(box)
        })

        box.addEventListener("mousedown", (e) => {
            moveable = true
            dragStart(boxClickedPos, e.clientX, e.clientY, e.target.getBoundingClientRect())
        })

        box.addEventListener("mousemove", (e) => {
            if (!moveable) return

            box.style.zIndex = 2
            box.style.position = "absolute"

            /*if ((e.clientX - boxClickedPos.left) > cnt1.left &&
            (e.clientX + (e.target.clientWidth - boxClickedPos.left)) < cnt2.right) {*/
            box.style.left = e.clientX - boxClickedPos.left - 8 + "px" // 8 margin
            //}

           /* if ((e.clientY - boxClickedPos.top) >= cnt1.top &&
            (e.clientY + (e.target.clientHeight - boxClickedPos.top)) <= cnt1.bottom) {*/
            box.style.top = e.clientY - boxClickedPos.top - 8 + "px"
            //} 

            box.hidden = true;
            let elemBelow = document.elementFromPoint(e.clientX, e.clientY)
            box.hidden = false;

            if (!elemBelow) return;

            if ((e.clientY + (e.target.clientHeight - boxClickedPos.top)) >= (cnt1.bottom - 75) && (elemBelow.classList.contains("container") || elemBelow.classList.contains(".spot"))) {
                elemBelow.parentElement.scrollBy({
                    top: 75,
                    left: 0,
                    behavior: 'smooth'
                })
            }

            if (e.clientY - boxClickedPos.top <= (cnt1.top + 75) && (elemBelow.classList.contains("container") || elemBelow.classList.contains(".spot"))) {
                elemBelow.parentElement.scrollBy({
                    top: -75,
                    left: 0,
                    behavior: 'smooth'
                })
            }

            let droppableCntBelow = elemBelow.closest(".container")
            let droppableBelow = elemBelow.closest('.spot')

            if(droppableCntBelow != null && !droppableCntBelow.contains(box.parentNode) && droppableBelow != null) {
                if(e.pageY < oldPosY) droppableBelow.before(box.parentNode)
                else if(e.pageY > oldPosY) droppableBelow.after(box.parentNode)
                // trošku jinak
            }

            if(droppableCntBelow != null && !droppableCntBelow.contains(box.parentNode) && droppableCntBelow.childElementCount == 0) {
                droppableCntBelow.appendChild(box.parentNode)
            }
            
            if (droppableBelow != null) {
                if(e.pageY < oldPosY) droppableBelow.before(box.parentNode)
                else if(e.pageY > oldPosY) droppableBelow.after(box.parentNode)
            }

            oldPosY = e.pageY;
        })
        
        box.addEventListener("mouseup", () => {
            moveable = false
            dragStop(box)
        })
    }
}