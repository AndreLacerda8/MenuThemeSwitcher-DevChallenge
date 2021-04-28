const DarkMode = {
    html: document.querySelector('html'),
    check: document.querySelector('.checkbox'),
    ball: document.querySelector('.checkbox .ball'),

    checkTheme: false,
    checkFunction(){
        this.checkTheme = !this.checkTheme
        if(this.checkTheme){
            this.html.setAttribute('menu-theme', 'dark')
            this.ball.style.transform = 'translateX(2rem)'
            this.ball.style.backgroundColor = 'var(--text-primary)'
        }
        else{
            this.html.setAttribute('menu-theme', 'light')
            this.ball.style.transform = 'translateX(0rem)'
            this.ball.style.backgroundColor = 'var(--color-primary)'
        }
    }
}


const Aside = {
    openAside(){
        document.querySelector('aside')
            .classList.remove('close')
        document.querySelector('aside')
            .classList.add('open')
    },
    closeAside(){
        document.querySelector('aside')
            .classList.remove('open')
        document.querySelector('aside')
            .classList.add('close')
    },

    addedItems: [],

    totalPrice: 0,

    addToOrder(e){
        const id = Number(e.target.id.split('pizza')[1])
        const isAdded = this.addedItems.filter(idItem => idItem.id == id)
        if(isAdded.length == 0){
            this.addedItems.push({id: id, qtd: 1})
            this.updateItemsAside()
        }
        else{
            isAdded[0].qtd += 1
            this.updateItemsAside()
        }

    },

    listItemsadded: document.querySelector('aside ul'),

    updateItemsAside(){
        this.listItemsadded.innerHTML = ''
        this.addedItems.forEach((item, index) => {
            const id = index
            MenuPizzas.pizzas.forEach((pizza, index) => {
                if(item.id == index){
                    const element = document.createElement('li')
                    element.innerHTML = `
                    <div class="number-of-items">${item.qtd}</div>
                    <div class="name-price">
                        <strong>${pizza.name}</strong>
                        <span>$${pizza.price}</span>
                    </div>
                    <b>$${pizza.price * item.qtd}</b>
                    <button onclick="Aside.deleteItem(event)" id="item-${id}" class="delete-item">X</button>
                    `
                    this.listItemsadded.appendChild(element)

                    item.price = pizza.price * item.qtd
                }
            })
        })
        this.updateTotalPrice()
    },

    totalValue: document.querySelector('.total-value b'),
    payButton: document.querySelector('aside footer button b'),

    updateTotalPrice(){
        this.totalPrice = 0
        this.addedItems.forEach(item => {
            this.totalPrice += item.price
        })
        this.totalPrice = this.totalPrice.toFixed(2).split('.')
        this.totalValue.innerHTML = `
            $${this.totalPrice[0]}.<span>${this.totalPrice[1]}</span>
        `
        this.payButton.innerHTML = `
            $${this.totalPrice[0]}.<span>${this.totalPrice[1]}</span>
        `
    },

    buttonDeleteAll: document.querySelector('.options-aside #delete-all'),

    optionsAside(){
        this.buttonDeleteAll.classList.toggle('selected')

    },

    deleteItem(e){
        const id = e.target.id.split('-')[1]
        if(this.addedItems[id].qtd > 1){
            this.addedItems[id].qtd -= 1
            this.updateItemsAside()
        }
        else{
            this.addedItems.splice(Number(id), 1)
            this.updateItemsAside()
        }
    },

    deleteAllItems(){
        this.addedItems = []
        this.updateItemsAside()
        this.optionsAside()
    }

}


const MenuPizzas = {
    main: document.querySelector('body > main'),

    pizzas: [
        {
            name: 'Margherita',
            price: 6.5
        },
        {
            name: 'Hawai',
            price: 8
        },
        {
            name: '4 Seasons',
            price: 8
        },
        {
            name: '4 cheese',
            price: 9.5
        },
        {
            name: 'Teriyaki',
            price: 10
        },
        {
            name: 'Chiken Ranch',
            price: 5
        },
        {
            name: 'Double Pepperoni',
            price: 12
        },
        {
            name: 'Chicken with Catupiry',
            price: 6.5
        },
        {
            name: 'Ham and Mushrooms',
            price: 8
        },
    ],
    
    addPizzasDom(){
        this.pizzas.forEach((pizza, index) => {
            const cardElement = document.createElement('div')
            cardElement.classList.add('card')
            cardElement.innerHTML = 
                `<div>
                    <strong>Pizza</strong>
                    <h4>${pizza.name}</h4>
                    <b>$${pizza.price}</b>
                </div>
                <p id=pizza${index} onclick=Aside.addToOrder(event)>Add item</p>
                `
            this.main.appendChild(cardElement)
        })
    }
}

window.onload = MenuPizzas.addPizzasDom()