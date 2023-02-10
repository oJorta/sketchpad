const canvas = document.querySelector('#canvas')
const dimension = 4
fillCanvas(dimension) 


function fillCanvas(dimension){
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