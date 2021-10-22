console.log('experimentsTitles.js is loaded.')

console.log('experimentsTitles.js is loaded.')

let titlesArray = ['1', '2','3', '4', '5', '6', '7']
let titleAs = [];
let seed = 13

function setup() {

  createCanvas(windowWidth, windowHeight);

  randomSeed(seed);
  for(let i = 0; i<= titlesArray.length - 1; i++){

    let titleA = createA('/', titlesArray[i], '_blank')

    titleA.style('font-size', '4rem')

    titleA.style('text-decoration', 'none')

    titleA.position(random() * width, random() * height)
    titleAs.push(titleA)
  }

}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight)

  randomSeed(seed);
  for(let i = 0; i<= titleAs.length - 1; i++){

    let titleA = titleAs[i];

    titleA.position(random() * width, random() * height)

  }



}