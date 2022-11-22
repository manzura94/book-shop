const inputs = document.querySelectorAll(".customer-input");
const dateInput = document.querySelector("input[type='date']");
const radios = document.querySelectorAll("input[type='radio']");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const form = document.getElementById("form");
const gift = document.querySelector(".gifts");
const submit = document.querySelector(".submit");
const order = document.querySelector(".order");
const modal = document.querySelector(".modal");
const modalResult = document.querySelector(".modal-result");
const cancel = document.querySelector(".cancel");
const modalParent = document.querySelector(".modal-wrap");

const error = {
  name: false,
  surname: false,
  date: false,
  street: false,
  house: false,
  flat: false,
  payment: false,
  gift: true,
};

const jsonData = {
  name: "",
  surname: "",
  date: "",
  street: "",
  house: "",
  flat: "",
  payment: "",
  gift: "",
};

submitBtn();
function submitBtn() {
  const check = Object.values(error).includes(false);
  if (!check) {
    submit.removeAttribute("disabled");
  } else {
    submit.setAttribute("disabled", "disabled");
  }
}

inputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    console.log(e.target.value, e.target.name);
    let value = e.target.value;
    let name = e.target.name;
    jsonData[name] = value;
    console.log(jsonData);
  });
});

inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    const errorMessage = Errors(input.value, input.name);
    console.log(input.value , input.name)
    if (errorMessage) {
      displayError(input, errorMessage);
      error[input.name] = false;
      submitBtn();
      return;
    } else {
      error[input.name] = true;
      input.parentNode.classList.remove("error");
      submitBtn();
      return;
    }
  });
});

dateInput.addEventListener("change", (e) => {
  const errorMessage = Errors(dateInput.value, dateInput.name);

  if (!errorMessage) {
    error[dateInput.name] = true;
    submitBtn();
  }
});

radios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    let name = e.target.name;
    let value = e.target.value;
    jsonData[name] = value;
    error.payment = true;
    submitBtn();
  });
});

gift.querySelectorAll("input").forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    const gifts = gift.querySelectorAll("input");
    let count = 0;
    let name = e.target.name;
    let value = e.target.value
    console.log(name, value);
    let array = []
let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

for (var i = 0; i < checkboxes.length; i++) {
  array.push(checkboxes[i].value)
}

    for (const gift of gifts) {
      if (gift.checked) count++;
    }
  jsonData.gift = array.join(', ')
    if (count <= 2) {
      error.gift = true;
      submitBtn();
      gift.parentNode.classList.remove("error");
      const message = gift.querySelector("span");
      if (message) message.remove();
    } else {
      error.gift = false;
      submitBtn();
      if (!gift.parentNode.classList.contains("error")) {
        gift.parentNode.classList.add("error");
        const span = document.createElement("span");
        span.className = "errorMessage";
        span.textContent = "Please choose only 2 gifts";
        gift.append(span);
      }
    }
  });
});

const create = (tagname, classname, parent) => {
  let tag = document.createElement(tagname);
  tag.classList.add(classname);
  return parent.appendChild(tag);
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const inputs = document.querySelectorAll("input");
  modal.classList.add("active");
  modalParent.classList.add("activ");
  modalResult.innerHTML = ''
  
  for(let key in jsonData){
        let contextDiv = create("div", "modal-div", modalResult);
        let context = create("p", "modal-context", contextDiv);
        let contextText = create("p", "modal-context", contextDiv);
        context.textContent = `${key.toUpperCase()}:`;
        contextText.textContent = jsonData[key];
        console.log(jsonData[key]);
    }

   

});

cancel.addEventListener("click", () => {
  modal.classList.remove("active");
  modalParent.classList.remove("activ");

});

order.addEventListener("click", () => {
 location.replace('/book-shop/pages/home/')
});

function displayError(input, message) {
  const span = input.parentNode.querySelector(".error");
  input.parentNode.classList.add("error");
  span.textContent = message;
}

function Errors(value, name) {
  switch (name) {
    case "name": {
      let message;
      if (!value.length) {
        message = "First name is required";
      } else if (value.length < 4) {
        message = "The length should be not less than 4 symbols";
      } else if (/\s/g.test(value)) {
        message = "Please enter without space";
      } else if (!/^[A-Za-z]+$/.test(value)) {
        message = "Please enter only letters, A-Z or a-z";
      }
      return message;
    }
    case "surname": {
      let message;
      if (!value.length) {
        message = "Last name is required";
      } else if (value.length < 5) {
        message = "The length should be not less than 5 symbols";
      } else if (/\s/g.test(value)) {
        message = "Please enter without space";
      } else if (!/^[A-Za-z]+$/.test(value)) {
        message = "Please enter only letters, A-Z or a-z";
      }
      return message;
    }
    case "date": {
      let message;
      if (!value.length) {
        message = "date is required";
      } else if (new Date(value) - new Date() <= 0) {
        message = "Please enter date not earlier than next day";
      }
      return message;
    }
    case "street": {
      let message;
      if (!value.length) {
        message = "street name is required";
      } else if (value.length < 5) {
        message = "The length should be not less than 5 symbols";
      }
      return message;
    }
    case "house": {
      let message;
      if (!value.length && typeof value === "number") {
        message = "House number is required";
      } else if (!value.length && typeof value === "string") {
        message = "Please enter only number";
      } else if (isNaN(Number(value)) || Number(value) <= 0) {
        message = "Please enter only positive numbers";
      }
      return message;
    }
    case "flat": {
      let message;
      console.log(!value.length && typeof value === "number" ,value ,  'flat');
      if (!value.length) {
        message = "flat number is required";
      } else if (
        Number(value) <= 0 &&
        value
          .split("-")
          .join("")
          .match(/^[1-9]+[0-9]*$/)
      ) {
        message = "Please enter only positive numbers";
      }
      return message;
    }
  }
}
