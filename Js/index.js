const callApi = async function () {
    try {
        let response= await fetch("http://localhost:3000/api/teddies")
        if (response.ok) {
            let data = await response.json()
            console.log(data)

            data.forEach(value => {
                console.log(value)  
                let article = document.createElement("article")
                document.querySelector(".products").appendChild(article)
                article.classList.add("card")
                
                let img = document.createElement("img")
                img.classList.add("card-img-top")
                img.setAttribute('src', `${value.imageUrl}`)
                article.appendChild(img)
                
                let title = document.createElement("h3")
                article.appendChild(title)
                title.classList.add("card-title")
                title.textContent = `${value.name}`

                let price = document.createElement("p")
                article.appendChild(price)
                price.classList.add("card-text")
                price.textContent= `${value.price}$`

                let desc = document.createElement("p")
                article.appendChild(desc)
                desc.classList.add("card-text")
                desc.textContent= value.description

                let btn = document.createElement("a")
                article.appendChild(btn)
                btn.classList.add("btn-primary", "add");
                btn.setAttribute("href", "produit.html?id=" + value._id)
                btn.textContent= "voir article"

                // test ecoute au click

                let add = document.querySelectorAll(".add")

                for (let i=0; i < add.length; i++) {
                    add[i].addEventListener("click", () => {
                        console.log("add")
                    }
                    )
                }
                 
               // fin de test

            });
            
        } else {
            console.error("response server : ", response.status)
        }   
    } catch(e) {
        console.log(e)
    }

    
};

callApi() ;









