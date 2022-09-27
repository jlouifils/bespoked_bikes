'use strict';

const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

const ClientSchema = new Schema({
  firstName:{type:String, required: [true, "First name is required"]},
  lastName: {type: String, required: [true, "Last name is required"]},
  emailAddress: {type: String, required: [true, "email is required"]},
  password: {type: String, required: [true, "password is required"]},
});
const salePersonSchema = new Schema({
  firstName:{type:String, required: [true, "First name is required"]},
  lastName: {type: String, required: [true, "Last name is required"]}, 
  address: {type: String, required: [true, "please add address"]},
  phone: {type: INT, required: [true,"phone number is required" ]},
  startDate: {type:Date},
  terminationDate: {type:Date},
  manager:{type: String, required:[true, "manager name"]}
});

const customerSchema = new Schema({
  firstName: {type: String, required: [true, "First name is required"]},
  lastName: {type: String, required: [true, "Last name is required"]},
  address: {type: String, required: [true, "please add address"]},
  phone: {type: INT, required: [true, "phone number is required"]},
  startDate: {type:Date}
});

const ProductSchema = new Schema({
    Name: {type: String, required: [true, "product name"]},
    manufacturer: {type: String, required:[true, "manufactor"]},
    style: {type: String, required: [true, "style of product"]},
    purchasePrice: {type: INT, required:[true, "purchase price"]},
    salePrice: {type: INT,  required: [true,  "sale price"]},
    commissionPercentage: {type: INT, required: [true, "saleperson commission"]},
    QtyOnHand: {type: INT, required: [true, "numbers of product"]}
});

const SalesSchema = new Schema({
    product: {type: String, required:[true, "poduct name"]},
    sale: {type: String, required: [true, "sale price"]},
    salePerson: {type: String, required: [true, "name of sale person"]},
    customer: {type: String, required:[true, "name of customer"]},
    saleDate: {type: Date,  required: [true,  "sale date"]},
});

const DiscountSchema = new Schema({
    product: {type: String, required:[true, "poduct name"]},
    BeginDate: {type: Date, reuired:[true, "Begin sale price date"]},
    EndDate: {type: Date, required:[true, "last day for sale price"]},
    DiscountPercentage: {type: INT, required:[true, "discount precentage"]}

})

const Client = mongoose.model('Client', ClientSchema)

const SalePerson = mongoose.model('SalePerson', salePersonSchema);

const Customer = mongoose.model('Customer', customerSchema);

const Product = mongoose.model('Product', ProductSchema);

const Sales = mongoose.model('Sales', SalesSchema);

const Discount = mongoose.model('Discount', DiscountSchema)

module.exports = {
    Client, SalePerson, Customer, Product, Sales, Discount
}
