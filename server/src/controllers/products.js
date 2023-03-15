const Product = require("../models/ProductModel.js");

const fs = require("fs");
const slugify = require("slugify");
const ProductModel = require("../models/ProductModel.js");

const formidable = require("formidable");
const cloudinary = require("../utils/cloudinary.js");

exports.create = async (req, res) => {
  try {
    console.log(req.body);

    const { name, description, price, category, quantity, shipping } =
      req.fields;
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
          error: "Image should be less than 1mb in size",
        });
    }

    //create product

    const product = new Product({ ...req.fields, slug: slugify(name) });
    console.log(product);
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).json({
      message: "Product Add Success",
      data: product,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.list = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.singleProduct = async (req, res) => {
  console.log(req.params.slug);
  try {
    const product = await ProductModel.find({ slug: req.params.slug });

    if (product) {
      console.log(product);
      return res.status(200).json({
        message: "Success",
        data: product,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.productAdd = async (req, res) => {
  // console.log(req.body);
  try {
    const { email } = req.headers;
    console.log(email);
    const { name, description, photo, category, price, quantity, shipping } =
      req.body;
    // //Validation
    // switch (true) {
    //   case !name?.trim():
    //     return res.json({ error: "Name is required" });
    //   case !description.trim():
    //     return res.json({ error: "Description is required" });
    //   case !price?.trim():
    //     return res.json({ error: "Price is required" });
    //   case !category?.trim():
    //     return res.json({ error: "Category is required" });
    //   case !quantity?.trim():
    //     return res.json({ error: "Quantity is required" });
    //   case !shipping?.trim():
    //     return res.json({ error: "Shipping is required" });
      
    // }

    if (photo) {
      const res = await cloudinary.uploader.upload(photo, {
        upload_preset: "shop",
      });
      if (res) {
        // await ProductModel.create({
        //   email,
        //   name,
        //   price,
        //   quantity,
        //   category,
        //   shipping,
        //   description,
        //   photo: res.url,
        //   slug: slugify(name),
        // });

        const product = new ProductModel({
          ...req.body,
          email,
          slug: slugify(name),
        });
        console.log(product);
        await product.save();
        res.status(201).json({
          message: "Product Add Success",
          data: product,
        });
      }
    }
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong!",
      data: err,
    });
  }
};
