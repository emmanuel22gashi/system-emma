let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");


   
function getTotal(){

    if(price.value != ''){

        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';}
    else{

        total.innerHTML = '';
        total.style.background = '#a00d02';



    }

}




let datapro;

if (localStorage.product != null ){

    datapro = JSON.parse(localStorage.product)
}
else{
let datapro = [];
}
submit.onclick = function(){

let newpro ={


    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value,
}
datapro.push(newpro)
localStorage.setItem('product' , JSON.stringify(datapro))

clearData()
showData()
}


function clearData(){

    title.value = '';
    price.value = '';
    taxes.value= '';
    ads.value = '';
    discount.value ='';
    total.innerHTML ='';
    count.value ='';
    category.value = '';


}


function showData(){

    let tabel = '';

    for (let i =0; i <= datapro.length; i++){

        tabel += <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            
            <td> <button id="updata">updata</button></td>
        <td> <button id="delete">delete</button></td>

        </tr>

    

    document.getElementById("tbody").innerHTML = tabel;
    let btndelatall = document.getElementById("delatAll");
    if(datapro.length < 0){

        btndelatall.innerHTML = "<button>Delete All</button>"}
    else{

        btndelatall.innerHTML = ''
    }    
    

}
}
showData()


function deleteData(i){


    datapro.splice(i ,1);
    location.product = JSON.stringify(datapro);
    showData()

}

function delatAll(){


    localStorage.clear;
    datapro.splice(0);
    showData();
}