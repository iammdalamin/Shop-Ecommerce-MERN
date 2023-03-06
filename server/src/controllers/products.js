const Product = require("../models/ProductModel.js")

const fs = require("fs")
const slugify = require("slugify");
const ProductModel = require("../models/ProductModel.js");





exports.create = async (req, res) => {
    try {
        
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //Validation
        switch (true) {
            case !name?.trim():
                return res.json({ error: "Name is required" });
            case !description.trim():
                return res.json({ error: "Description is required" });
            case !price?.trim():
                return res.json({ error: "Price is required" });
            case !category?.trim():
                return res.json({ error: "Category is required" });
            case !quantity?.trim():
                return res.json({ error: "Quantity is required" });
            case !shipping?.trim():
                return res.json({ error: "Shipping is required" });
            case photo && photo.size > 1000000:
                return res.json({
                    error:"Image should be less than 1mb in size"
                })
        }

        //create product

        const product = new Product({ ...req.fields, slug: slugify(name) })
        
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.cntentType = photo.type;
        }
        await product.save();
        res.json(product)
    }catch(err) {
        console.log(err);
    }
}

exports.list = async (req, res) => {
    try {
        const products = await ProductModel.find({})
            .populate("category").select("-photo")
            .limit(12)
            .sort({ createAt: -1 })
        res.json(products)
    } catch (err) {
        console.log(err);
}

}

exports.photo = async(req, res) => {
    try {

        const product = await ProductModel.findById(req.params.productId).select("photo")
        if (product.photo.data) {
            res.set("Content-Type", product.photo.contentType)
            return res.send(product.photo.data)
        }
    } catch(err) {
        console.log(err);
    }
}

exports.singleProduct = async(req, res) => {
    try {

        const product = await ProductModel.find({slug:req.params.slug}).select("-photo")
        if (product) {
            return product
        }
    } catch(err) {
        console.log(err);
    }
}