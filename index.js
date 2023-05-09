import products from './modules/db.js'

let cont = document.querySelector('.container')

let data_showFive = document.querySelector('button[data-showFive]')
let data_showAll = document.querySelector('button[data-showAll]')
let shopped = document.querySelector('.shopped')
let bg = document.querySelector('.bg')
let data_cart = document.querySelector('button[data-cart]')
let cart_amount = document.querySelector('#cart_amount')
let cart_place = document.querySelector('.scroll-div')
let total_view = document.querySelector('#total')

let icons = ['price', 'rate', 'count']
let cart = []

reload(products, cont)

function reload(arr, place) {
    place.innerHTML = ""
    cart_amount.innerHTML = cart.length

    for (let item of arr) {
        let item_div = document.createElement('div')
        let img_content = document.createElement('img')
        let decr_div = document.createElement('div')
        let h3 = document.createElement('h3')
        let p = document.createElement('p')
        let row = document.createElement('div')
        let btn = document.createElement('button')

        for (let icon of icons) {
            let feature = document.createElement('div')
            let img = document.createElement('img')
            let span = document.createElement('span')

            feature.classList.add('feature')

            img.src = "./public/icons/" + icon + ".svg"
            span.innerHTML = typeof (item[icon]) !== 'undefined' ? item[icon] : item.rating[icon]

            feature.append(img, span)
            row.append(feature)
        }

        item_div.classList.add('item')
        img_content.classList.add('content')
        decr_div.classList.add('description')
        row.classList.add('row')

        h3.innerHTML = item.category
        p.innerHTML = item.description.slice(0, 80).toLowerCase()

        if (cart.includes(item.id)) {
            btn.innerHTML = "Добавлено"
            btn.classList.add('add-to-mark')
        } else {
            btn.classList.remove('add-to-mark')
            btn.innerHTML = "В избранное"
        }

        img_content.src = item.image


        item_div.append(img_content, decr_div)
        decr_div.append(h3, p, row, btn)
        place.append(item_div)

        btn.onclick = () => {

            if (cart.includes(item.id)) {
                cart = cart.filter(id => id !== item.id)
                btn.classList.remove('add-to-mark')
                btn.innerHTML = "B избранное"
            } else {
                cart.push(item.id)
                btn.classList.add('add-to-mark')
                btn.innerHTML = "Добавлено"
            }

            cart_amount.innerHTML = cart.length
            // console.log(cart);
            cart_reload()
        }

    }

}

let selected = []
let selectedItems = document.querySelectorAll('.selected-item');

function cart_reload() {
    cart_place.innerHTML = ''
    let temp = []
    let all_prices = 0

    for (let item of products) {
        for (let id of cart) {
            if (item.id === id) {
                temp.push({
                    ...item,
                    qt: 1
                })
            }
        }
    }



let count = 1;
let modalDel = document.querySelector('.modal-delete')
let modalNo = document.querySelector('.btn-no')
let modalYes = document.querySelector('.btn-yes')
let btnReg = document.querySelector('#btn-modal')
let modalReg = document.querySelector('.modal-reg')
let btnAccept = document.querySelector('#btn-accept')
let inputs = document.querySelectorAll('.inputs')


    for (let item of temp) {
        let selectedItem = document.createElement('div')
        let imgItem = document.createElement('img')
        let btn = document.createElement('button')
        let checkbox = document.createElement('input')
        let leftBlock = document.createElement('div')
        let centerBlock = document.createElement('div')
        let rightBlock = document.createElement('div')
        let pName = document.createElement('p')
        let pRate = document.createElement('p')
        let pCategory = document.createElement('p')
        let counterBlock = document.createElement('div')
        let decrementBtn =  document.createElement('button')
        let incrementBtn =  document.createElement('button')
        let counterValue = document.createElement('span')
        let imgTrush = document.createElement('img')
        let itemPrice = document.createElement('p')

        selectedItem.classList.add('selected-item')
        btn.classList.add('del-style')
        checkbox.classList.add('checkbox-style')
        imgItem.classList.add('img-product')
        pRate.classList.add('mt')
        counterBlock.classList.add('counter')
        decrementBtn.classList.add('counter-btn')
        incrementBtn.classList.add('counter-btn')
        counterValue.classList.add('counter-value')
        itemPrice.classList.add('item-price')
        imgItem.src = item.image
        delete item.image
        checkbox.type = "checkbox"
        checkbox.checked = true
        pName.innerHTML = item.title.slice(0, 20)
        pRate.innerHTML = `Rate: ${item.rating.rate}`
        pCategory.innerHTML = `Category: ${item.category}`
        decrementBtn.innerHTML = '-'
        incrementBtn.innerHTML = '+'
        counterValue.innerHTML = 1
        imgTrush.src =  './public/icons/trush.png'
        itemPrice.innerHTML = (item.price * count).toLocaleString('ru-RU') + '$' 
        btn.innerHTML = "Delete"

        selected.push(selectedItem);

        selectedItem.prepend(checkbox, leftBlock, centerBlock, rightBlock)
        leftBlock.append(imgItem)
        centerBlock.append(pName, pRate, pCategory)
        rightBlock.append(counterBlock, btn, itemPrice)
        counterBlock.append(decrementBtn, counterValue, incrementBtn)
        btn.prepend(imgTrush)
        
        cart_place.append(selectedItem)
        
        all_prices += item.price * item.qt



        checkbox.onchange = () => {
            if (checkbox.checked) {
                all_prices += item.price * item.qt
            } else {
                all_prices -= item.price * item.qt
            }
            total_view.innerHTML = `${all_prices.toLocaleString('ru-RU')} $`
        }

        btn.onclick = () => {
            modalDel.style.display = 'block'
            
            modalYes.onclick = () => {
                cart = cart.filter(id => id !== item.id)
                cart_reload()
                reload(products, cont)
                modalDel.style.display = 'none'
            }

            modalNo.onclick = () => {
                modalDel.style.display = 'none'
            }
        }

        selectedItems.forEach(item => {
            let checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
              
            }
          });

          btnReg.onclick = () => {
            modalReg.style.display = 'block'
          }

          btnAccept.onclick = () => {
            inputs.forEach(inp => {
                if(inp.value >= 4) {
                    modalReg.style.display = 'none'
                    cart = cart.filter(id => id !== item.id)
                    cart_reload()
                    reload(products, cont)
                    } else {
                            inp.style.border = '2px solid red'
                    }
            })
            
          }

    decrementBtn.addEventListener('click', () => {
        if (count >= 2) {
          count--;
          counterValue.textContent = count;
          updateTotalSum();
        }
      });
      
      incrementBtn.addEventListener('click', () => {
        if (count < item.rating.count) {
          count++;
          counterValue.textContent = count;
          updateTotalSum();
        }
      });
      
      function updateTotalSum() {
        total_view.innerHTML = `${(all_prices * count).toLocaleString('ru-RU')} $`;
        itemPrice.innerHTML = (item.price * count).toLocaleString('ru-RU') + '$';
      }
      total_view.innerHTML = `${(all_prices * count).toLocaleString('ru-RU')} $`;
    }
}

const form = document.forms.sign_up


form.onsubmit = (event) => {
    event.preventDefault()

    selected.splice(0, 1)
    let user = {
        customer: {},
        selected
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        user.customer[key] = value
    })

    form.reset()

    console.log(user);
}

data_showFive.onclick = () => {
    reload(products.slice(0, 5), cont)
}
data_showAll.onclick = () => {
    reload(products, cont)
}

data_cart.onclick = () => {
    shopped.style.right = '0'
    bg.style.left = '0'
    bg.style.scale = '1'

}
bg.onclick = () => {
    shopped.style.right = '-33%'
    bg.style.scale = '0'
}

// {
//     buyer: {
//         name: "alex",
//         password: "23213123",
//         phone: "1232142424"
//     },
//     goods: [
//         {},
//         {},
//         {},
//         {}
//     ]
// }

