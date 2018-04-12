const catSound = new Audio('sounds/Kitten Meow-SoundBible.com-1295572573.mp3');
const model = {
	currentCat: null,
	cats: [
		{
			clickCount : 0,
			name : 'Fluffy',
			imgSrc : 'images/625069434_db86b67df8_z.jpg',
			imgAttribution : 'https://www.flickr.com/photos/poplinre/625069434/in/photostream/'
		},
		{
			clickCount : 0,
			name : 'Fred',
			imgSrc : 'images/adorable-animal-animal-photography-33492.jpg',
			imgAttribution : 'https://pixabay.com/en/cat-red-cute-mackerel-tiger-sweet-1044755/'
		},
		{
			clickCount : 0,
			name : 'Whiskers',
			imgSrc : 'images/adorable-animal-cat-730896.jpg',
			imgAttribution : 'https://www.pexels.com/search/black%20cat/'
		},
		{
			clickCount : 0,
			name : 'Oliver',
			imgSrc : 'images/animal-animal-photography-cat-104827.jpg',
			imgAttribution : 'https://www.pexels.com/photo/grey-and-white-short-fur-cat-104827/'
		},
		{
			clickCount : 0,
			name : 'Stella',
			imgSrc : 'images/animal-cat-close-up-887773.jpg',
			imgAttribution : 'https://www.pexels.com/photo/selective-focus-photography-of-brown-tabby-kitten-standing-against-glass-window-887773/'
		}
	]
};

const controller = {
	// sets current cat to first one in list
	init: function() {
		model.currentCat = model.cats[0];
		catListView.init();
		catView.init();
	},
	//returns the model's current cat
	getCurrentCat: function() {
		return model.currentCat;
	},
	//gets the array of all cats
	getCats: function() {
		return model.cats;
	},

	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},

	catCounter: function() {
		model.currentCat.clickCount++;
		catView.render();
		catSound.cloneNode(true).play();
	},

	saveCurrentCat: function(cat) {
		model.currentCat = cat;
	}
};

const catView = {
	init: function() {
		//stores elements
		this.catElem = document.querySelector('#cat');
		this.catNameElem = document.querySelector('#cat-name');
		this.catImageElem = document.querySelector('#cat-img');
		this.countElem = document.querySelector('#cat-count');
		this.attriElem = document.querySelector(".external-text");
		this.refElem = document.querySelector(".source-text");
		//when image is clicked, controller updates the click count of current cat
		this.catImageElem.addEventListener('click', function(e){
			controller.catCounter();
		});
		this.render();
	},

	render: function() {
		//renders elements
		let currentCat = controller.getCurrentCat();
		if (currentCat.clickCount === 1) {
			this.countElem.textContent = "You have clicked "+currentCat.clickCount+" time!";
		} else {
			this.countElem.textContent = "You have clicked "+currentCat.clickCount+" times!";
			}
		this.catNameElem.textContent = currentCat.name;
		this.catImageElem.src = currentCat.imgSrc;
		this.attriElem.href = currentCat.imgAttribution;
		this.refElem.textContent = currentCat.imgAttribution;
	}
};

const catListView = {
	init: function() {
		this.catListElem = document.querySelector('#cat-list');
		this.render();
	},

	render: function() {
		let cat, elem, i;
		let cats = controller.getCats();

		this.catListElem.innerHTML = '';
		//gets the list of cat names and displays on page
		for (i=0; i< cats.length; i++) {
			cat = cats[i];
			elem=document.createElement('li');
			elem.textContent = cat.name;
			//adds event listener for each cat name in list
			elem.addEventListener('click', (function(catCopy){
				return function() {
					controller.setCurrentCat(catCopy);
					catView.render();
				};
			})(cat));
			this.catListElem.appendChild(elem);
		}
	}
};

controller.init();
