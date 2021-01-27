/* ENREGISTRER URL */
const URL = "http://localhost:3000/api/cameras/";

/*RECUPERER LES CAMERAS DEPUIS L'URL*/

fetch(URL, {method: "GET"})
    .then(response => response.json())                                      //convertit le resultat au format json
    .then(cameras => {console.log(cameras);                                 //convertit le resultat sur la console 
        cameras.forEach(camera =>{
            appearCamera(camera);
        });
      })
    .catch(err => console.log("Houston we have a problem", err)); 

    // 1.recuperer le localstorage"panier" 
    // 2.recuperer les produitse du panier avec methode Get utilisé dans product (id) boucle pour recuperer id
    // 3.afficher les produits du panier (for each)
    // 4. faire product.js