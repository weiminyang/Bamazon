var mysql = require("mysql");
require("dotenv").config();
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.password,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    displayProducts();
    // buyProducts();
});
var chooseId;
var chooseNum;
var classNum;

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        classNum=res.length;
        // console.log("class number "+classNum);
        buyProducts();
    });
};

function buyProducts() {
    inquirer
        .prompt([{
                type: "input",
                message: "Item id of the product you would like to buy",
                name: "productId"
            },
            {
                type: "input",
                message: "how many units of the product you would like to buy?",
                name: "quantity"
            }
        ])
        .then(function (response) {

            chooseId = parseInt(response.productId);
            chooseNum = parseInt(response.quantity);
            if(chooseId>classNum){
                console.log("Please choose correct item id!");
                buyProducts();
            }else{

            var stockNum;
            var newQuantity;
            var totalPrice=0;
            var productSales=0;
            var newSales;
            connection.query(
                "SELECT * FROM products WHERE ?", {
                    item_id: chooseId
                },
                function (err, res) {
                    if (err) throw err;

                    stockNum = parseInt(res[0].stock_quantity);
                    productSales = parseFloat(res[0].product_sales);
                    newQuantity = stockNum - chooseNum;
                    totalPrice = parseFloat(res[0].price)*chooseNum;
                    newSales = productSales+totalPrice;
                    
                    if (chooseNum > stockNum) {
                        console.log('Insufficient quantity! choose again!');
                        buyProducts();
                    } else {
                        connection.query(
                            "UPDATE products SET ?, ? WHERE ?;",
                            [{
                                    stock_quantity: newQuantity
                                },
                                {
                                    product_sales: newSales
                                },
                                {
                                    item_id: chooseId
                                }
                            ],
                            function (err, res) {
                                if (err) throw err;
                                console.log("Order placed! Total price is $"+totalPrice+".  Thank you!");
                                connection.query("SELECT * FROM products", function (err, res) {
                                    if (err) throw err;
                                    console.table(res);
                                    connection.end();
                                });

                            });
                    };
                });
            };
            
        });

};