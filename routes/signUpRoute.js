const express=require("express")
const routes=express.Router()
const signUpVendor=require("../controllers/signUpVendorController")
const signUpAdmin=require("../controllers/signUpAdmin")
const login=require("../controllers/logInController")
const getVendors=require("../controllers/getVendors")
const getVendorsById=require("../controllers/getVendorsById")
const categories=require("../controllers/getCategories")
const getCategoryById=require("../controllers/getCategoryById")
const updateVendorStatus=require("../controllers/updateVendorStatus")
const Auth=require("../middleware/Auth")
const RFPCreation = require("../controllers/RFPCreation")
const rfpview=require("../controllers/RFPView")
const updatingMultipleCategories=require("../controllers/updatingMultipleCategories")
routes.post("/registervendor",signUpVendor)
routes.post("/registeradmin",signUpAdmin)
routes.post("/login",login)
routes.get("/listvendors", getVendors)
routes.get("/getVendorsById",Auth,getVendorsById);
routes.get("/categories",categories);
routes.put("/updatevendorstatus/:id",Auth,updateVendorStatus)
routes.get("/getCategoryById/:id",Auth,getCategoryById)
routes.post("/submitRfp",RFPCreation)
routes.get("/rfpview",rfpview)
routes.put("/categories/update-multiple",Auth,updatingMultipleCategories)

module.exports=routes

