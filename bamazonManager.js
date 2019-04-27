var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connect_db();
welcome();

function connect_db() {
    connection.connect(function(err) {
        if (err) throw err;
        //console.log("connected as id " + connection.threadId + "\n");
    });
}

function welcome() {
    console.log("\nWELCOME TO BAMAZON\n");
    display_menu();
}

function display_menu() {
    inquirer.prompt([
        {
            type: "list",
            name: "userItem",
            message: "Select Action: ",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ] 
        },

        ]).then( function (user) { 
            
            switch(user.userItem) {
                case "View Products for Sale":
                    view_products();
                    break;

                case "View Low Inventory":
                    view_lowinventory();
                    break;

                case "Add to Inventory":
                    add_inventory();
                    break;

                case "Add New Product":
                    add_product();
                    break;

                default:
                    process.exit();
            }
        });
}


function view_products() {
    let sql = `SELECT * FROM products`;
    connection.query(sql, function (err, result) {
        if (err) throw err;

        let table = new Table({
            head: ['ID', 'Product Name', 'Price', 'Stock'],
            colWidths: [5, 40, 10, 10]
            });
                
        for (i = 0; i < result.length; i++) {
            table.push(
                [ result[i].item_id, result[i].product_name, result[i].price.toFixed(2), result[i].stock_quantity ]
            );
        }
        console.log(table.toString());
    });
}

function view_lowinventory() {
    sql = `SELECT * FROM products WHERE stock_quantity < 5`;
    connection.query(sql, function (err, result) {
        if (err) throw err;

        let table = new Table({
            head: ['ID', 'Product Name', 'Stock Remaining'],
            colWidths: [5, 40, 18]
            });
                
        for (i = 0; i < result.length; i++) {
            table.push(
                [ result[i].item_id, result[i].product_name, result[i].stock_quantity ]
            );
        }
        console.log(table.toString());
    });
}

function add_inventory() {

}

function add_product() {

}