/*LIER LES PRODUITS AU PANIER*/ 
/*1 selectionner l'ajout au panier*/ 
let cart = document.querySelectorAll(".add-cart");

/*2 créer l'action "ajouter au panier"*/ 
for (let i = 0; i < cart.length; i++) {         /*préciser l'action "ajout"*/ 
    cart[i].addEventListener('click', () => {   /*déclencheur click*/ 
        console.log('added to cart');           /*appliquer le résultat dans console*/
        cartNumbers(products[i]);            
    })/*??n'affiche pas un produit en particulier dans la console ??*/
}

/*3 indiquer le nombre de produits ajouter au panier*/ 
function cartNumbers(products) {
    let productNumbers = localStorage.getItem('cartNumbers');      /*indiquer au localStorage l'ajout d'un produit*/
    productNumbers  = parseInt(productNumbers);                    /*resultat du premier ajout*/

    if( productNumbers ) {                                           /*indiquer au localStorage l'ajout d'autres produits*/
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.store span').textContent = productNumbers + 1;      /* afficher un ajout sur l'icone panier*/
        }                                                                           /*résultat du autre ajout*/ 
        else{
            localStorage.setItem('cartNumbers', 1);                                 /*OU résultat sans ajout*/ 
            document.querySelector('.store span').textContent = 1;

        }
        setItems(products);
}

