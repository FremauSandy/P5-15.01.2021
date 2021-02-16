/* ENREGISTRER URL */
const apiUrl = "http://localhost:3000/api/cameras/";

/*CIBLER LES PRODUITS SELECTIONNES DANS LOCALSTORAGE*/
const listPurchase = JSON.parse(localStorage.getItem("listPurchase")); // accéder au localstorage

listPurchase.forEach(item =>{
	// cibler les elements du panier
	fetch(apiUrl + item.id, { method: "GET" }) // pour chaque produit on appelle son url et son id
		.then(response => response.json())
		.then(camera => {
			appearCart(camera); // applique une "presentation" des produits
		});
		console.log(listPurchase)
	});

/*PRESENTATION DES PRODUITS SELECTIONNES DANS LE PANIER*/
function appearCart(camera) {
	// contenant
	let itemContent = document.createElement("div"); // conteneur pour un produit
	itemContent.classList.add("item-content");
	// image produit
	let imgProduct = document.createElement("img"); 
	imgProduct.src = camera.imageUrl;
	imgProduct.classList.add("select-img");
	// conteneur infos produit
	let contentProduct = document.createElement("div");
	contentProduct.classList.add("product-infos");
	// conteneur name et price
	let content = document.createElement("span"); 
	content.classList.add("select-price-name");
	// nom du produit
	let nameProduct = document.createElement("h3"); 
	nameProduct.textContent = camera.name;
	nameProduct.classList.add("select-name");
	// prix d'un produit
	let priceProduct = document.createElement("p"); 
	priceProduct.textContent = camera.price / 100 + "€";
	priceProduct.classList.add("select-price");
	// description du produit
	let description = document.createElement("p"); 
	description.textContent = camera.description;
	description.classList.add("infos-article");
	// consteneur quantity et suppression
	let contentChoice = document.createElement("span"); 
	contentChoice.classList.add("select-lens-quantity");
	// boutton supression
	let btnRemove = document.createElement("button")// button suppression de produit
	btnRemove.classList.add("remove");

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
	contentChoice.appendChild(btnRemove); //<button>

	document.getElementById("cart-items").appendChild(itemContent); // cibler la div parent de l'article
}

/*ACTION SUPPRESSION UNITE*/
async function removeProduct(){
	await appearCart(camera)
	let buttonsRemove = document.getElementsByClassName("remove");
	

}
/*ACTION SUPPRESSION FULLCART*/
// function deleteFullCart(){
// 	listProduct = localStorage.getItem("listPurchase");
// 	let fullDeleteButton = document.getElementsByClassName('full-delete');
// 	fullDeleteButton.addEventListener("click", () => {
// 		localStorage.clear();
// 		alert('Votre panier à été vidé!')
// 	})
// }

/*MODIFIER LES QUANTITES*/

/*APPLIQUER TOTAL PRIX*/