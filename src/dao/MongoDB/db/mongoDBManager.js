import mongoose from "mongoose";

export class ManagerMongoDB {

    #url
    constructor(url, collection, schema) {
        this.#url = url //Atributo privado
        this.collection = collection
        this.schema = new mongoose.Schema(schema)
        this.model = mongoose.model(this.collection, this.schema)
    }

    async _setConnection() {
        try {
            await mongoose.connect(this.#url)
            console.log("DB is connected")
        } catch (error) {
            return error
        }
    }

    async addElements(elements) { //Agrego 1 o varios elementos
        await this._setConnection()
        try {
            return await this.model.insertMany(elements)
        } catch (error) {
            return error
        }
    }

    async getElements() {
        await this._setConnection()
        try {
            return await this.model.find().lean()
        } catch (error) {
            return error
        }
    }

    async getElementById(id) { //Agrego 1 o varios elementos
        await this._setConnection()
        try {
            return await this.model.findById(id)
        } catch (error) {
            return error
        }
    }

    async updateElement(id, info) {
        await this._setConnection()
        try {
            return await this.model.findByIdAndUpdate(id, info)
        } catch (error) {
            return error
        }
    }

    async deleteElement(id) {
        await this._setConnection()
        try {
            return await this.model.findByIdAndDelete(id)
        } catch (error) {
            return error
        }
    }

    async paginateElements(filter, options){
        await this._setConnection()
        try{
            return await this.model.paginate(filter, options)
        }catch(error){
            return error
        }
    }

}