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
    displayProducts();
    // buyProducts();
});
var chooseId;
var chooseNum;

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        buyProducts();
    });
}

function buyProducts() {
    inquirer
        .prompt([{
                type: "input",
                message: "ID of the product you would like to buy",
                name: "productId"
            },
            {
                type: "input",
                message: "how many units of the product you would like to buy?",
                name: "quantity"
            }
        ])
        .then(function (response) {

            chooseId = response.productId;
            chooseNum = parseInt(response.quantity);


            var stockNum;
            var newQuantity;
            connection.query(
                "SELECT stock_quantity FROM products WHERE ?", {
                    item_id: chooseId
                },
                function (err, res) {
                    if (err) throw err;

                    stockNum = parseInt(res[0].stock_quantity);

                    newQuantity = stockNum - chooseNum;
                    console.log(newQuantity);
                    if (chooseNum > stockNum) {
                        buyProducts();
                    } else {
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
                                connection.query("SELECT * FROM products", function (err, res) {
                                    if (err) throw err;
                                    console.table(res);
                                    connection.end();
                                });

                            });
                    };
                });
            
        });
}