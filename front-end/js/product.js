/* ENREGISTRER URL */
const apiUrl = "http://localhost:3000/api/cameras/";

//cart = button html "ajouter"
//appearCamera = présentation de produit camera
//addCart =  action ajout au panier
//saveProductCart = sauvegarde des produis selectionnés dans le panier
//nbrItems = nombre d'ajout pour le même produit dans le panier

/*RECUPERER L'ID ET URL D'UN PRODUIT */
const parsedUrl = new URL(window.location.href);                  //créer un objet url a partir d'un "string"
const idProduct = parsedUrl.searchParams.get("id");               // indique un Id précis en fonction du produit selectionné

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

/*QUANTITE D'UN PRODUIT*/
const quantity = document.createElement("select")                          //création d'un input select

    for (let i = 0; i < [1, 2, 3, 4, 5, 6 , 7, 8, 9, 10].length; i++) {    // afficher une liste
        const nbrItems = document.createElement("option")//
            nbrItems.textContent = i + 1;
        quantity.appendChild(nbrItems);
    }

    let addCartButton = document.createElement("button")           // ajout button pour le panier                
        addCartButton.id ="add-cart"                               // ajout d'un id au button
        addCartButton.textContent = "Ajouter"
    
    article.appendChild(imgProduct)                                // <article>
    article.appendChild(content)                                   // <div>
        content.appendChild(nameProduct)                               // <h3>
        content.appendChild(priceProduct)                              // <p>
    article.appendChild(description)                               // <p>
    article.appendChild(quantity)                                  //<input>
    article.appendChild(addCartButton)                             // <button>
    document.getElementById("vintage-camera").appendChild(article) // div parent de l'article
}

/*INDIQUER L'AJOUT AU PANIER ET LOCALSTORAGE*/ 
function addCart() {
    let panier = localStorage.getItem('panier');                             //on recupere le local storage

    if(panier) {                                                             //si le panier existe deja
        const localStorageTab = JSON.parse(panier);                          // transforme en tableau
        if(localStorageTab.find(id=> id != idProduct)){                      // si l'id n'existe pas dans le tableau du localstorage != veut dire non egal
            localStorageTab.push(idProduct)                                  // push dans tableau products[id]
            const nbProducts = getJson.length;                               // definit le nbr d'objets contenu dans le tableau 

            localStorage.setItem('panier', JSON.stringify(localStorageTab)); // on met a jour le localstorage
            document.querySelector('.store span').textContent = nbProducts;  // afficher un ajout sur l'icone panier
        } 
        
    }else{                                                                  // si le panier n'existe pas
        localStorage.setItem('panier', JSON.stringify([idProduct]));        // on crée le panier
        document.querySelector('.store span').textContent = 1;
    }
}

//1.creer un modele panier (id,quantité,lens) dossier models
//2.adapter ajout panier (objets panier) [id, quantité,lens]=objet

 /*ETIQUETTE D'UN PRODUIT*/
 function etiquetteProduct() {
    let itemCamera = {
      _id: _id,
      image: imageUrl,
      name: name,
      lenses: value,
      quantité: quantité,
      price: price
    }
}