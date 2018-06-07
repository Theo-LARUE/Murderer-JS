// document.addEventListener('click', () => alert('Hellooooo'));

// var page_rapport = document.querySelector('.investigation-rapport');
// var page_details = document.querySelector('.investigation-details');
// var page_suspects = document.querySelector('.investigation-suspects');

//page_rapport.addEventListener('click', function () {
//   clearInterval(makeitshake);
//   page_suspects.style.zIndex = '1';
//   page_details.style.zIndex = '2';
//   page_rapport.style.zIndex = '3';
//   page_details.style.right = '-75px';
//   // page_suspects.style.right = '-50px';
//   makeitshake = setInterval(animatePage, 2000);
// });

// page_details.addEventListener('click', function () {
//   clearInterval(makeitshake);
//   page_suspects.style.zIndex = '1';
//   page_rapport.style.zIndex = '2';
//   page_details.style.zIndex = '3';
//   page_details.style.right = '25px';
//   makeitshake = setInterval(animatePage, 2000);
// });

// page_suspects.addEventListener('click', function () {
//   clearInterval(makeitshake);
//   page_rapport.style.zIndex = '1';
//   page_details.style.zIndex = '2';
//   page_suspects.style.zIndex = '3';
//   page_details.style.right = '-75px';
//   makeitshake = setInterval(animatePage, 2000);
// });

var animation_page = Array.from(document.querySelectorAll('.investigation-page'));
var suspects = Array.from(document.querySelectorAll('.suspects'));
var right_arrow = document.querySelector('.right');
var left_arrow = document.querySelector('.left');
var audio = document.querySelector('#audioPage');
var counter = 0;
var makeitshake = setInterval(animatePage, 5000);

animation_page.forEach(page => {
  page.addEventListener('click', function () {
    clearInterval(makeitshake);
    audio.play();
    animation_page.forEach(element => {
      if (element.classList.contains('investigation-page--is-active')) {
        element.classList.remove('investigation-page--is-active');
      }
    });

    page.classList.add('investigation-page--is-active');
    makeitshake = setInterval(animatePage, 5000);
  })
})

right_arrow.addEventListener('click', slide(+1));
left_arrow.addEventListener('click', slide(-1));

function slide(shift) {
  return function () {
    counter += shift;
    suspects.forEach(element => {
      if (element.classList.contains('is-active')) {
        element.classList.remove('is-active');
      }
    });

    counter = (counter > suspects.length - 1) ? 0 : counter;
    counter = (counter < 0) ? suspects.length - 1 : counter;

    suspects[counter].classList.add('is-active');
  }
}

function animatePage() {
  for (let i = 0; i < animation_page.length; i++) {
    const element = animation_page[i];
    if (!element.classList.contains('investigation-page--is-active')) {
      element.querySelector('div').classList.add('is_shake');
      element.addEventListener('animationend', function removeClass() {
        element.querySelector('div').classList.remove('is_shake');
        element.querySelector('div').removeEventListener('animationend', removeClass);
      });
    }
  }
}