const carrito = [
    {
        id: 198752,
        name: "Tinta DJ27 Color",
        price: 52.95,
        count: 3,
        premium: true
    },
    {
        id: 75621,
        name: "Impresora ticketera PRO-201",
        price: 32.75,
        count: 2,
        premium: false
    },
    {
        id: 54657,
        name: "Caja de rollos de papel para ticketera",
        price: 5.95,
        count: 3,
        premium: false
    },
    {
        id: 3143,
        name: "Caja de folios DIN-A4 80gr",
        price: 9.95,
        count: 2,
        premium: false
    }
];

//Function to print product information
function printProduct(product) {
    console.log("Id: " + product.id);
    console.log("Nombre: " + product.name);
    console.log("Precio: " + product.price);
    console.log("Cantidad: " + product.count);
    console.log("Premium: " + product.premium);
}

//Function to print array
function printArray(carrito) {
    carrito.forEach((product,index) => {
        console.log("----- PRODUCTO " + (index + 1) + " -----");
        printProduct(product);
    })
}

//Function to search and delete a product by id
function deleteProduct(carrito, idDelete) {
    for (product of carrito) {
        if (product.id === idDelete) {
            carrito.splice(carrito.indexOf(product), 1);
            return "Producto eliminado";
        }
    }
    return "Producto no encontrado";
}

//Function to calculate total
function calculateTotal(carrito) {
    let total = 0;
    for (product of carrito) {
        total += product.count * product.price;
    }
    return roundDecimal(total, 2);
}

//Function to round decimal
let roundDecimal = (number, precision) =>
    +(Math.round(number + ("e+" + precision)) + ("e-" + precision));

//Function to filter prime products
let filterPrime = (carrito) => carrito.filter(product => product.premium);

//Function to check shipping cost
function checkShipping(carrito) {
    for (product of carrito) {
        if (!product.premium) return "Este pedido tiene gastos de envío";
    }
    return "Pedido sin gastos de envío";
}

//Function to apply discount, if possible
function applyDiscount(carrito) {
    let total = calculateTotal(carrito);
    return (total > 100) ? total * 0.95 : total;
}



//Listing all products
console.log("----- LISTAR PRODUCTOS -----");
printArray(carrito);

//Deleting product with id 54657
console.log("\n----- ELIMINAR PRODUCTO -----");
console.log(deleteProduct(carrito, 54657));
console.log("Productos en la lista-> " + carrito.length);

//Getting total
console.log("\n----- CALCULAR TOTAL -----");
console.log("Total del carrito-> " + calculateTotal(carrito));

//Filtering prime products
console.log("\n----- FILTRAR PRIME -----");
let carritoPrime = filterPrime(carrito);
printArray(carritoPrime);

//Checking shipping costs
console.log("\n----- GASTOS DE ENVÍO -----");
console.log(checkShipping(carrito));
console.log(checkShipping(carritoPrime));

//Apply discount
console.log("\n----- APLICAR DESCUENTO -----");
console.log("Total sin descuento " + calculateTotal(carrito));
console.log("Total con descuento " + applyDiscount(carrito));




//Function to convert array into html list
function makeUL(carrito){
    let list = document.createElement('ul');
    carrito.forEach((product,index) =>{
        let item = document.createElement('li');
        item.id = "product"+index;
        list.appendChild(item);
        for(property in product){
            let itemProperty = document.createElement('div');
            itemProperty.id = property+index;
            itemProperty.className = property+"-class";
            item.appendChild(itemProperty);
            itemProperty.innerHTML += property+": "+product[property];
        }
    });
    return list;
}

document.getElementById('listToFill').appendChild(makeUL(carrito));