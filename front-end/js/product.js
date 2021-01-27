/* ENREGISTRER URL */
const apiUrl = "http://localhost:3000/api/cameras/";

/*RECUPERER L'ID ET URL D'UN PRODUIT */

const parsedUrl = new URL(window.location.href); //créer un objet url a partir d'un "string"
const idProduct = parsedUrl.searchParams.get("id");

/*APPLIQUER L'APPARITION D'UN PRODUIT SELECTIONNER*/
fetch(apiUrl + idProduct, {method: "GET"})
    .then(response => response.json())                              // convertit le resultat au format json*/
    .then(camera => {console.log(camera);                         // convertit le resultat sur la console*/  
            appearCamera(camera);
            let cart = document.querySelector("#add-cart"); /*Afin que les resultats de la promesse soient pris en compte*/ 
            console.log(cart);      
            cart.addEventListener('click', () => {      /*déclencheur click*/ 
                addCart();            
            })
      })

    .catch(err => console.log("HOUSTON !! we have a problem", err));   // si erreur !*/

/*CIBLER LES CONTENEURS PAGE*/
function appearCamera(camera){                                     
    
    let link = document.createElement("a")

    let article = document.createElement("article")                 // créer une envloppe pour un produit
    
    article.classList.add("product-list")

    let imgProduct = document.createElement("img")                  // inclure emplacement image produit
    imgProduct.classList.add("img-article","small")                 // ajout d'une classe 
    imgProduct.src = camera.imageUrl
    
    let content = document.createElement("span")                    // content name et price
    content.classList.add("product-content")

    let nameProduct = document.createElement("h3")                  // indiquer le "nom" du produit
    nameProduct.textContent = camera.name
    nameProduct.classList.add("title-product")

    let priceProduct = document.createElement("p")                  // element prix
    priceProduct.classList.add("price")
    priceProduct.textContent = camera.price/100 + "€"               // prix d'une camera

    let description = document.createElement("p")                   // description Lorem ...
    description.textContent = camera.description
    description.classList.add("infos-article")

    let lens = document.createElement("select")                    // élément choix de lentilles
    lens.classList.add("select-lens")

    let addCartButton = document.createElement("button")                 // lien ajouter au panier
    addCartButton.id ="add-cart"
    addCartButton.textContent = "Ajouter"
    
    article.appendChild(imgProduct)
    article.appendChild(content)
    content.appendChild(nameProduct)
    content.appendChild(priceProduct)
    article.appendChild(description)
    link.appendChild(article)
    article.appendChild(lens)
    article.appendChild(addCartButton)
    document.getElementById("vintage-camera").appendChild(link)   // cibler la div parent de l'article
}


/*INDIQUER L'AJOUT AU PANIER ET LOCALSTORAGE*/ 
function addCart() {
    let panier = localStorage.getItem('panier');               //on recupere le local storage

    if( panier) {                                                   //si le panier existe
        const localStorageTab = JSON.parse(panier);                         // transforme en tableau
        if(localStorageTab.find(id=> id != idProduct)){                     // si l'id n'existe pas dans le tableau du localstorage != veut dire non egal
            localStorageTab.push(idProduct)                                         // push dans tableau products[id]
            const nbProducts = getJson.length;                                  // definit le nbr d'objets contenu dans le tableau 

            localStorage.setItem('panier', JSON.stringify(localStorageTab)); // on met a jour le localstorage
            document.querySelector('.store span').textContent = nbProducts;      // afficher un ajout sur l'icone panier
        } 
        
    }else{                                                             // sit le panier n'existe pas
        localStorage.setItem('panier', JSON.stringify([idProduct]));  // on crée le panier
        document.querySelector('.store span').textContent = 1;

    }
}

//1.creer un modele panier (id,quantité,lens) dossier models
//2.adapter ajout panier (objets panier) [id, quantité,lens]=objet