/* ENREGISTRER URL */
const apiUrl = "http://localhost:3000/api/cameras/";

//cart = button html "ajouter"
//appearCamera = présentation de produit camera
//addCart =  action ajout au panier
//saveProductCart = sauvegarde des produis selectionnés dans le panier
//nbrItems = nombre d'ajout pour le même produit dans le panier

/*RECUPERER L'ID ET URL D'UN PRODUIT */
const parsedUrl = new URL(window.location.href); //créer un objet url a partir d'un "string"
const idProduct = parsedUrl.searchParams.get("id"); // indique un Id précis en fonction du produit selectionné

/*APPLIQUER L'APPARITION D'UN PRODUIT SELECTIONNE*/
fetch(apiUrl + idProduct, { method: "GET" }) // préciser et l'id selectionnée page index
	.then(response => response.json()) // convertit le resultat au format json
	.then(camera => {
		console.log(camera); // indique le resultat sur la console
		appearCamera(camera); // précise la présentation du produit selectionné
		appearOption(camera);


		let cart = document.querySelector("#add-cart"); // Afin que les resultats de la promesse soient pris en compte
		console.log(cart); //afficher le resultat dans la console
		cart.addEventListener("click", () => {
			// déclencheur click
			addCart(); // action ajout au panier
		});
	})

	.catch(err => console.log("HOUSTON !! we have a problem", err)); // si erreur !

/*PRESENTATION PRODUIT SELECTIONNE*/
function appearCamera(camera) {
	let article = document.createElement("article");
	article.classList.add("product-list");

	let imgProduct = document.createElement("img");
	imgProduct.classList.add("img-article", "small");
	imgProduct.src = camera.imageUrl;

	let content = document.createElement("span");
	content.classList.add("product-content");

	let nameProduct = document.createElement("h3");
	nameProduct.textContent = camera.name;
	nameProduct.classList.add("title-product");

	let priceProduct = document.createElement("p");
	priceProduct.classList.add("price");
	priceProduct.textContent = camera.price / 100 + "€";

	let description = document.createElement("p");
	description.textContent = camera.description;
	description.classList.add("infos-article");

	let addCartButton = document.createElement("button"); // ajout button pour le panier
	addCartButton.id = "add-cart"; // ajout d'un id au button
	addCartButton.textContent = "Ajouter";

	article.appendChild(imgProduct); // <article>
	article.appendChild(content); // <div>
	content.appendChild(nameProduct); // <h3>
	content.appendChild(priceProduct); // <p>
	article.appendChild(description); // <p>

	article.appendChild(addCartButton); // <button>
	document.getElementById("vintage-camera").appendChild(article); // div parent de l'article
}

/*CHOIX DE LENTILLES*/
function appearOption(camera) {
	let lens = document.createElement("select"); // input choix de lentilles
	lens.classList.add("select-lens");

	for (let i = 0; i < camera.lenses.length; i++) {
		// cibler le tableau lenses dans camera
		let optionLens = document.createElement("option"); //option input proposant les lentilles associés au produit selectionné
		optionLens.setAttribute("value", camera.lenses[i]);
		optionLens.textContent = camera.lenses[i];
		lens.appendChild(optionLens);
	}

	lens.addEventListener("Selectionner votre lentille", e => {
		// ajout d'un evenement sur l'input
		const lensChoice = document.getElementsByClassName("select-lens").value;
		localStorage.setItem("lens", lensChoice); // récupération du choix de l'objectif dans le localstorage
	});
	// cibler button et ajouter input "lens"
	document.getElementById('add-cart').before(lens);
}

/*INDIQUER L'AJOUT AU PANIER ET LOCALSTORAGE*/
function addCart() {
	let panier = localStorage.getItem("panier"); //on recupere le local storage
	const selectInput = document.getElementsByClassName("select-lens");
	const indexSelected = selectInput.selectedIndex;
	const lensChoice = "recuperer value de l'option selected"

	// chercher value selected value
	const Item = {
		id: idProduct,
		lense: lensChoice,
		quantity: 1,// 1 par defaut
	}

	if (panier) {
		//si le panier existe deja
		const localStorageTab = JSON.parse(panier); // transforme en tableau
		const itemExist = localStorageTab.find(item => item.id === idProduct);//.find = trouver l'objet
		
		if (!itemExist) {// !  demande l'inverse

			// si l'id n'existe pas dans le tableau du localstorage != veut dire non egal
			localStorageTab.push(Item); // push dans tableau products[id]
			const nbProducts = localStorageTab.length; // definit le nbr d'objets contenu dans le tableau

			
			document.querySelector(".store span").textContent = nbProducts; // afficher un ajout sur l'icone panier
		}
		else{
			itemExist.lens = lensChoice;
		}

		//produit existant ou non dans le panier = mise a jour du localstorage
		localStorage.setItem("panier", JSON.stringify(localStorageTab)); // on met a jour le localstorage
	} else {
		// si le panier n'existe pas
		localStorage.setItem("panier", JSON.stringify([Item])); // on crée le panier
		document.querySelector(".store span").textContent = 1;
	}
}
