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
    chooseOptions();
    // buyProducts();
});

function chooseOptions() {
    inquirer
        .prompt(
            [{
                type: "list",
                message: "menu options",
                choices: [
                    "View Product sales by department",
                    "Create new department"
                ],
                name: "options"
            }]
        ).then(function (response) {

            switch (response.options) {
                case "View Product sales by department":
                    displayProductSales();
                    break;
                case "Create new department":
                    CreateNewDepartment();
                    break;

            }
        });
};

function displayProductSales() {
    connection.query("SELECT departments.department_id,departments.department_name,departments.over_head_costs, SUM(product_sales),SUM(product_sales)-departments.over_head_costs AS total_profit FROM departments INNER JOIN products ON departments.department_name=products.department_name GROUP BY departments.department_name ORDER BY department_id;",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            exit();
        });
};
function CreateNewDepartment() {
    inquirer
        .prompt(
            [{
                type: "input",
                message: "department_name",
                name: "department_name"
            }, {
                type: "input",
                message: "over_head_costs",
                name: "over_head_costs"
            }
            ]
        ).then(function (response) {
            var departmentName = response.department_name;
            var overHeadCosts = parseFloat(response.over_head_costs);

            connection.query("INSERT INTO departments (department_name,over_head_costs) VALUES(?,?)", [departmentName, overHeadCosts],
                function (err, res) {
                    if (err) throw err;
                    connection.query("SELECT * FROM departments",
                        function (err, res) {
                            if (err) throw err;
                            console.table(res);
                            exit();
                        });
                });
        });
};

function exit() {
    inquirer
        .prompt({
            type: "list",
            message: "Do you want to continue or exit",
            name: "isExit",
            choices: ["continue", "exit"]
        })
        .then(function (response) {
            switch (response.isExit) {
                case "continue":
                    chooseOptions();
                    break;
                case "exit":
                    connection.end();
                    break;
            }
        });
};