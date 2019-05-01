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
    console.log("\nWELCOME TO BAMAZON");
    buy_product();
}

function buy_product() {
    let sql = `SELECT * FROM products`;
    connection.query(sql, function (err, result) {
        if (err) throw err;

        //console.log(result);
        //console.log("\n");

        let table = new Table({
            chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
            head: ['ID', 'Product Name', 'Price', 'Quantity'],
            colWidths: [5, 40, 10, 10]
            });
                
        for (i = 0; i < result.length; i++) {
            table.push(
                [ result[i].item_id, result[i].product_name, result[i].price.toFixed(2), result[i].stock_quantity ]
            );
        }
        console.log(table.toString());

        inquirer.prompt([
            {
                type: "prompt",
                name: "userItem",
                message: "What item do you want to buy? (Enter ID) "
                // add validate
            },
            {
                type: "prompt",
                name: "userQuantity",
                message: "How many do you want to buy?"
                // add validate
            }
            ]).then( function (user) {

                let item = {
                    id: user.userItem - 1,
                    quantity: user.userQuantity
                };

                if (item.quantity >  0) {

                    if ( item.quantity < result[item.id].stock_quantity) {
                        
                        let sql = `UPDATE products SET ? WHERE ?`;
                        let values = [{
                            stock_quantity: result[item.id].stock_quantity - item.quantity,
                            product_sales: result[item.id].price * item.quantity 
                        },{
                            item_id: item.id + 1
                        }];
                    // var query = connection.query(sql, values, function (err, result) {
                        connection.query(sql, values, function (err, result) {
                            if (err) throw err;                            
                            //console.log(result.affectedRows + " products updated!\n");
                        });
                        // console.log(query.sql);
                        console.log("\nYou have purchased " + item.quantity + " of " + result[item.id].product_name);
                        console.log("The total price is $" + (item.quantity * result[item.id].price).toFixed(2) + "\n");
                        prompt();
                        
                    } else {
                        console.log ("Insufficient Quantity!!!");
                        prompt();
                    }
                    
                } else {
                    prompt();
                }
            });
    });
}

function prompt() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "userChoice",
            message: "Do you want to make another transaction?"
        }
    ]).then( function (user) {
        if (user.userChoice) {
            buy_product();
        } else {
            process.exit();
        }
    });
}
