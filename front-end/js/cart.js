/* ENREGISTRER URL */
const apiUrl = "http://localhost:3000/api/cameras/";

//appearCart = présentation des produits dans page cart
//panier = tableau de produits dans localstorage
//quantity = choix de quantité sur un produit
//nbrItems = Valeur quantité d'un produit

/*CIBLER LES PRODUITS SELECTIONNES DANS LOCALSTORAGE*/
const panier = JSON.parse(localStorage.getItem("panier")); // accéder au localstorage

panier.forEach(id => {
	// cibler les elements du panier
	fetch(apiUrl + id, { method: "GET" }) // pour chaque produit on appelle son url et son id
		.then(response => response.json())
		.then(camera => {
			appearCart(camera); // applique une "presentation" des produits
		});
});
console.log(panier);

/*PRESENTATION DES PRODUITS SELECTIONNES DANS LE PANIER*/
function appearCart(camera) {
	let itemContent = document.createElement("div"); // conteneur pour un produit
	itemContent.classList.add("item-content");

	let imgProduct = document.createElement("img"); // image produit
	imgProduct.src = camera.imageUrl;
	imgProduct.classList.add("select-img");

	let contentProduct = document.createElement("div"); // contient ttes les infos relatives au produit selectionné
	contentProduct.classList.add("product-infos");

	let content = document.createElement("span"); // content name et price
	content.classList.add("select-price-name");

	let nameProduct = document.createElement("h3"); // nom du produit
	nameProduct.textContent = camera.name;
	nameProduct.classList.add("select-name");

	let priceProduct = document.createElement("p"); // prix d'un produit
	priceProduct.textContent = camera.price / 100 + "€";
	priceProduct.classList.add("select-price");

	let description = document.createElement("p"); // description du produit
	description.textContent = camera.description;
	description.classList.add("infos-article");

	let contentChoice = document.createElement("span"); // contante quantity et lens
	contentChoice.classList.add("select-lens-quantity");

	/*QUANTITE DU PRODUIT*/
	const quantity = document.createElement("select"); //création d'un input select
	quantity.classList.add("select-quantity");

	for (let i = 0; i < 10; i++) {
		// afficher une liste proposant une quantité pour un produit
		const nbrItems = document.createElement("option"); // ajoute des selecteurs = nombre de jumaux d'un produit
		nbrItems.textContent = i + 1; // valeur ajoutée
		quantity.appendChild(nbrItems);
	}

	itemContent.appendChild(imgProduct); //<img>
	itemContent.appendChild(contentProduct); //<div>
	contentProduct.appendChild(content); //<span>
	content.appendChild(nameProduct); //<h3>
	content.appendChild(priceProduct); //<p>
	contentProduct.appendChild(description); //<p>
	contentProduct.appendChild(contentChoice); //<span>
	contentChoice.appendChild(quantity); //<input>

	document.getElementById("cart-items").appendChild(itemContent); // cibler la div parent de l'article
}

/*BUTTON SUPPRIMER*/
function deleteButton(itemContent) {
	let buttonRemove = document.createElement('button')
	let content = document.createTextNode('Supprimer')

	buttonRemove.addEventListener('click', function(){
		deleteArticle(product)
	})
itemContent.appendChild(buttonRemove)
}

/*ACTION SUPPRESSION*/
function removeArticle

/*APPLIQUER LA QUANTITE D'UN PRODUIT*/

/*ETABLIR PRIX D'UN PRODUIT*/

/*ETABLIR PRIX TOTAL*/
