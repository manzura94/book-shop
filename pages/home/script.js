const create = (tagname, classname, parent) => {
  let tag = document.createElement(tagname);
  tag.classList.add(classname);
  return parent.appendChild(tag);
};

const wrapper = document.getElementById("wrapper");
const container = create("div", "container", wrapper);

//header

const header = create("header", "header", container);
const navbar = create("nav", "navbar", header);
const logotext = create("h1", "logotext", navbar);
logotext.innerText = "BookShop";

const listofnav = create("ul", "listOfMenu", navbar);
const navitem = create("li", "menu-item", listofnav);
const navitem2 = create("li", "menu-item", listofnav);
const navitem3 = create("li", "menu-item", listofnav);
const navitem4 = create("li", "menu-item", listofnav);

navitem.innerText = "Home";
navitem2.innerText = "Catalog";
navitem3.innerText = "About us";
navitem4.innerText = "Contact us";

const cartcont = create("div", "cart-wrapper", listofnav);
const cartimg = create("img", "menu-img", cartcont);
cartimg.src = "../../assets/icons/cart.svg";

// //homepage

const homepage = create("section", "homepage", container);
const homebanner = create("div", "homebanner", homepage);

const homeImage = create("img", "banner-img", homebanner);
homeImage.src = "../../assets/images/bookshop.jpeg";

const homeContext = create("div", "homeContext", homepage);
const context = create("h2", "context", homeContext);
context.innerText = "In order to succeed, you must read!";

const contextBtn = create("button", "contextBtn", homeContext);
contextBtn.innerText = "Buy now";

//catalog

const catalog = create("section", "catalog", container);

const catalogWrapper = create("div", "catalog-wrapper", catalog);
const catalogTitle = create("h2", "catalogTitle", catalogWrapper);
const catalogItems = create("div", "catalogItems", catalogWrapper);

catalogTitle.innerText = "Catalog";

const catalogOrder = create("div", "catalog-order", catalog);
const catalogOrderTitle = create("h2", "catalog-order-title", catalogOrder);
const catalogOrderItems = create("div", "catalog-order-items", catalogOrder);

catalogOrderTitle.innerText = "Order List";

let booksGlobal = [];
let books = fetch("../../data/books.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    booksGlobal = data;
    return data;
  });

(async function () {
  let newdata = await books;
  console.log(newdata);
  newdata.forEach((element) => {
    let item = create("div", "item", catalogItems);
    item.setAttribute("draggable", true);
    item.setAttribute("id", element.id);

    let itemImg = create("img", "item-img", item);
    itemImg.src = `${element.imageLink}`;
    itemImg.setAttribute("draggable", false);

    let itemInfo = create("div", "itemInfo", item);

    let author = create("p", "author", itemInfo);
    author.innerText = element.author;

    let price = create("span", "price", itemInfo);
    price.innerText = `$${element.price}`;

    let text = create("span", "text", item);
    text.innerText = element.title;

    let buttonWrap = create("div", "buttonWrap", item);
    let showmore = create("button", "showmore", buttonWrap);
    showmore.setAttribute("id", element.id);
    showmore.innerText = "Show More";

    let addtobag = create("button", "addtobag", buttonWrap);
    addtobag.setAttribute("id", element.id);
    addtobag.innerText = "Add to Bag";
  });

  const addButtons = document.querySelectorAll(".addtobag");
  addToCart(addButtons, newdata);

  const buttons = document.querySelectorAll(".showmore");
  showPopup(buttons, newdata);

  const boxes = document.querySelectorAll(".item");
  dragAndDrop(boxes);
})();

const addmorePanel = create("div", "addmore", catalogOrderItems);

//drag and drop

const dragAndDrop = (boxes) => {
  for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    box.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", e.target.id);
    });
  }
};

addmorePanel.addEventListener("drop", drop);

//popup

const showMorePanel = create("div", "showmoreDisplay", catalog);
const closeBtn = create("img", "closebtn", showMorePanel);
closeBtn.src = "../../assets/icons/close-btn.svg";
const showText = create("p", "showText", showMorePanel);
const showAuthor = create("p", "showAuthor", showMorePanel);
const showPrice = create("p", "showPrice", showMorePanel);

//addtocart page

function showPopup(items, data) {
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    item.addEventListener("click", function () {
      showMorePanel.classList.remove("showmoreDisplay");
      showMorePanel.classList.add("showMorePanel");
      const { description, price, author } = data.find(
        (el) => el.id == item.id
      );
      showAuthor.innerText = `author: ${author}`;
      showPrice.innerText = `price: $${price}`;
      showText.innerText = description;
    });
  }
}

closeBtn.addEventListener("click", function () {
  showMorePanel.classList.remove("showMorePanel");
  showMorePanel.classList.add("showmoreDisplay");
});

let orders = [];

const confirmWrapper = create('div', 'confirm-wrapper',catalogOrderItems)
const confirmOrder = create('button', 'confirm-order', confirmWrapper)
const confirmLink = create('a', 'confirm-link', confirmOrder)
confirmLink.setAttribute('href', '../orderpage')
const priceWrapper = create('div', 'price-wrapper', confirmWrapper)
const totalPrice = create('span', 'total', priceWrapper)
const total = create('span', 'total-wrapper', priceWrapper)
total.innerText = '20'
totalPrice.innerText = 'total price:'
confirmLink.innerText = "Confirm Order"

function renderOrder() {

  total.innerText = '$' + orders.reduce((acc, cur)=>{
    return acc+ cur.price
  },0)

  btnConfirm.disabled = orders.length == 0
  btnConfirmLink.disabled = orders.length == 0
 
  addmorePanel.innerHTML = "";
  orders.forEach(({ title, price, author, imageLink, id }) => {
    const parent = create("div", "order-container", addmorePanel);

    const closeButton = create("img", "close-order", parent);
    closeButton.src = "../../assets/icons/close-btn.svg";
    closeButton.setAttribute("id", id);
    closeButton.setAttribute("onclick", `removeOrder(${id})`);

    let itemImg = create("img", "item-img", parent);
    itemImg.src = `${imageLink}`;

    let itemInfo = create("div", "itemInfo", parent);

    let itemauthor = create("p", "author", itemInfo);
    itemauthor.innerText = author;

    let itemprice = create("span", "price", parent);
    itemprice.innerText = `$${price}`;

    let itemtext = create("span", "text", parent);
    itemtext.innerText = title;
  });
}


function addToCart(buttons, data) {
  console.log(data);
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener("click", function () {
      const item = data.find((el) => el.id == button.id);
      orders.push(item);
      renderOrder();
    });
  }
}

//remove orders

const removeOrder = (id) => {
  orders = orders.filter((el) => el.id != id);
  renderOrder();
};

/* drop targets */

const box = document.querySelector(".addmore");

box.addEventListener("dragenter", dragEnter);
box.addEventListener("dragover", dragOver);
box.addEventListener("drop", drop);

function dragEnter(e) {
  e.preventDefault();
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  const id = e.dataTransfer.getData("text/plain");
  const item = booksGlobal.find((el) => el.id == id);
  orders.push(item);
  renderOrder();
}


const btnConfirm = document.querySelector(".confirm-order")
const btnConfirmLink = document.querySelector(".confirm-link")
console.log(btnConfirmLink);

btnConfirm.addEventListener('click', ()=> console.log('hi'))

renderOrder()