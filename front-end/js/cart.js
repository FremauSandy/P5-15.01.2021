// 1.recuperer le localstorage "panier" 
// 2.recuperer les produits du panier avec methode Get utilisé dans product (id) boucle pour recuperer id
// 3.afficher les produits du panier (for each)
// 4. faire product.js

/* ENREGISTRER URL */
const apiUrl = "http://localhost:3000/api/cameras/";

//cart = button html "ajouter"
//appearCart = présentation des produits dans page cart
//panier = produits dans localstorage

/*CIBLER LES PRODUITS SELECTIONNES DANS LOCALSTORAGE*/
const panier = JSON.parse(localStorage.getItem('panier'));          // accéder au localstorage

panier.forEach(id => {                                              // cibler les elements du panier
  fetch(apiUrl + id, {method: "GET"})                                     
    .then(response => response.json())                              
    .then(camera => {
       appearCart(camera); 
      })

}); 

/*VERIFICATION DU CONTENU PANIER*/
function manageCart() {
  
  if (localStorage.getItem("panier") === null || localStorage.getItem("panier") === "[]") {  // si le panier contient un produit
    document.querySelector("#cart-infos").parentNode.hidden = true;                          // affiche le contenu
  } else {
    document.querySelector("#cart-infos").parentNode.hidden = false;                         // n'affiche pas le contenu
  }
}

/*PRESENTATION DES PRODUITS SELECTIONNES DANS LE PANIER*/ 
function appearCart(camera){

  let itemContent = document.createElement('div')                 // conteneur pour un produit
      itemContent.classList.add("item-content")

  let imgProduct = document.createElement("img")                  // image produit
      imgProduct.src = camera.imageUrl
      imgProduct.classList.add("select-img")

  let contentProduct = document.createElement('div')
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

    let contentChoice = document.createElement("span")
        contentChoice.classList.add("select-lens-quantity")

      let lens = document.createElement("select")                     // choix de lentilles
          lens.classList.add("select-lens")

      /*QUANTITE DU PRODUIT*/
      const quantity = document.createElement("select")               //création d'un input select
        quantity.classList.add("select-quantity")

      for (let i = 0; i < 10 ; i++) {                                 // afficher une liste proposant une quantité pour un produit
          const nbrItems = document.createElement("option")//
              nbrItems.textContent = i + 1;
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
}

// totaux