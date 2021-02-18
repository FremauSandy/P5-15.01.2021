/* ENREGISTRER URL */
const apiUrl = "http://localhost:3000/api/cameras/";

/*CIBLER LES PRODUITS SELECTIONNES DANS LOCALSTORAGE*/
const listPurchase = JSON.parse(localStorage.getItem("listPurchase"));

if (localStorage.getItem("listPurchase") === null) {
	// si le localStorage possede au moins un element
	alert("Votre panier est vide!");
}

listPurchase.forEach(item => {
	fetch(apiUrl + item.id, { method: "GET" })
		.then(response => response.json())
		.then(camera => {
			appearCart(camera);
		});
	console.log(listPurchase);
});

/*PRESENTATION DES PRODUITS SELECTIONNES DANS LE PANIER*/
function appearCart(camera) {
	let itemContent = document.createElement("div"); // conteneur pour un produit
	itemContent.classList.add("item-content");

	let imgProduct = document.createElement("img");
	imgProduct.src = camera.imageUrl;
	imgProduct.classList.add("select-img");

	let contentProduct = document.createElement("div");
	contentProduct.classList.add("product-infos");

	let content = document.createElement("span");
	content.classList.add("select-price-name");

	let nameProduct = document.createElement("h3");
	nameProduct.textContent = camera.name;
	nameProduct.classList.add("select-name");

	let priceProduct = document.createElement("p");
	priceProduct.textContent = camera.price / 100 + "€";
	priceProduct.classList.add("select-price");

	let description = document.createElement("p");
	description.textContent = camera.description;
	description.classList.add("infos-article");

	let contentChoice = document.createElement("span");
	contentChoice.classList.add("select-lens-quantity");

	let btnRemove = document.createElement("button");
	btnRemove.classList.add("remove");
	btnRemove.textContent = "Supprimer";

	/*ACTION SUPPRESSION UNITE*/
	// btnRemove.onclick = function (e) {
	// 	//en cliquant sur le button
	// 	let parentTarget = e.target.parentNode.parentNode.parentNode; // container parent
	// 	//let productid = parentTarget.getAtrribute(/*.id*/); // attribut id a trouver!
	// 	let listPurchase; // appel du tableau de produits selectionnés
	// 	for (let i = 0; i < listPurchase.length; i++) {
	// 		// pour chaque button remove
	// 		if (productId === listPurchase[i]._id) {
	// 			// si l'id du produit a supprimé est égal a l'id enregistré dans le tab
	// 			listPurchase = i;
	// 		}
	// 	}
	// 	listPurchase.splice(listPurchase, 1); //supprime un élément du tableau
	// 	localStorage.setItem("listPurchase", JSON.stringify(listPurchase));
	// 	window.location.reload(true);
	// };

	/*QUANTITE DU PRODUIT*/
	const quantity = document.createElement("select");
	quantity.classList.add("select-quantity");

	for (let i = 0; i < 10; i++) {
		// afficher une liste proposant une quantité pour un produit
		const nbrItems = document.createElement("option");
		nbrItems.textContent = i + 1;
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

	document.getElementById("cart-items").appendChild(itemContent);
}

/*ACTION SUPPRESSION FULLCART*/

let fullDeleteButton = document
	.getElementById("full-delete")
	.addEventListener("click", function () {
		if (confirm("Etes-vous sûr de vouloir vider votre panier?")) {
			localStorage.clear();
			location.reload();
		} else {
			alert("Votre panier est déjà vide!");
		}
	});

/*MODIFIER LES QUANTITES*/

/*APPLIQUER TOTAL PRIX*/
