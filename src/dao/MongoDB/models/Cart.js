import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema} from "mongoose";
import paginate from "mongoose-paginate-v2";
import managerProduct from "../../../controllers/Product.js";

const url = process.env.URLMONGODB

const cartSchema = new Schema ({
    products:{
        type:[
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "products",
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default:[],
    }
})
cartSchema.plugin(paginate)
class ManagercartMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "cart", cartSchema)
        this.productModel = managerProduct.model
    }

    async addProductToCart(cartId, productId) {
        try {
            await this._setConnection();
            const cart = await this.model.findById(cartId);
            const indexProd = cart.products.findIndex(
                (product) => product.productId.equals(productId)
            );
            if (indexProd !== -1) {
                cart.products[indexProd].quantity += 1;
            } else {
                cart.products.push({productId: productId});
            }
            await cart.save();
            return cart.products;
        } catch (error) {
            return error;
        }
    }
    async updateQuiantity(idCarrito, idProducto, quant){
        try{
            await this._setConnection();
            const cart = await this.model.findById(idCarrito)
            const indexProd  = cart.products.findIndex(product=>product.productId.equals(idProducto))
            cart.products[indexProd].quantity = quant
            await cart.save();
            return cart.products[indexProd]            
        }catch(error){
            return (error)
        }
    }

    async populatedCarrito(id){
        const cart = await managerCart.getElementById(id)
        const carritopopulated= await cart.populate({path: "products.productId", model: managerCart.productModel})
        console.log(carritopopulated);
    }

    async deleteAllProducts(cart) {
        await this._setConnection();
        cart.products = [];
        await cart.save();
        return cart;
    }

    async deleteProduct(productId, cart){
        await this._setConnection();
        await cart.updateOne({
            $pull: { products: { productId } }
        });
        cart.save()
        return cart;
    }
}

export default ManagercartMongoDB