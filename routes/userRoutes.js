const express = require('express'); 
const router = express.Router();
const { registerUser, loginUser,
    currentUser,
   
     createBooking,managerApproval,adminApproval,getAllBookings 
} = require('../controllers/userController');
const validateToken=require("../middlewares/validateTokenHandler");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', validateToken,currentUser);
router.post('/booking',createBooking);
router.put('/booking/:id/manager',managerApproval);
router.put('/booking/:id/admin',adminApproval);
router.get('/bookings',getAllBookings);

module.exports = router;