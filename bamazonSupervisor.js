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
                "View Products Sales by Department",
                "Create New Department",
                "Exit"
            ] 
        },

        ]).then( function (user) { 

            switch(user.userItem) {
                case "View Products Sales by Department":
                    view_sales();
                    break;

                case "Create New Department":
                    add_department();
                    break;

                default:
                    process.exit();
            }
        });
    }
