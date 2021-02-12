/* ENREGISTRER URL */
const apiUrl = "http://localhost:3000/api/cameras/";
//appearCart = présentation des produits dans page cart
//panier = tableau de produits dans localstorage
//quantity = choix de quantité sur un produit
//nbrItems = Valeur quantité d'un produit

/*CIBLER LES PRODUITS SELECTIONNES DANS LOCALSTORAGE*/
const panier = JSON.parse(localStorage.getItem('panier'));          // accéder au localstorage

panier.forEach(id => {                                              // cibler les elements du panier
  fetch(apiUrl + id, {method: "GET"})                               // pour chaque produit on appelle son url et son id                                    
    .then(response => response.json())                              
    .then(camera => {
       appearCart(camera);                                          // applique une "presentation" des produits
      })
}); 

/*PRESENTATION DES PRODUITS SELECTIONNES DANS LE PANIER*/ 
function appearCart(camera){

  let itemContent = document.createElement('div')                 // conteneur pour un produit
      itemContent.classList.add("item-content")

  let imgProduct = document.createElement("img")                  // image produit
      imgProduct.src = camera.imageUrl
      imgProduct.classList.add("select-img")

  let contentProduct = document.createElement('div')              // contient ttes les infos relatives au produit selectionné
      contentProduct.classList.add("product-infos")

    let content = document.createElement("span")                    // content name et price
        content.classList.add("select-price-name")

      let nameProduct = document.createElement("h3")                  // nom du produit
          nameProduct.textContent = camera.name
          nameProduct.classList.add("select-name")

      let priceProduct = document.createElement("p")                  // prix d'un produit
          priceProduct.textContent = camera.price/100 + "€"
          priceProduct.classList.add("select-price")

    let description = document.createElement("p")                   // description du produit              
        description.textContent = camera.description
        description.classList.add("infos-article")

    let contentChoice = document.createElement("span")              // contante quantity et lens
        contentChoice.classList.add("select-lens-quantity")

      let lens = document.createElement("select")                     // choix de lentilles
          lens.classList.add("select-lens")

      /*QUANTITE DU PRODUIT*/
      const quantity = document.createElement("select")               //création d'un input select
        quantity.classList.add("select-quantity")

      for (let i = 0; i < 10 ; i++) {                                 // afficher une liste proposant une quantité pour un produit
          const nbrItems = document.createElement("option")           // ajoute des selecteurs = nombre de jumaux d'un produit
              nbrItems.textContent = i + 1;                           // valeur ajoutée
          quantity.appendChild(nbrItems);
  }

    itemContent.appendChild(imgProduct)       //<img>
    itemContent.appendChild(contentProduct)   //<div>
      contentProduct.appendChild(content)       //<span>
        content.appendChild(nameProduct)          //<h3>
        content.appendChild(priceProduct)         //<p>
      contentProduct.appendChild(description)   //<p>
      contentProduct.appendChild(contentChoice) //<span>
        contentChoice.appendChild(quantity)       //<input>
        contentChoice.appendChild(lens)           //<input>                           

  document.getElementById("cart-items").appendChild(itemContent)  // cibler la div parent de l'article
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
/*APPLIQUER LES LENTILLES D'UN PRODUIT*/

/*APPLIQUER LA QUANTITE D'UN PRODUIT*/
/*BUTTON SUPPRIMER*/
function deleteButton(itemContent) {
	let buttonRemove = document.createElement('button')
	let content = document.createTextNode('Supprimer')

/*POUVOIR SUPPRIMER UN PRODUIT DU PANIER*/
	buttonRemove.addEventListener('click', function(){
		deleteArticle(product)
	})
itemContent.appendChild(buttonRemove)
}

/*ETABLIR PRIX D'UN PRODUIT*/
/*ACTION SUPPRESSION*/
function removeArticle

/*APPLIQUER LA QUANTITE D'UN PRODUIT*/

/*ETABLIR PRIX D'UN PRODUIT*/

/*ETABLIR PRIX TOTAL*/ 
/*ETABLIR PRIX TOTAL*/
 3  front-end/js/index.js 
@@ -49,5 +49,4 @@ function appearCamera(camera){
    content.appendChild(priceProduct)
    link.appendChild(article)
    document.getElementById("vintage-camera").appendChild(link)   // cibler la div parent de l'article
}

} 
 184  front-end/js/product.js 
@@ -8,77 +8,125 @@ const apiUrl = "http://localhost:3000/api/cameras/";
//nbrItems = nombre d'ajout pour le même produit dans le panier

/*RECUPERER L'ID ET URL D'UN PRODUIT */
const parsedUrl = new URL(window.location.href);                  //créer un objet url a partir d'un "string" 
const idProduct = parsedUrl.searchParams.get("id");               // indique un Id précis en fonction du produit selectionné
const parsedUrl = new URL(window.location.href); //créer un objet url a partir d'un "string"
const idProduct = parsedUrl.searchParams.get("id"); // indique un Id précis en fonction du produit selectionné

/*APPLIQUER L'APPARITION D'UN PRODUIT SELECTIONNE*/
fetch(apiUrl + idProduct, {method: "GET"})                       // préciser et l'id selectionnée page index
    .then(response => response.json())                           // convertit le resultat au format json
    .then(camera => {console.log(camera);                        // indique le resultat sur la console  
            appearCamera(camera);                                // précise la présentation du produit selectionné 
            let cart = document.querySelector("#add-cart");      // Afin que les resultats de la promesse soient pris en compte 
            console.log(cart);                                   //afficher le resultat dans la console
            cart.addEventListener('click', () => {               // déclencheur click
                addCart();                                       // action ajout au panier
            })
      })

    .catch(err => console.log("HOUSTON !! we have a problem", err));// si erreur !

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
function appearCamera(camera){                                     

    let article = document.createElement("article")                 
        article.classList.add("product-list")

    let imgProduct = document.createElement("img")                  
        imgProduct.classList.add("img-article","small")                 
        imgProduct.src = camera.imageUrl

    let content = document.createElement("span")                    
        content.classList.add("product-content")

    let nameProduct = document.createElement("h3")                  
        nameProduct.textContent = camera.name
        nameProduct.classList.add("title-product")

    let priceProduct = document.createElement("p")                  
        priceProduct.classList.add("price")
        priceProduct.textContent = camera.price/100 + "€"               

    let description = document.createElement("p")                   
        description.textContent = camera.description
        description.classList.add("infos-article")

    let addCartButton = document.createElement("button")           // ajout button pour le panier                
        addCartButton.id ="add-cart"                               // ajout d'un id au button
        addCartButton.textContent = "Ajouter"

    article.appendChild(imgProduct)                                // <article>
    article.appendChild(content)                                   // <div>
        content.appendChild(nameProduct)                               // <h3>
        content.appendChild(priceProduct)                              // <p>
    article.appendChild(description)                               // <p>
    article.appendChild(addCartButton)                             // <button>
    document.getElementById("vintage-camera").appendChild(article) // div parent de l'article
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
/*INDIQUER L'AJOUT AU PANIER ET LOCALSTORAGE*/
function addCart() {
    let panier = localStorage.getItem('panier');                             //on recupere le local storage

    if(panier) {                                                             //si le panier existe deja
        const localStorageTab = JSON.parse(panier);                          // transforme en tableau
        if(localStorageTab.find(id=> id != idProduct)){                      // si l'id n'existe pas dans le tableau du localstorage != veut dire non egal
            localStorageTab.push(idProduct)                                  // push dans tableau products[id]
            const nbProducts = localStorageTab.length;                       // definit le nbr d'objets contenu dans le tableau 

            localStorage.setItem('panier', JSON.stringify(localStorageTab)); // on met a jour le localstorage
            document.querySelector('.store span').textContent = nbProducts;  // afficher un ajout sur l'icone panier
        } 

    }else{                                                                  // si le panier n'existe pas
        localStorage.setItem('panier', JSON.stringify([idProduct]));        // on crée le panier
        document.querySelector('.store span').textContent = 1;
    }
} 
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