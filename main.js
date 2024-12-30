let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

function getTotal() {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result.toFixed(2); // Formatting to 2 decimal places
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

let datapro;

// Initialize datapro from localStorage
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = []; // Fixed the scope of datapro variable
}

submit.onclick = function() {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };

    if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
            datapro.push(newpro);
        }
    } else {
        datapro.push(newpro); // Corrected the placement of the else statement
    }

    localStorage.setItem('product', JSON.stringify(datapro));
    clearData();
    showData();
}

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function showData() {
    let tabel = '';

    for (let i = 0; i < datapro.length; i++) { // Changed condition to < instead of <=
        tabel += `
            <tr>
                <td>${i + 1}</td> <!-- Changed i to i + 1 for human-friendly indexing -->
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})">Update</button></td> <!-- Fixed onclick -->
                <td><button onclick="deleteData(${i})">Delete</button></td> <!-- Fixed onclick -->
            </tr>
        `;
    }

    document.getElementById("tbody").innerHTML = tabel;
    
    let btndelatall = document.getElementById("delatAll");
    if (datapro.length > 0) { // Changed condition to check for more than 0
        btndelatall.innerHTML = `<button onclick="delatAll()">Delete All (${datapro.length})</button>`;
    } else {
        btndelatall.innerHTML = '';
    }
}

showData();

function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(datapro)); // Fixed the storage update
    showData();
}

function delatAll() {
    localStorage.clear(); // Fixed the method call
    datapro.splice(0, datapro.length); // Clear the array
    showData();
}
