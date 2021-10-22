/* ---------------------------------- gsap ---------------------------------- */

// Animates social links to the top after 500ms

setTimeout(() => {
  for (let i = 1; i <= 7; i++) {
    let link = '.link-' + i
    let linkDom = document.querySelector(`.link-${i}`)
    let speed = 100
    TweenLite.set(link, {
      visibility: "visible"
    });
    gsap.from(link, {
      duration: 1 * i * .5,
      y: 100,
      opacity: 0
    });
    linkDom.addEventListener("mouseout", () => {
      linkName.textContent = ''
    })
  }
}, 1500)


let linkName = document.querySelector('#linkName')

const linkOne = document.querySelector('.link-3')
linkOne.addEventListener('mouseover', () => {
  linkName.textContent = 'Twitter'
})

const linkTwo = document.querySelector('.link-4')
linkTwo.addEventListener('mouseover', () => {
  linkName.textContent = 'LinkedIn'


})
const linkThree = document.querySelector('.link-5')
linkThree.addEventListener('mouseover', () => {
  linkName.textContent = 'Blog (en español)'

})
const linkFour = document.querySelector('.link-6')
linkFour.addEventListener('mouseover', () => {
  linkName.textContent = 'More links...'
})