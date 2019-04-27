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
    console.log("\n");
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
            head: ['ID', 'Product Name', 'Department', 'Price', 'Stock'],
            colWidths: [5, 40, 25, 10, 10]
            });
                
        for (i = 0; i < result.length; i++) {
            table.push(
                [ result[i].item_id, result[i].product_name, result[i].department_name, result[i].price.toFixed(2), result[i].stock_quantity ]
            );
        }
        console.log(table.toString());
        display_menu();
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
        display_menu();
    });
    
}

function add_inventory() {
    let sql = `SELECT * FROM products`;
    connection.query(sql, function (err, result) {
        if (err) throw err;

        let table = new Table({
            head: ['ID', 'Product Name', 'Price', 'Quantity'],
            colWidths: [5, 40, 10, 10]
            });
            
        let products = [];

        for (i = 0; i < result.length; i++) {
            table.push(
                [ result[i].item_id, result[i].product_name, result[i].price.toFixed(2), result[i].stock_quantity ]
            );
            products.push(result[i].product_name);
        }
        console.log(table.toString());
    
        inquirer.prompt([
            {
                type: "list",
                name: "userItem",
                message: "What item do you want to update? ",
                choices: products
            },
            {
                type: "prompt",
                name: "userAmount",
                message: "How many do you want to add? "
                // add validate
            }
            ]).then( function (user) { 
                console.log(user.userItem);

                let index = products.indexOf(user.userItem);

                let sql = `UPDATE products SET ? WHERE ?`;
                let values = [{
                        stock_quantity: result[index].stock_quantity + parseInt(user.userAmount)
                    },{
                        item_id: index + 1
                    }];

                connection.query(sql, values, function (err, result) {
                    if (err) throw err;                            
                    //console.log(result.affectedRows + " products updated!\n");
                });
                // console.log(query.sql);
                console.log("\nYou now have " + values[0].stock_quantity + " of " + result[index].product_name);
                display_menu();
            });
    });
}

function add_product() {
    inquirer.prompt([
        {
            type: "prompt",
            name: "itemName",
            message: "What is the name of the item? ",
        },
        {
            type: "prompt",
            name: "itemDepartment",
            message: "What department does this item belong? ",
        },
        {
            type: "prompt",
            name: "itemPrice",
            message: "What is the unit price of the item? ",
        },
        {
            type: "prompt",
            name: "itemAmount",
            message: "How many of the items do you have? "
            // add validate
        }
        ]).then( function (user) { 
            // console.log(user.userItem);

            let sql = `INSERT INTO products SET ?`;
            let values = {
                    product_name: user.itemName,
                    department_name: user.itemDepartment,
                    price: parseFloat(user.itemPrice).toFixed(2),
                    stock_quantity: parseInt(user.itemAmount)
                };

            connection.query(sql, values, function (err, result) {
                if (err) throw err;                            
                console.log(result.affectedRows + " products updated!\n");
            });
            // console.log(query.sql);
            //console.log("\nYou now have " + values[0].stock_quantity + " of " + result[index].product_name);
            display_menu();
        });
}

