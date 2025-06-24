const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  getUserCountController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  contactController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//----------routing--------------

//REGISTER || POST
router.post("/register", registerController);

//LOGIN ||POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test route
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//contact form
router.post("/", contactController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

// get all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

//dashboard
//count user
router.get("/user-count", getUserCountController);

// export default router;
module.exports = router;
