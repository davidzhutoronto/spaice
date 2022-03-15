//spaice 
//Engineering Challenge - Software Engineer
//David Zhu

const Warehouse = require('./warehouse');
const Product = require('./product');
var fs = require('fs');
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('>');
rl.prompt();

let warehouses = [];
let warehouseCounter = 0;
let products = [];
let productCounter = 0;
let readyToWrite = true;
let contentToWrite = "";

//start command line program
rl.on('line', function (line) {
    readyToWrite = !readyToWrite;
    //menu - ADD PRODUCT
    if (line.slice(0, 11) === 'ADD PRODUCT') {

        let productName = line.split("\"")[1];
        let sku = line.split("\"")[2].trim();
        let foundSameSku = false;

        if (sku === "") {
            console.log("Must have a SKU!");
            return;
        }

        if (products.length >= 1) {
            for (let i = 0; i < products.length; i++) {
                if (products[i].sku === sku) {
                    console.log("ERROR ADDING PRODUCT PRODUCT with SKU " + sku + " ALREADY EXISTS\n");
                    foundSameSku = true;
                }
            }
        }

        //create new product object only if sku was not found from products[] array
        if (!foundSameSku) {
            products[productCounter] = new Product(productName, sku);
            productCounter++;
        }
    }

    //menu - ADD WAREHOUSE
    else if (line.slice(0, 13) === 'ADD WAREHOUSE') {

        //if 3rd para is not provides do this:
        if (line.split(" ")[3] === undefined) {

            let warehouseNo = parseInt(line.substring(14).trim());

            warehouses[warehouseCounter] = new Warehouse(warehouseNo);
            warehouseCounter++;
        } else { // if 3rd para is given do this:
            let warehouseNo = parseInt(line.substring(14).trim());
            let warehouseLimit = parseInt(line.split(" ")[3].trim());
            warehouses[warehouseCounter] = new Warehouse(warehouseNo, warehouseLimit);
            warehouseCounter++;
        }
    }

    //menu - STOCK
    else if (line.slice(0, 5) === 'STOCK') {

        let sku = line.split(" ")[1].trim()
        let warehouseNo = parseInt(line.split(" ")[2])
        let qty = parseInt(line.split(" ")[3])
        let foundInWarehouse = false;

        //find mathing product sku
        for (let i = 0; i < products.length; i++) {
            if (products[i].sku === sku) {

                //find mathing warehouse
                for (let j = 0; j < warehouses.length; j++) {
                    if (warehouses[j].warehouseNo === warehouseNo) {

                        //product list is empty in warehouse
                        if (warehouses[j].productList.length === 0) {
                            if (qty <= warehouses[j].stockLimit) {
                                warehouses[j].stock += qty
                                warehouses[j].addProduct(products[i], qty);
                            }
                            else {
                                warehouses[j].stock = warehouses[j].stockLimit;
                                warehouses[j].addProduct(products[i], stockLimit);
                            }
                        }

                        //product list not empty in warehouse
                        else {
                            for (z = 0; z < warehouses[j].productList.length; z++) {

                                //product found in warehouse productList
                                if (warehouses[j].productList[z].productItem.sku === sku) {

                                    foundInWarehouse = true;

                                    //if warehouse stock + new added product qty is smaller than stock limit
                                    if (warehouses[j].stock + qty <= warehouses[j].stockLimit) {
                                        warehouses[j].productList[z].productQuantity += qty;
                                        warehouses[j].stock += qty;
                                    } else {
                                        warehouses[j].productList[z].productQuantity += (warehouses[j].stockLimit - warehouses[j].stock);
                                        warehouses[j].stock = warehouses[j].stockLimit;
                                    }
                                }
                            }

                            //if not found in warehouse
                            if (!foundInWarehouse) {
                                if (warehouses[j].stock >= warehouses[j].stockLimit) {
                                } else if (warehouses[j].stock + qty <= warehouses[j].stockLimit) {
                                    warehouses[j].addProduct(products[i], qty);
                                    warehouses[j].stock += qty;
                                } else if (warehouses[j].stock + qty > warehouses[j].stockLimit) {
                                    warehouses[j].addProduct(products[i], warehouses[j].stockLimit - warehouses[j].stock);
                                    warehouses[j].productList[warehouses[j].productList.length - 1].productQuantity = warehouses[j].stockLimit - warehouses[j].stock
                                    warehouses[j].stock = warehouses[j].stockLimit;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    //menu - UNSTOCK
    else if (line.slice(0, 7) === 'UNSTOCK') {

        let sku = line.split(" ")[1].trim()
        let warehouseNo = parseInt(line.split(" ")[2])
        let qty = parseInt(line.split(" ")[3])
        let foundInWarehouse = false;

        //find mathing product sku
        for (let i = 0; i < products.length; i++) {
            if (products[i].sku === sku) {

                //find mathing warehouse
                for (let j = 0; j < warehouses.length; j++) {
                    if (warehouses[j].warehouseNo === warehouseNo) {

                        //product list is empty in warehouse
                        if (warehouses[j].productList.length === 0) {
                            console.log("No Product!");
                        }

                        //product list not empty in warehouse
                        else {
                            for (z = 0; z < warehouses[j].productList.length; z++) {

                                //product found in warehouse productList
                                if (warehouses[j].productList[z].productItem.sku === sku) {

                                    foundInWarehouse = true;

                                    //if unstock qty is greater than qty in warehouse
                                    if (qty > warehouses[j].productList[z].productQuantity) {
                                        warehouses[j].productList[z].productQuantity = 0;
                                        warehouses[j].stock -= warehouses[j].productList[z].productQuantity;
                                    } else {
                                        warehouses[j].productList[z].productQuantity -= qty;
                                        warehouses[j].stock -= qty;
                                    }
                                }
                            }

                            //if not found in warehouse
                            if (!foundInWarehouse) {
                                console.log("Not Found in the warehouse");
                            }
                        }
                    }
                }
            }
        }
    }

    //menu - LIST PRODUCTS
    else if (line.slice(0, 13) === 'LIST PRODUCTS') {

        for (let i = 0; i < products.length; i++) {
            console.log(products[i].productName + " " + products[i].sku);
        }
        console.log();
    }

    //menu - LIST WAREHOUSES
    else if (line.slice(0, 16) === 'LIST WAREHOUSES') {

        console.log('WAREHOUSES');
        for (let i = 0; i < warehouses.length; i++) {
            console.log(warehouses[i].warehouseNo);
        }
        console.log();
    }

    else if (line.slice(0, 14) === 'LIST WAREHOUSE') {

        let warehouseNo = parseInt(line.split(" ")[2]);

        //find warehouse
        for (let i = 0; i < warehouses.length; i++) {
            if (warehouseNo === warehouses[i].warehouseNo) {
                console.log("ITEM NAME                    ITME_SKU                   QTY");
                for (let j = 0; j < warehouses[i].productList.length; j++) {
                    console.log(warehouses[i].productList[j].productItem.productName + " " + warehouses[i].productList[j].productItem.sku + " " + warehouses[i].productList[j].productQuantity);
                }
            }
        }
    }

    //writting to file in batch of 2
    if (!readyToWrite) {
        contentToWrite += (line + '\n');
    } else if (readyToWrite) {
        contentToWrite += (line + '\n');
        fs.appendFile('commandLogHistory.txt', contentToWrite, function (err) {
            if (err) throw err;
        })
    }
    rl.prompt();
}).on('close', function () {
    console.log('Have a great day!');
    process.exit(0);
});