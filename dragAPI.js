const draggables = document.querySelectorAll('.box')
const containers = document.querySelectorAll('.container')

class Sortable {
    constructor(draggables, containers, draggableClass = "", draggingClass = "dragging") {
        this.setDraggables(draggables)
        this.setContainers(containers)
        this.draggableClass = draggableClass.trim().charAt(0) == "." ? draggableClass.replace(".", "").trim() : draggableClass.trim()
        this.draggingClass = draggingClass.trim().charAt(0) == "." ? draggingClass.replace(".", "").trim() : draggingClass.trim()
    }

    setDraggables(draggabless) {
        draggabless.forEach(draggable => {
            draggable.setAttribute("draggable", "true")
          
            draggable.addEventListener('dragstart', () => {
              draggable.classList.add(this.draggingClass)
            })
          
            draggable.addEventListener('dragend', () => {
              draggable.classList.remove(this.draggingClass)
            })
        })
    }

    setContainers(containerss) {
        containerss.forEach(container => {
            container.addEventListener('dragover', e => {
              e.preventDefault()
              const afterElement = this.getDragAfterElement(container, e.clientY)
              const draggable = document.querySelector("." + this.draggingClass)
              if (afterElement == null) {
                container.appendChild(draggable)
              } else {
                container.insertBefore(draggable, afterElement)
              }
            })
        })
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.' + this.draggableClass + ':not(' + this.draggingClass + ')')]
      
        return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect()
          const offset = y - box.top - box.height / 2
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
          } else {
            return closest
          }
        }, { offset: Number.NEGATIVE_INFINITY }).element
    }
}

const sortables = new Sortable(draggables, containers, "box")