const canvas = document.querySelector('#canvas')
const buttonSetCanvas = document.querySelector('#setCanvasSize')
const colorInput = document.querySelector('#colorInput')
/* const dimension = 4 */
/* fillCanvas(dimension) */
let selectedColor = colorInput.value

colorInput.addEventListener('change', () =>{
    selectedColor = colorInput.value
})

buttonSetCanvas.addEventListener('click', () =>{
    const canvasDimension = getUserInput()
    fillCanvas(canvasDimension)
})

canvas.addEventListener('mouseover', (e) =>{
    if(canvas.hasChildNodes()){
        paintCanvas(e.target)
    }
})

function getUserInput(){
    let canvasDimension

    while(true){
        canvasDimension = Number(window.prompt('Insert the canvas dimension (max. 64):'))

        if(canvasDimension.valueOf() < 0 || canvasDimension.valueOf() > 64 ||
        !Number.isInteger(canvasDimension.valueOf()) || isNaN(canvasDimension.valueOf())){
            alert('Insert a valid value')
        }
        else{
            break
        }    
    }
    return canvasDimension.valueOf()
}

function fillCanvas(dimension){
    canvas.replaceChildren()
    let canvasSquareCount = dimension*dimension
    let squareDimension = (57.6/dimension)
    console.log(squareDimension)

    canvas.style.cssText = `grid-template-columns: repeat(${dimension}, ${squareDimension}rem);
    grid-template-rows: repeat(${dimension}, ${squareDimension}rem);`

    for(let i = 0; i<canvasSquareCount; i++){
        let div = document.createElement('div')
        div.classList.add('canvasSquare')
        div.style.cssText += `width: ${squareDimension}rem; height: ${squareDimension}rem;`
        canvas.appendChild(div)
    }
}

function paintCanvas(target){
    target.style.backgroundColor = `${selectedColor}`
}
