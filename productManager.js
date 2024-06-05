moment.locale('vi')
let products = []
let indexProduct

function renderProducts() {
    const productTable = document.getElementById('productTable');
    productTable.innerHTML = '';
    products.map((product, index) => {
        const row = `<tr ondblclick="showInfo()" onclick="selectProduct(${index})">
            <td>${index+1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.date}</td>
        </tr>`
        productTable.innerHTML += row;
    });
}
const selectProduct = (index) => {
    indexProduct = index;
    document.getElementById('productName').value = products[index].name;
    document.getElementById('productPrice').value = products[index].price;
}
const addProduct = ()=>{
    const productName = document.getElementById('productName');
    const productPrice= document.getElementById('productPrice');
    const newProduct = {
        name: productName.value.trim(),
        price: productPrice.value.trim(),
        date: moment(new Date()).format('LL - h:mm:ss')
    }
    
    if(productName != "" && productPrice != ""){
        products = [...products,newProduct]
        renderProducts();
        productName.value = "";
        productPrice.value = "";
    }
}
const updateProduct = ()=>{
        products[indexProduct].name = document.getElementById('productName').value;
        products[indexProduct].price = document.getElementById('productPrice').value;
    products[indexProduct].date = moment(new Date()).format('LL - h:mm:ss')
        renderProducts();
}
const deleteProduct = ()=>{
    const productName = document.getElementById("productName").value
    products=products.filter((product)=>product.name!=productName)
    renderProducts(); 
    productName.value = "";
}
const sortProductByPrice=()=>{
    products.sort((item1, item2) => item2.price-item1.price)
    renderProducts()
}
const sortProductByDate=()=>{
    products.sort((item1, item2) => {
        return moment(item2.date, 'LL - h:mm:ss').valueOf() - moment(item1.date, 'LL - h:mm:ss').valueOf()
    })
    renderProducts()
}
//Double click on product
const showInfo =()=>{
    const newProducts=[...products]
    const {name, price} = newProducts[indexProduct]
    alert(`     Tên: ${name}
    \ Giá: ${price} `)
}

let searchedProducts = new Set();
const searchProduct = () => {
    const inputName = document.getElementById("productName").value;
    const inputPrice = document.getElementById("productPrice").value;
    let checkValid = false;
    for (let product of products) {
        if (product.name === inputName || product.price === inputPrice) {
            searchedProducts.add(product);
            checkValid = true;
        }
    }
    if(checkValid === false) {
        alert("Không tìm thấy sản phẩm này")
    }
    else{
        viewSearchedProducts()
    }
}
const viewSearchedProducts = () => {
    const productTable = document.getElementById('productTable');
    productTable.innerHTML = '';
    for (let product of searchedProducts) {
        const row = `<tr ondblclick="showInfo(${product.id})" onclick="selectProduct(${product.id})">
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.date}</td>
        </tr>`;
        productTable.innerHTML += row;
    }
}

const fetchUsers=()=> {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://jsonplaceholder.typicode.com/users';
        fetch(apiUrl)
            .then(response => {
                if (response.ok) {
                    return resolve(response.json()) ;
                }
                else {
                    return reject(new Error(response.statusText));
                }
            })
            .catch (error=> {
                console.error(error);
            })
    });
}

const displayUsers=()=> {
    fetchUsers()
        .then(data => {
            const userNames = data.map(user => user.name);
            const userName = document.getElementById('userName');
            userName.innerHTML = `Người dùng: ${userNames[0]}`
        })
        .catch(error => {
            console.error(error);
        });
}
document.addEventListener('DOMContentLoaded', displayUsers);
