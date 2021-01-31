

// 1.recuperer le localstorage "panier" 
// 2.recuperer les produits du panier avec methode Get utilisé dans product (id) boucle pour recuperer id
// 3.afficher les produits du panier (for each)
// 4. faire product.js

/*CIBLER LES PRODUITS SELECTIONNES DANS LOCALSTORAGE*/

function manageCart(){

  let panier = localStorage.getItem('panier');                    // accéder au localstorage
      panier = JSON.parse(panier);                                // methode parse analyse une string et construit sa valeur ou son objet
  let contentItem = document.querySelector('#cart-items');        // cibler le conteneur du panier dans page cart

}

/*PRESENTATION DES PRODUITS SELECTIONNES DANS LE PANIER*/ 
function appearCart(camera){

  let itemContent = document.createElement('div')                 // conteneur pour un produit
    itemContent.classList.add("item-content")

  let imgProduct = document.createElement("img")                  // image produit
    imgProduct.src = camera.imageUrl

  let content = document.createElement("span")                    // content name et price
  
  let nameProduct = document.createElement("h3")                  // nom du produit
    nameProduct.textContent = camera.name
  
  let priceProduct = document.createElement("p")                  // prix d'un produit
    priceProduct.textContent = camera.price/100 + "€"
  
    let lens = document.createElement("select")                   // choix de lentilles
    lens.classList.add("select-lens")

    itemContent.appendChild(imgProduct)
    itemContent.appendChild(content)
    itemContent.appendChild(nameProduct)
    itemContent.appendChild(priceProduct)
    itemContent.appendChild(lens)

  document.getElementById("cart-items").appendChild(itemContent)  // cibler la div parent de l'article
}