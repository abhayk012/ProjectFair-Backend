//path to resolve each request

const userController=require('../Controllers/userController')

const projectController=require('../Controllers/projectController')

const profileController=require('../Controllers/profileController')
//1 import express
const express=require("express");
const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const multerConfig=require ('../Middlewares/multerMiddleware')

//2 Create an object for the class router in Express
const router=new express.Router();

//3 define  path
//syntax
//router.http-request-method("path to resolve",()=>{
//     how to resolve the requst (controller function)
// })
router.post('/user/register',userController.register)

router.post('/user/login',userController.login)

router.post('/project/add',jwtMiddleware,multerConfig.single('projectimg'),projectController.addproject)

router.get('/project/home-project',projectController.getHomeproject)

// 5 get all projects
router.get('/project/all-project',jwtMiddleware,projectController.getAllprojects)

router.get('/project/user-project',jwtMiddleware,projectController.getuserprojects)

//7) edit user project
router.put('/project/edit/:id',jwtMiddleware,multerConfig.single("projectimg"),projectController.editUserProject)

//8) delete user project
router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteUserProject)

router.post('/profile/add',jwtMiddleware,multerConfig.single("profileimg"),profileController.addprofile)

router.get('/profile/user-profile',jwtMiddleware,profileController.getuserprofile)

router.put('/profile/update-profile/:id',jwtMiddleware,multerConfig.single("profileimg"),profileController.updateuserprofile)

router.delete('/profile/remove-profile/:id',jwtMiddleware,profileController.deleteUserProfile)

//4 export router
module.exports=router;