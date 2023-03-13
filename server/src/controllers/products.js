const Product = require("../models/ProductModel.js")

const fs = require("fs")
const slugify = require("slugify");
const ProductModel = require("../models/ProductModel.js");

const formidable = require("formidable");




exports.create = async (req, res) => {
    try {
        console.log(req.fields);
        console.log(req);        
       
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        console.log(photo);
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
        console.log(product);
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.status(201).json(
            {
                message: "Product Add Success",
                data:product
            }
        )
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

exports.singleProduct = async (req, res) => {
    console.log(req.params.slug);
    try {

        const product = await ProductModel.find({ slug: req.params.slug }).select("-photo")
        
        if (product) {
            
            console.log(product);
            return res.status(200).json({
                message: "Success",
                data:product
        })
        }
    } catch(err) {
        console.log(err);
    }
}

exports.productAdd = async (req, res) => {
    console.log(req.body);
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        console.log(fields);
    })
}




