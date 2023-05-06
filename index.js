import products from './modules/db.js'

let cont = document.querySelector('.container')
let data_showFive = document.querySelector('button[data-showFive]')
let data_showAll = document.querySelector('button[data-showAll]')
let shopped = document.querySelector('.shopped')
let bg = document.querySelector('.bg')
let data_cart = document.querySelector('button[data-cart]')
let cart_amount = document.querySelector('#cart_amount')
let howProduct = document.querySelector('.how-product')


let icons = ['price', 'rate', 'count']
let cart = []

reload(products, cont)

function reload(arr, place) {
    place.innerHTML = ""
    cart_amount.innerHTML = cart.length
    howProduct.innerHTML = cart.length
    
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
        btn.innerHTML = "В избранное"
    
        img_content.src = item.image
    
    
        item_div.append(img_content, decr_div)
        decr_div.append(h3, p, row, btn)
        place.append(item_div)



        let counter = document.querySelectorAll('.counter')
      

        const decrementBtn = document.querySelectorAll('.decrement');
        const incrementBtn = document.querySelectorAll('.increment');
        const counterValue = document.querySelectorAll('.value');
        let count = 2;
        
        counter.forEach((counter, index) => {
        
          decrementBtn[index].addEventListener('click', () => {
            if (count > 1) {
              count--;
              counterValue[index].textContent = count;
            }
          });
        
          incrementBtn[index].addEventListener('click', () => {
            count++;
            counterValue[index].textContent = count;
          });
        });

        let product = []
        let imgProduct = document.querySelectorAll('.img-product')
        let pName = document.querySelectorAll('.p-name')
        let pRate = document.querySelectorAll('.p-rate')
        let pBox = document.querySelectorAll('.p-box')
        let pRateTwo = document.querySelectorAll('.p-rate-2')
        let pBoxTwo = document.querySelectorAll('.p-box-2')
        let totalSum = document.querySelector('.total-sum')
        let checkboxContainer = document.querySelectorAll('.checkbox-container')
        const totalSumProduct = document.querySelectorAll('.total-sum-product');
        let totalProduct = 0;
        
        // item.forEach(item => {
        //   const price = item.price;
        //   const total = price * quantity;
        //   totalSum += total;
        // });
        
        


        btn.onclick = () => {



              if(cart.includes(item.id)) {
                cart = cart.filter(id => id !== item.id)
                btn.classList.remove('add-to-mark')
                btn.innerHTML = "B избранное"
                imgProduct.forEach(img => {
                    img.src = ''
                    pName.forEach(name => {
                        name.innerHTML = ''
                        name.classList.remove('block')
                    })
                    pRate.forEach(rate => {
                        rate.innerHTML = ''
                    })
                    pBox.forEach(box => {
                        box.innerHTML = ''
                    })
                    pRateTwo.forEach(rate => {
                        rate.classList.remove('block')
                    })
                    pBoxTwo.forEach(box => {
                        box.classList.remove('block')
                    })
                    checkboxContainer.forEach(boxCont => {
                        boxCont.classList.remove('block')
                    })
                    counter.forEach(cnt => {
                        cnt.classList.remove('block')
                    })
                    totalSum.innerHTML = '0'
                    totalSumProduct.forEach(product => {
                        product.innerHTML = ''
                      });
                    
                })
            } else {
                cart.push(item.id)
                btn.classList.add('add-to-mark')
                btn.innerHTML = "Добавлено"
                product.push(item)
                    imgProduct.forEach(img => {
                        img.src = item.image
                        pName.forEach(name => {
                            name.innerHTML = item.title.slice(0, 20).toLowerCase()
                            name.classList.add('block')
                        })
                        pRate.forEach(rate => {
                            rate.innerHTML = item.rating.rate
                        })
                        pBox.forEach(box => {
                            box.innerHTML = item.rating.count
                        })
                        pRateTwo.forEach(rate => {
                            rate.classList.add('block')
                        })
                        pBoxTwo.forEach(box => {
                            box.classList.add('block')
                        })
                        checkboxContainer.forEach(boxCont => {
                            boxCont.classList.add('block')
                        })
                        counter.forEach(cnt => {
                            cnt.classList.add('block')
                        })
                        totalSum.innerHTML =+ item.price
                        totalSumProduct.forEach(product => {
                            product.innerHTML = item.price
                          });
                    })
                 
            }

            cart_amount.innerHTML = cart.length
            howProduct.innerHTML = cart.length
            console.log(cart);
        }

    }

}


data_showFive.onclick = () => {
    reload(products.slice(0,5), cont)
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
    bg.style.left = '-100%'
}





