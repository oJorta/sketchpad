const canvas = document.querySelector('#canvas')
const buttonSetCanvas = document.querySelector('#setCanvasSize')
const colorSelection = document.querySelector('#colorSelection')
const colorInput = document.querySelector('#colorInput')
const gridViewButton = document.querySelector('#toggleGridView')
const eraserButton = document.querySelector('#eraser')
const clearButton = document.querySelector('#clear')
const colorModes = document.getElementById('colorModes')
/* const dimension = 4 */
/* setCanvas(dimension) */
let selectedColor = colorInput.value
let defaultColor = '#232323'
let previousColor
let selectedMode = 'basicMode'
let eraserMode = false

colorModes.addEventListener('change', (evt) =>{
    selectedMode = evt.target.id

    if(eraserMode){
        toggleEraser()
    }

    if(selectedMode === 'basicMode'){
        colorSelection.style.cssText = 'display: flex;'
    }else{
        colorSelection.style.cssText = 'display: none;'
    }
})

buttonSetCanvas.addEventListener('click', () =>{
    const canvasDimension = getUserInput()
    setCanvas(canvasDimension)
})

colorInput.addEventListener('change', () =>{
    setColor(colorInput.value)
})

gridViewButton.addEventListener('click', () =>{
    toggleSquareBorder()
})

eraserButton.addEventListener('click', () =>{
    toggleEraser()
});

clearButton.addEventListener('click', () =>{
    clearCanvas()
})

canvas.addEventListener('click', (e) =>{
    if(canvas.hasChildNodes()){
        if(!eraserMode){
            paintCanvas(e.target, selectedColor, selectedMode)
        }else{
            paintCanvas(e.target, selectedColor, 'erase')
        }
    }
})

canvas.addEventListener('mouseover', (e) =>{
    if(canvas.hasChildNodes() && e.buttons === 1){
        if(!eraserMode){
            paintCanvas(e.target, selectedColor, selectedMode)
        }else{
            paintCanvas(e.target, selectedColor, 'erase')
        }
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

function setCanvas(dimension){
    canvas.replaceChildren()
    let canvasSquareCount = dimension*dimension
    let squareDimension = (57.6/dimension)
    console.log(squareDimension)

    canvas.style.cssText = `grid-template-columns: repeat(${dimension}, ${squareDimension}rem);
    grid-template-rows: repeat(${dimension}, ${squareDimension}rem);`

    for(let i = 0; i<canvasSquareCount; i++){
        let div = document.createElement('div')
        div.classList.add('canvasSquare')
        /* div.setAttribute('draggable', 'false') */
        div.style.cssText += `width: ${squareDimension}rem; height: ${squareDimension}rem;`
        canvas.appendChild(div)
    }
}

// redundant, but it was the only way i figured out
// to change the color input value when the user clicks
// the eraser button
function setColor(colorCode){
    colorInput.value = `${colorCode}`
    selectedColor = colorInput.value
}

function toggleEraser(){
    if(!eraserMode){
        eraserMode = !eraserMode
        previousColor = selectedColor
        colorInput.disabled = true
        setColor(defaultColor)
    }else{
        eraserMode = !eraserMode
        colorInput.disabled = false
        setColor(previousColor)
    }

    eraserButton.classList.toggle('buttonToggle')
}

function toggleSquareBorder(){
    canvas.childNodes.forEach(square =>{
        square.classList.toggle('border')
    })
}

function paintCanvas(target, color, mode){
    if(target.id === 'canvas'){
        return
    }
    
    switch(mode){
        case 'basicMode':
            target.style.backgroundColor = `${color}`
            break
        case 'rainbowMode':
            let randomColorCode = '#' + Math.floor(Math.random()*16777215).toString(16)
            target.style.backgroundColor = `${randomColorCode}`
            break
        case 'erase':
            target.style.backgroundColor = `${color}`
            break
        default:
            console.log('default')
            break
    }
}

function clearCanvas(){
    let canvasSquares = document.querySelectorAll('.canvasSquare')

    canvasSquares.forEach(square =>{
        paintCanvas(square, defaultColor, 'erase')
    })

}