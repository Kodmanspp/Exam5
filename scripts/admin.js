const ENDPOINT = "http://localhost:1717";
const mainContainer = document.querySelector(".main__container");
const contactBtn = document.querySelector(".header__contact_btn");


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

//main items create 
const createPastry = async(pastry) => {
    pastry.forEach(element => {
        const mainItems = createElement("div", "main__items");


        const nameContent = createElement("div", "admin_main-name");
        const itemName = createElement("h2", "item__name", element.name);
        const editName = createElement("button", "edit_name button");

        const priceContent = createElement("div", "admin_main_price");
        const itemPriceText = createElement("p", "item__price_text", "Price: $");
        const itemPrice = createElement("p", "item__price", `${element.cost.toFixed(2)}`);
        const itemPriceEdit = createElement("button", "edit_price");


        mainItems.append();
        mainContainer.append(mainItems);
    });

}