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
        const { sentFrom, sentTo = [], date, attachments = false, memoType, body } = memoData;
        const newMemo = new Memo({ sentFrom, sentTo, date, attachments, memoType, body });
        return this.memoRepository.create({ ...newMemo });
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
            throw { message: 'No se pudo encontrar un memo con estos datos.', statusCode: 404 }
        }
        await this.memoRepository.delete(id)
    }

    async getAll() {
        return await this.memoRepository.getAll()
    }

    async findByDate(date) {
        return await this.memoRepository.findByDate(date)
    }

    async getById(id) {
        const memo = await this.memoRepository.getById(id)
        if (!memo) {
            throw { message: 'El memo no existe', statusCode: 404 }
        }
        return memo
    }

    async getByKeywords(keywords) {
        return await this.memoRepository.findByKeywords(keywords);
    }

    async getTotalCount() {
        return await this.memoRepository.getTotalCount();
    }

    async getMemoDetails(id) {
        const memo = await this.memoRepository.getMemoDetails(id);
        if (!memo) {
            throw { message: 'Memo no encontrado', statusCode: 404 };
        }
        return memo;
    }
}