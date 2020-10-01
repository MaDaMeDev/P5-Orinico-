const actualUrl = new URLSearchParams(window.location.search)

const id = actualUrl.get("id")

const apiUrl = "http://localhost:3000/api/teddies/" + id


console.log(id)

const callApi = async function () {
    try {
        let response = await fetch(apiUrl)
        if (response.ok) {
            let data = await response.json()
            console.log(data)

            function detailProduct(data) {

                console.log(data) 
                let title = document.createElement("h3")
                title.classList.add("text-center")
                document.querySelector(".title-prod").appendChild(title)
                title.textContent = `${data.name}`
 
                let article = document.createElement("article")
                document.querySelector(".product").appendChild(article)
                article.classList.add("card")
                
                let img = document.createElement("img")
                img.classList.add("card-img-top")
                img.setAttribute('src', `${data.imageUrl}`)
                article.appendChild(img)

                let price = document.createElement("p")
                article.appendChild(price)
                price.classList.add("text-center")
                price.textContent = ` ${data.price}$`

                let desc = document.createElement("p")
                article.appendChild(desc)
                desc.textContent = `${data.description}`

                let inputGroup = document.createElement("div")
                article.appendChild(inputGroup)
                inputGroup.classList.add("input-group")

                let prepend = document.createElement("div")
                inputGroup.appendChild(prepend)
                prepend.classList.add("input-group-preprend")

                let label = document.createElement("label")
                prepend.appendChild(label)
                label.classList.add("input-group-text")
                label.textContent = "Couleur"

                let select = document.createElement("select")
                inputGroup.appendChild(select)
                select.classList.add("custom-select")
                select.setAttribute('id', "-colors")
                
                let optionSelect = document.createElement("option", "selected")
                select.appendChild(optionSelect)
                optionSelect.textContent = "Choisir la couleur"

                
                data.colors.forEach((color) => {
                    let option = document.createElement("option")
                    select.appendChild(option)
                    option.textContent = `${color}`

                })
                
                
                let btn = document.createElement("a")
                article.appendChild(btn)
                btn.classList.add("btn", "buy")
                btn.setAttribute("href", "#")
                btn.textContent = "Acheter"

                 // test ecoute au click

                let carts = document.querySelectorAll(".buy")

                let products = [ 
                    {
                        id : data._id,
                        name : data.name,
                        image : data.imageUrl,
                        desc : data.description,
                        price : data.price,
                        inCart : 0
                    }
                ]

                for (let i=0; i < carts.length; i++) {
                    carts[i].addEventListener("click", () => {
                        cartNumbers(products[i])
                        totalCoast(products[i])
                    })
                        
                }

                function cartNumbers(product) {
                    let productNumbers = localStorage.getItem("cartNumbers")

                    productNumbers = parseInt(productNumbers)

                    if (productNumbers ) {
                        localStorage.setItem("cartNumbers",productNumbers + 1)
                        document.querySelector(".cart span").textContent = productNumbers + 1
                    } else {
                        localStorage.setItem("cartNumbers", 1)
                        document.querySelector(".cart span").textContent = 1
                    }
                    
                    saveCard(product)
                }
                
                function saveCard (product) {
                    let cartItems = localStorage.getItem("productsInCart")
                    cartItems = JSON.parse(cartItems)

                    if (cartItems !== null) {

                        if(cartItems[product.id] == undefined) {
                            cartItems = {
                                ...cartItems,
                                [product.id] : product
                            }
                        }
                        cartItems[product.id].inCart += 1
                    } else {
                        product.inCart = 1
                        cartItems = {
                        [product.id]: product
                    }
                    }

                    
                  
                    localStorage.setItem("productsInCart" , JSON.stringify(cartItems))

                }


                function totalCoast (product) {
                    let cartCoast = localStorage.getItem("totalCoast")
                    

                    if (cartCoast != null) {
                        cartCoast = parseInt(cartCoast)
                        localStorage.setItem("totalCoast", cartCoast + product.price )
                    }else {
                        localStorage.setItem("totalCoast", product.price)
                    }
                }

                loadCartNumbers()

                function loadCartNumbers () {
                    let productNumbers = localStorage.getItem("cartNumbers")

                    if (productNumbers) {
                        document.querySelector(".cart span").textContent = productNumbers

                    }
                }
            } 

            detailProduct(data)

        } else {
            console.error("response server : ", response.status)
         }   
    } catch(e) {
        console.log(e)
      }
    
    
    
}

callApi() 


