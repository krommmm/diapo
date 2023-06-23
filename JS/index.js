//declarations
var bouton = document.querySelector('.bouton');
var boutonColor = document.querySelector('.change_color');
var toggle = true;
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const diapo = document.querySelector('.diapo');
const slide_width = diapo.getBoundingClientRect().width;
const slide_container = document.querySelector('.slide_container');
var compteur = 0;
var transfert = 0;
var indexNodes = 1;

//fonction qui génère une couleur aléatoire
const generateRandomColors = () => {
		//une nouvelle couleur aléatoire pour chaque slide
	for (var i = 0; i < slide_container.childElementCount; i++) {
	  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	  slide_container.childNodes[indexNodes].style.backgroundColor = `#${randomColor}`;
	  indexNodes = indexNodes + 2;
	}
  };

const startCaroussel = () => {
	generateRandomColors();


	//creation d'un clone de la dernière image
	var clone = slide_container.firstElementChild.cloneNode(true);

	slide_container.appendChild(clone);

	//On indique la largeur du grand rectangle qui contient tous les slides en fonction du nombre de slides
	slide_container.style.width = `${
		300 * slide_container.childElementCount
	}px`;

	// gestionnaire d'evenement qui gère le clique gauche
	left.addEventListener('click', function goLeft() {
		compteur--;
		if (compteur < 0) {
			setTimeout(() => {
				slide_container.style.transition = '1ms';
				transfert = slide_width * compteur;
				slide_container.style.transform = `translateX(${-transfert}px)`;
				slide_container.style.transition = '400ms';
				goLeft();
			}, 1);

			slide_container.style.transition = '0ms';
			compteur = slide_container.childElementCount - 1;
		}
		transfert = slide_width * compteur;
		slide_container.style.transform = `translateX(${-transfert}px)`;
		console.log(compteur);
	});

	// gestionnaire d'evenement qui gère le clique droit
	right.addEventListener('click', function goRight() {
		compteur++;
		if (compteur == slide_container.childElementCount - 1) {
			setTimeout(() => {
				compteur = 0;
				slide_container.style.transition = '0ms';
				transfert = slide_width * compteur;
				slide_container.style.transform = `translateX(${-transfert}px)`;
			}, 400);
		}

		console.log(compteur);
		slide_container.style.transition = '400ms';
		transfert = slide_width * compteur;
		slide_container.style.transform = `translateX(${-transfert}px)`;
	});
};

startCaroussel();

bouton.addEventListener('click', function () {
	toggle = !toggle;

	if (!toggle) {
		diapo.style.overflow = 'visible';
		bouton.textContent = 'Hide';
	} else {
		diapo.style.overflow = 'hidden';
		bouton.textContent = 'Show';
	}
});

boutonColor.addEventListener('click', function(){
	
	window.location.reload();
	
});
