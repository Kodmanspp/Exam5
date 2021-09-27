const ENDPOINT = "http://localhost:1717";

const mainContainer = document.querySelector(".main__container");
const contactBtn = document.querySelector(".header__contact_btn");

const busketBtn = document.querySelector(".basket__btn"); 
const busketCount = document.querySelector(".basket__count");
let busket_counter = 0;
busketCount.textContent = busket_counter; 

const busketArr = []; 

// requests

const getData = async(route) =>{
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

const closeModal = (overflow) => () => {
    overflow.style.opacity = 0;
    overflow.style.visibility = "hidden";
    document.querySelector(".modal__content").innerHTML = "";
}

const valibleRecipe = (recipe) =>{
    let result = ""; 
    recipe.forEach(function(element, index, arr){
        if(index == arr.length -1){
            result += element; 
            return result;    
        }
        else{
            result += element + ", "; 
        }
    });
    return result;  
};

//main items create 

const createPastry = async(pastry) =>{
    pastry.forEach(element => {
        const mainItems = createElement("div", "main__items"); 

        const itemImg = createElement("img", "item__img");
        itemImg.src = element.image;

        const itemName = createElement("h2", "item__name", element.name);
        const itemRecipe = createElement("p", "item__recipe", valibleRecipe(element.ingredients));
        const itemPrice = createElement("p", "item__price", `$ ${element.cost}`);
        const itemBusketBtn = createElement("button"); 
        if(element.inStock !== 0){
            itemBusketBtn.className = "item__busket_btn in-stock__yes";
            itemBusketBtn.innerHTML = "add to cart";
            

        }
        else{
            itemBusketBtn.className = "item__busket_btn in-stock__no";
            itemBusketBtn.innerHTML = "Not avaliable";
            itemBusketBtn.disabled = "true";
        }
        
        itemBusketBtn.addEventListener("click", addToBusket(element,itemBusketBtn)); 

        mainItems.append(itemImg, itemName, itemRecipe, itemPrice, itemBusketBtn);
        mainContainer.append(mainItems);
    });

}
getData("pastry").then(createPastry);
getData("pastry").then(data=> console.log(data));


//add to busket
getData("pastry").then(data => {
    data.forEach(element=>{
        const item = {
            name: element.name, 
            sum: 0, 
            count: 0,
        }
        busketArr.push(item);
    })
});
const addToBusket = (data, itemBusketBtn) => async()=> {
    if(data.inStock > 1){
        for (let i = 0; i < busketArr.length; i++) {
            if(data.name == busketArr[i].name){
                busketArr[i].sum += data.cost;
                busketArr[i].count++;
                busket_counter++;
                busketCount.textContent = busket_counter; 
            }
        }
        data.inStock -= 1; 

    }
    else if(data.inStock == 1){
        for (let i = 0; i < busketArr.length; i++) {
            if(data.name == busketArr[i].name){
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
        
    }
    else{
        itemBusketBtn.className = "item__busket_btn in-stock__no";
        itemBusketBtn.innerHTML = "Not avaliable";
        itemBusketBtn.disabled = "true"; 

    }
}
