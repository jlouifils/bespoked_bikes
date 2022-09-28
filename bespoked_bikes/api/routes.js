'use strict';

const express = require('express');
const router = express.Router();
const SalePerson = require("./models").salePerson;
const Customer = require('./models').Customer;
const Product = require('./models').Product;
const Discount = require('./models').Discount;
const client = require('./models').Client;
const Sales = require('./models').Sales;
const bcrypt = require('bcryptjs');
const authorized = require('basic-auth');
const { Client } = require('./model');

router.param("id", function(req,res,next,id){
  SalePerson.findById(req.params.id, function(err, doc){
      if(err) return next(err);
      if(!doc) {
          err = new Error("Not Found");
          err.status = 404;
          return next(err);
      }
      req.SalePerson = doc;  
      return next();
  }).populate('user');    
});
// AUTHENTHICATE USERS
const authUser = (req, res, next) => {

  Client.findOne({ emailAddress: authorized(req).name}, function(err, user){
    if(client) {
      const auth = bcrypt.compareSync(authorized(req).pass, user.password);
      if(auth) {
        console.log(`Successful username ${user.emailAddress}`);
        req.currentUser = user;
        next(); 
      } else {
        err = new Error("failure");
        err.status = 401;
        next(err);
      }
    } else {
      err = new Error("User Not Found!");
      err.status = 401;
      next(err);
    }
  });
};



                                  /**CUSTOMER ROUTES */
//GET CUSTOMER
//ROUTE FOR CUSTOMER
router.get("/customer", function(req, res, next) {
  Customer.find({firstName: firstName})
              .populate('firstName', 'lastName', 'address', 'phone', 'start date')
              .exec(function(err,courses){
                  if(err) return next(err);
                  res.json(courses);
              });
});

//GET SALEPERSON
//ROUTE FOR SALEPERSON
router.get("/saleperson", function(req, res, next) {
    SalePerson.find({firstName: firstName})
                .populate('firstName', 'lastName', 'address', 'phone', 'start date','termination date', 'manager')
                .exec(function(err,courses){
                    if(err) return next(err);
                    res.json(courses);
                });
  });
  

//PUT SALEPERSON
// UPDATE SALEPERSON ROUTES
router.put("/saleperson/", authUser,  function(req, res, next) {
  SalePerson.findOneAndUpdate(
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        phone: req.body.phone,
        startDate: req.body.startDate,
        terminationDate: req.body.terminationDate,
        manager: req.body.manager
      }
    })
  
  .exec()
  .then(result =>{
    res.status(204).json(result);
  })
   .catch(err => {
  console.log(err);
  res.status(500);
  next(err)
  });
});

//GET SALES
//ROUTE FOR sales
router.get("/sales", function(req, res, next) {
    Sales.find({})
                .populate('product', 'date', 'price', 'saleperson', 'commission percentage')
                .exec(function(err,courses){
                    if(err) return next(err);
                    res.json(courses);
                });
  });

  //POST SALES
// ROUTE FOR CREATING SALES
router.post("/sales", function(req, res,) {
    const sale = new Sales ({
      product: req.body.Product.$set('name'), 
      salePerson: req.body.SalePerson.$set('firstName'),
      customer: req.body.customer,
      saleDate: req.body.saleDate,
    });
    sale.save().then(result =>{
      console.log(result);
      res.location('/api');
      res.status(201).json('Sales Created!');
    })
    .catch(err =>{
      console.log(err);
      res.status(400).json({error: err});
    });
  });

//GET PRODUCT
//ROUTE FOR PRODUCT
router.get("/product", function(req, res, next) {
    Product.find({})
                .populate('name', 'manufacturer', 'style', 'purchase price', 'sale price', 'QtyOnHand', 'commissionPercentage')
                .exec(function(err,courses){
                    if(err) return next(err);
                    res.json(courses);
                });
  });


//PUT PRODUCT
// UPDATE Product ROUTES
router.put("/product/", authUser,  function(req, res, next) {
    Product.findOneAndUpdate(
      ({_id: id}),
      {
        $set: {
          name: req.body.name,
          manufacturer: req.body.manufacturer,
          style: req.body.style,
          purchasePrice: req.body.purchasePrice,
          salePrice: req.body.salePrice,
          QtyOnHand: req.body.QtyOnHand,
          commissionPercentage: req.body.commissionPercentage
        }
      })
    
    .exec()
    .then(result =>{
      res.status(204).json(result);
    })
     .catch(err => {
    console.log(err);
    res.status(500);
    next(err)
    });
  });

//GET commission report
//ROUTE FOR SALEPERSON
router.get("/saleperson/commission", function(req, res, next) {
    SalePerson.find({firstName: firstName})
                .populate('firstName', 'lastName', Product.get('commission Percentage'), 'phone', 'start date','termination date', 'manager')
                .exec(function(err,courses){
                    if(err) return next(err);
                    res.json(courses);
                });
  });

//GET discount
//ROUTE FOR DISCOUNT
router.get("/discount", function(req, res, next) {
  SalePerson.find({firstName: firstName})
              .populate(Product.get('name'), 'beginDate', 'endDate', 'discountPercentage')
              .exec(function(err,courses){
                  if(err) return next(err);
                  res.json(courses);
              });
});

module.exports = router;