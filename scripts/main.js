const ENDPOINT = "http://localhost:1717";

const mainContainer = document.querySelector(".main__container");
const contactBtn = document.querySelector(".header__contact_btn");

const busketBtn = document.querySelector(".basket__btn");
const busketCount = document.querySelector(".basket__count");
let busket_counter = 0;
busketCount.textContent = busket_counter;

const busketArr = [];


// requests
const getData = async(route) => {
    const data = await fetch(`${ENDPOINT}/${route}`);
    return await data.json();
};


//Basic functions 
const createElement = (tag, className, text, innerHTML) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
}

const openModal = (overflow) => {
    overflow.style.opacity = 1;
    overflow.style.visibility = "inherit";
}

const closeModal = (overflow) => {
    overflow.style.opacity = 0;
    overflow.style.visibility = "hidden";
}

const valibleRecipe = (recipe) => {
    let result = "";
    recipe.forEach(function(element, index, arr) {
        if (index == arr.length - 1) {
            result += element;
            return result;
        } else {
            result += element + ", ";
        }
    });
    return result;
};


//main items create 
const createPastry = async(pastry) => {
    pastry.forEach(element => {
        const mainItems = createElement("div", "main__items");

        const itemImg = createElement("img", "item__img");
        itemImg.src = element.image;

        const itemName = createElement("h2", "item__name", element.name);
        const itemRecipe = createElement("p", "item__recipe", valibleRecipe(element.ingredients));
        const itemPrice = createElement("p", "item__price", `$ ${element.cost.toFixed(2)}`);
        const itemBusketBtn = createElement("button");
        if (element.inStock !== 0) {
            itemBusketBtn.className = "item__busket_btn in-stock__yes";
            itemBusketBtn.innerHTML = "add to cart";

        } else {
            itemBusketBtn.className = "item__busket_btn in-stock__no";
            itemBusketBtn.innerHTML = "Not avaliable";
            itemBusketBtn.disabled = "true";
        }

        itemBusketBtn.addEventListener("click", addToBusket(element, itemBusketBtn));
        itemBusketBtn.addEventListener("click", createBusketItems());

        mainItems.append(itemImg, itemName, itemRecipe, itemPrice, itemBusketBtn);
        mainContainer.append(mainItems);
    });

}

getData("pastry").then(createPastry);

getData("pastry").then(data => console.log(data));


//add pastry in busket
getData("pastry").then(data => {
    data.forEach(element => {
        const item = {
            name: element.name,
            sum: 0,
            count: 0,
        }
        busketArr.push(item);
    })
});

const addToBusket = (data, itemBusketBtn) => async() => {
    if (data.inStock > 1) {
        for (let i = 0; i < busketArr.length; i++) {
            if (data.name == busketArr[i].name) {
                busketArr[i].sum += data.cost;
                busketArr[i].count++;
                busket_counter++;
                busketCount.textContent = busket_counter;
            }
        }
        data.inStock -= 1;

    } else if (data.inStock == 1) {
        for (let i = 0; i < busketArr.length; i++) {
            if (data.name == busketArr[i].name) {
                busketArr[i].sum += data.cost;
                busketArr[i].count++;
                busket_counter++;
                busketCount.textContent = busket_counter;
            }
        }
        data.inStock -= 1;
        itemBusketBtn.className = "item__busket_btn in-stock__no";
        itemBusketBtn.innerHTML = "Not avaliable";
        itemBusketBtn.disabled = "true";

    } else {
        itemBusketBtn.className = "item__busket_btn in-stock__no";
        itemBusketBtn.innerHTML = "Not avaliable";
        itemBusketBtn.disabled = "true";
    }
}


// contact modal func
const contactModal = document.querySelector(".contact-modal");
contactBtn.addEventListener("click", () => {
    openModal(contactModal);
});

const closeContactModal = document.querySelector(".contact-modal__close");
closeContactModal.addEventListener("click", () => {
    closeModal(contactModal);
});


// busket modal func 
const busketModal = document.querySelector(".busket-modal");
const busketOpenModal = document.querySelector(".basket__btn");
const busketModalClose = document.querySelector(".busket-modal__close");
const createBusketItems = () => async() => {
    const busket = document.querySelector(".busket-modal");
    const busketItemContainer = createElement("div", "busket-modal__container");
    const busketLine = createElement("div", "busket-modal__line");
    const busketTotal = createElement("div", "busket-modal__total");
    const totalCreate = createElement("p", "busket-total", "Total:");
    const fullSum = createElement("p", "busket-full__sum");

    busketTotal.append(totalCreate, fullSum);
    busket.append(busketItemContainer, busketLine, busketTotal);

    let Fullsum = 0;
    const total = document.querySelector(".busket-full__sum");
    const container = document.querySelector(".busket-modal__container");
    container.innerHTML = '';
    busketArr.forEach((element, index, arr) => {
        if (element.count !== 0) {

            const item = createElement("div", "busket-modal__items");
            const text = createElement("div", "busket-item__text", null, `${element.name}<br>${element.count} items`);
            const sum = createElement("div", "busket-item__sum", `$ ${element.sum.toFixed(2)}`);

            item.append(text, sum);
            container.append(item);
            Fullsum += element.sum;
        };
    })
    total.textContent = `$ ${Fullsum.toFixed(2)}`;
}
const busketIsEmpty = () => async() => {
    busketArr.forEach(element => {
        if (element.count !== 0) {
            return false;
        }
    })
    return true;
}
const busketIsEmtyChecked = () => {
    const busket = document.querySelector(".busket-modal");
    if (busketIsEmpty) {
        const isEmptyNode = createElement("div", "busketIsEmpty", "Cart  is  empty");
        busket.append(isEmptyNode);
    } else {
        const busketItemContainer = createElement("div", "busket-modal__container");
        const busketLine = createElement("div", "busket-modal__line");
        const busketTotal = createElement("div", "busket-modal__total");
        const total = createElement("p", "busket-total", "Total:");
        const fullSum = createElement("p", "busket-fill__sum");

        busketTotal.append(total, fullSum);
        busket.appen(busketItemContainer, busketLine);
    };
}
busketIsEmtyChecked();



busketOpenModal.addEventListener("click", () => {
    openModal(busketModal);
});

busketModalClose.addEventListener("click", () => {
    closeModal(busketModal);
});