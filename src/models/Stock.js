export class Stock {
    static allowedStatuses = ["In Stock", "Out of Stock", "Low In Stock", "Discontinued"];

    constructor({
        id,
        image,
        productName,
        category,
        quantityPurchased,
        unitPrice,
        totalPrice,
        inStock,
        supplier,
        status = "In Stock"
    }) {
        this.id = id;
        this.image = image;
        this.productName = productName;
        this.category = category;
        this.quantityPurchased = quantityPurchased;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice || quantityPurchased * unitPrice;
        this.inStock = inStock;
        this.supplier = supplier;
        this.status = Stock.allowedStatuses.includes(status) ? status : "In Stock";
    }
}