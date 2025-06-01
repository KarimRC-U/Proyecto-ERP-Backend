import stockRepository from "../repositories/stockRepository.js"
import { Stock } from "../models/Stock.js"
import TokenService from "./tokenService.js"

export default class stockService {
    constructor() {
        this.stockRepository = new stockRepository()
        this.tokenService = new TokenService()
    }

    async create(stockData) {
        const {
            image,
            productName,
            category,
            quantityPurchased,
            unitPrice,
            totalPrice,
            inStock,
            supplier,
            status = "In Stock"
        } = stockData;

        const allStocks = await this.stockRepository.getAll();
        const duplicate = allStocks.find(
            stock =>
                stock.productName === productName &&
                stock.category === category &&
                stock.supplier === supplier
        );
        if (duplicate) {
            throw { message: 'Este producto ya existe con el mismo nombre, categoría y proveedor', statusCode: 400 };
        }

        const productId = await this.stockRepository.getNextProductId();

        const newStock = new Stock({
            image,
            productName,
            productId,
            category,
            quantityPurchased,
            unitPrice,
            totalPrice,
            inStock,
            supplier,
            status
        });

        return this.stockRepository.create({ ...newStock });
    }

    async getByName(productName) {
        const allStocks = await this.stockRepository.getAll();
        return allStocks.filter(stock => stock.productName === productName);
    }

    async getById(id) {
        const stock = await this.stockRepository.getById(id);
        if (!stock) {
            throw { message: 'Stock no encontrado', statusCode: 404 };
        }
        return stock;
    }

    async getTotalCategories() {
        const allStocks = await this.stockRepository.getAll();
        const categories = new Set(allStocks.map(stock => stock.category));
        return categories.size;
    }

    async getTotalItems() {
        const allStocks = await this.stockRepository.getAll();
        return allStocks.length;
    }

    async getTotalItemCost() {
        const allStocks = await this.stockRepository.getAll();
        return allStocks.reduce((sum, stock) => sum + (Number(stock.totalPrice) || 0), 0);
    }

    async getItemsInLowStock() {
        const allStocks = await this.stockRepository.getAll();
        return allStocks.filter(stock => stock.status === "Low In Stock");
    }

    async update(id, stockData) {
        const stockExists = await this.stockRepository.getById(id);
        if (!stockExists) {
            throw { message: 'Stock No Encontrado', statusCode: 404 }
        }
        const updatedStock = new Stock({ ...stockExists, ...stockData });
        return this.stockRepository.update(id, { ...updatedStock });
    }

    async delete(id) {
        const stockExists = await this.stockRepository.getById(id)
        if (!stockExists) {
            throw { message: 'Stock No Encontrado', statusCode: 404 }
        }
        await this.stockRepository.delete(id)
    }

    async getAll() {
        return await this.stockRepository.getAll()
    }
}