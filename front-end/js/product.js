/* ENREGISTRER URL */
const apiUrl = "http://localhost:3000/api/cameras/";

/*--------------------------------------RECUPERER L'ID ET URL D'UN PRODUIT -----------------------------------------*/
const parsedUrl = new URL(window.location.href); //créer un objet url a partir d'un "string"
const idProduct = parsedUrl.searchParams.get("id"); // indique un Id précis en fonction du produit selectionné

/*-------------------------------APPLIQUER L'APPARITION D'UN PRODUIT SELECTIONNE---------------------------------------*/
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

/*--------------------------------------PRESENTATION PRODUIT SELECTIONNE----------------------------------*/
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

/*--------------------------------------CHOIX DE LENTILLES------------------------------------------*/
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

/*-----------------------------MANIPULER LE LOCALSTORAGE----------------------*/

/*INDIQUER L'AJOUT AU PANIER/LOCALSTORAGE*/
function addCart() {
	let listPurchase = localStorage.getItem("listPurchase"); //on recupere le local storage
	
	const Item = {
		id: idProduct,
		quantity: 1
	}

	if (listPurchase) {
		//si localStorage existe (contient quelque chose)
		const tabResult = JSON.parse(listPurchase); // transforme en tableau
		let itemExist = false; // valeur par defaut
		tabResult.forEach(item => {// acces aux elements (boucle)

			if (item.id === idProduct) {// si le produit existe deja dans le localstorage, on augmente uniquement sa quantité
				item.quantity = parseInt(item.quantity) + 1;// incrémenter la quantité d'un produit deja présent
				itemExist = true;
			}
		});

		if(!itemExist){
			tabResult.push(Item); // push dans tableau products[id]
		}
		const nbProducts = tabResult.length; // indique le nbr d'objets contenu dans le tableau header
			document.querySelector(".store span").textContent = nbProducts; // afficher un ajout sur l'icone panier header
		//produit existant ou non dans le panier = mise a jour du localstorage
		localStorage.setItem("listPurchase", JSON.stringify(tabResult)); // on met a jour le localstorage

	} else {
		// si le panier n'existe pas
		localStorage.setItem("listPurchase", JSON.stringify([Item])); // on crée le panier
		document.querySelector(".store span").textContent = 1; //indication dans header
	}
	console.log(listPurchase)
}