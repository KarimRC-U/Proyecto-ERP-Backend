export class Stock {
    static allowedStatuses = ["Available", "Out of Stock", "Discontinued"];

    constructor({
        image,
        productName,
        productId,
        category,
        quantityPurchased,
        unitPrice,
        totalPrice,
        inStock,
        supplier,
        status = "Available"
    }) {
        this.image = image;
        this.productName = productName;
        this.productId = productId;
        this.category = category;
        this.quantityPurchased = quantityPurchased;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice || quantityPurchased * unitPrice;
        this.inStock = inStock;
        this.supplier = supplier;
        this.status = Stock.allowedStatuses.includes(status) ? status : "Available";
    }
}