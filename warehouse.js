
class Warehouse {

    constructor(warehouseNo, stockLimit = 999999999) {
        this.warehouseNo = warehouseNo;
        this.stockLimit = stockLimit;
    }

    stock = 0;
    productList = [];

    addProduct(product, quantity) {
        let productItem = {
            productItem: product,
            productQuantity: quantity
        }
        this.productList.push(productItem);
    }
};


module.exports = Warehouse;