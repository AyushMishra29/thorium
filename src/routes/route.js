const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")
const productController= require("../controllers/productController")
const middleware = require("../middleware/middleware.js")
const OrderController = require("../controllers/orderController")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUsers", middleware.middleware , UserController.createUser )
router.post("/createproduct", productController.createproduct )
//router.post("/createOrder", middleware.middleware , OrderController.createOrder )

// router.get("/getproductsData", productController.getproductsData)

// router.post("/updateproducts", productController.updateproducts)
// router.post("/deleteproducts", productController.deleteproducts)

//MOMENT JS
// const moment = require('moment');
// router.get("/dateManipulations", function (req, res) {
    
    // const today = moment();
    // let x= today.add(10, "days")

    // let validOrNot= moment("29-02-1991", "DD-MM-YYYY").isValid()
    // console.log(validOrNot)
    
//     const dateA = moment('01-01-1900', 'DD-MM-YYYY');
//     const dateB = moment('01-01-2000', 'DD-MM-YYYY');

//     let x= dateB.diff(dateA, "days")
//     console.log(x)

//     res.send({ msg: "all good"})
// })

module.exports = router;