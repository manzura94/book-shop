const form = document.getElementById('form')
const error = document.getElementsByClassName('error')
const nameIn = document.getElementById('nameIn')
const surname = document.getElementById('surname')
const date = document.getElementById('date')
const street = document.getElementById('street')
const number = document.getElementById('number')
const flat = document.getElementById('flat')
const cash = document.getElementById('cash')
const card = document.getElementById('card')
const pack = document.getElementById('pack')
const postcard = document.getElementById('postcard')
const discount = document.getElementById('discount')
const pencil = document.getElementById('pencil')

form.addEventListener('change', (e)=>{
    e.preventDefault()
    let name = e.target.name
    let value = e.target.value
    console.log(value.length);

    if(value.length){
    //  name.className = 'active'
    }
})










console.log(nameIn);