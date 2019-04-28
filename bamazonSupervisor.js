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

function view_sales() {
    let sql = `SELECT departments.department_id, department_name, over_head_costs,
                    SUM(product_sales) AS 'product_sales',
                    (SUM(products.product_sales) - departments.over_head_costs) AS 'total_profit'
                FROM departments
                INNER JOIN products
                ON departments.department_id = products.department_id
                GROUP BY department_name, departments.department_id, departments.over_head_costs
                ORDER BY department_name;`;

    connection.query(sql, function (err, result) {
        if (err) throw err;

        let table = new Table({
            chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
            head: ['ID', 'Department Name', 'Over Head Costs', 'Product Sales', 'Total Profit'],
            colWidths: [5, 30, 20, 20, 20]
            });
                
        for (i = 0; i < result.length; i++) {
            table.push(
                [ result[i].department_id, result[i].department_name, result[i].over_head_costs, result[i].product_sales, result[i].total_profit ]
            );
        }
        console.log(table.toString());
        display_menu();
    });
}

function add_department() {
    inquirer.prompt([
    {
        name: "userDepartment",
        message: "What is the name of the new department?",
        type: "input",
        validate: (value) => {
            if (value.length < 1) {
                return "Please enter a valid name";
            } else {
                return true;
            }
        }
    }, {
        name: "userOverhead",
        message: "What is this departments overhead costs",
        type: "input",
        validate: (value) => {
            let valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a valid number'
        }
    }
    ]).then( function(user) {
        let sql = `INSERT INTO departments (department_name, over_head_costs)
                    VALUES (?, ?);`;
        connection.query(sql, [user.userDepartment, user.userOverhead], function (err, result) {
            if (err) throw err;
            
            console.log("Department was added");
        });

        let sql2 = `SELECT * FROM departments;`;

        connection.query(sql2, function (err, result) {
            if (err) throw err;

            let table = new Table({
                chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
                head: ['ID', 'Department Name', 'Over Head Costs'],
                colWidths: [5, 30, 20]
                });
                    
            for (i = 0; i < result.length; i++) {
                table.push(
                    [ result[i].department_id, result[i].department_name, result[i].over_head_costs ]
                );
            }
            console.log(table.toString());
            display_menu();

        });
    });
}

