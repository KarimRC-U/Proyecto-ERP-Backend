import memoRepository from "../repositories/memoRepository.js"
import { Memo } from "../models/Memo.js"
import TokenService from "./tokenService.js"
import bcrypt from 'bcrypt'

export default class memoService {
    constructor() {
        this.memoRepository = new memoRepository()
        this.tokenService = new TokenService()
    }

    async create(memoData) {
        const { memoNo } = memoData;

        const uniquememo = await this.memoRepository.findByNumber(memoNo);
        if (uniquememo) {
            throw { message: 'Este memo ya existe', statusCode: 400 };
        }

        const newmemo = new Memo(memoData);
        return this.memoRepository.create({ ...newmemo });
    }

    async update(id, memoData) {
        const existingMemo = await this.memoRepository.getById(id);

        if (!existingMemo) {
            throw { message: 'Memo no Encontrado', statusCode: 404 };
        }

        const updatedMemo = new Memo({ ...existingMemo, ...memoData });

        return this.memoRepository.update(id, { ...updatedMemo });
    }

    async delete(id) {
        const memoExists = await this.memoRepository.getById(id)
        if (!memoExists) {
            throw { message: 'Memo No Encontrado', statusCode: 404 }
        }
        await this.memoRepository.delete(id)
    }

    async getAll() {
        return await this.memoRepository.getAll()
    }

    async findByDate(date) {
        return await this.memoRepository.findByDate(date)
    }

    async findByNumber(memoNo) {
        const memo = await this.memoRepository.findByNumber(memoNo)
        if (!memo) {
            throw { message: 'El presupuesto no existe', statusCode: 404 }
        }
        return memo
    }

    async getByKeywords(keywords) {
        return await this.memoRepository.findByKeywords(keywords);
    }

    async getTotalCount() {
        return await this.memoRepository.getTotalCount();
    }
}