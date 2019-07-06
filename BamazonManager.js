var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    chooseOptions();
    // buyProducts();
});
function chooseOptions(){
    inquirer
    .prompt(
        [{
            type: "list",
            message: "menu options",
            choices:[
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
            ],
            name: "options"
        }]
        ).then(function (response) {

            switch(response.options){
                case "View Products for Sale":
                    displayProducts();
                break;
                case "View Low Inventory":
                    displayLowInventory();
                break;
                case "Add to Inventory":
                    addToInventory();
                break;
                case "Add New Product":
                    addNewProduct();
                break;
            }
    });
};
function displayProducts(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
       exit();
    });
};
function displayLowInventory(){
    connection.query("SELECT * FROM products Where stock_quantity<5 ", function (err, res) {
        if (err) throw err;
        console.table(res);
        exit();
    });
};
function addToInventory(){
    var classNum=0;
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        classNum=res.length;
    });
    inquirer
    .prompt([{
            type: "input",
            message: "ID of the product you would like to add into inventory",
            name: "productId"
        },
        {
            type: "input",
            message: "how many units of the product you would like to add?",
            name: "quantity"
        }
    ])
    .then(function (response) {

        var chooseId = parseInt(response.productId);
        var chooseNum = parseInt(response.quantity);
        if(chooseId>classNum){
            console.log("Please choose correct item id!");
            addToInventory();
        }else{
        var stockNum;
        var newQuantity;
       connection.query(
            "SELECT * FROM products WHERE ?", {
                item_id: chooseId
            },
            function (err, res) {
                if (err) throw err;
                stockNum = parseInt(res[0].stock_quantity);
                newQuantity = stockNum + chooseNum;
                connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                                stock_quantity: newQuantity
                            },
                            {
                                item_id: chooseId
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log("Inventory updated");
                        exit();
                            
                        }); 
            });
        };
    });
};
function addNewProduct(){
    inquirer
    .prompt([{
            type: "input",
            message: "product_name",
            name: "product_name"
        },
        {
            type: "input",
            message: "department_name",
            name: "department_name"
        },
        {
            type: "input",
            message: "price",
            name: "price"
        },
        {
            type: "input",
            message: "quantity",
            name: "stock_quantity"
        }
    ])
    .then(function (response) {
        connection.query(
            "INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES(?,?,?,?);", 
            [response.product_name,response.department_name,response.price,response.stock_quantity],
            function (err, res) {
                console.log("Inventory updated!");
                exit();
            });
    });
   
};
function exit(){
inquirer
.prompt({
    type:"list",
    message:"Do you want to continue or exit",
    name:"isExit",
    choices:["continue","exit"]
})
.then(function(response){
    switch(response.isExit){
        case "continue":
            chooseOptions();
            break;
        case "exit":
            connection.end();
            break;
    }
});
};