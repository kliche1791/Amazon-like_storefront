var mysql = require("mysql");
var inquirer = require("inquirer");
var id_item = 0;
var new_stock = 0;
var order = 0;
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazondb"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // run the start function after the connection is made to prompt the user
    Start();
  });

  function Start(){
    console.log("Products Availables on The Store...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;

      for (var i = 0; i < res.length; i++) {
        console.log("ID:"+res[i].item_id+" "+"Product: "+res[i].product_name+" Cost: "+res[i].price);
      }

      console.log("|----------------------------------------------------------------|");
      buyer();
    });

  }

  function buyer(){
    inquirer
    .prompt({
        name: "buyer",
        type: "input",
        message: "What is the ID of the item would you want to buy?"
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.buyer <= 10) {
        id_item = answer.buyer;
        quantyItem();
      }
      else {
        console.log("the ID is not valid");
        buyer();
      }
      
    });
    
  }

  function quantyItem(){
   
        inquirer
        .prompt({
            name: "quantity",
            type: "input",
            message: "How Many Orders do you want?"
        })
        .then(function(answer) {

          // based on their answer, either call the bid or the post functions
          connection.query("SELECT * FROM products WHERE item_id=?", [id_item], function(err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(id_item);
            
            for (var i = 0; i < res.length; i++) {
                console.log("database "+res[i].stock_quantity);
                if (answer.quantity <= res[i].stock_quantity) {
                
                    console.log("Your product is already delivered");
                    new_stock = res[i].stock_quantity - answer.quantity;
                    order = answer.quantity;
                    prodAvailable();
                  }
                  else {
                    console.log("Insufficient quantity!, Try with Less");
                    quantyItem();
                  }
              }
            
          });
          
          
        });
  }

  function prodAvailable(){
    console.log(new_stock);
   connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
        [
          new_stock
          ,
          id_item
        ],
        function(err, res) {
          if (err) throw err;
          console.log("only "+new_stock+" Available");
          totalSale();
        }
      );
    
}

function totalSale(){
  connection.query("SELECT * FROM products WHERE item_id=?", [id_item], function(err, res) {
    if (err) throw err;

    
    for (var i = 0; i < res.length; i++) {

      var total = res[i].price * order;
        console.log("Your Total Price is: "+ total);
        
      }
      console.log("|----------------------------------------------------------------|");
     reset();
  });
}

function reset(){
  inquirer
  .prompt({
    name: "reset",
    type: "list",
    message: "Would you like to buy more products?",
    choices: ["YES", "NO"]
  })
  .then(function(answer) {
   
    if (answer.reset === "YES") {
      Start();
    }
    else if(answer.reset === "NO") {
      connection.end();
    } 
  });
}