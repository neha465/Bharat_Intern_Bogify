const {check, validationResult} = require('express-validator');


exports.register =[
check("email").isEmail().withMessage("please fill all the fields"),
check("username").isLength({min:3}).withMessage("minimum 3 character required"),
check("password").isLength({min:8}).withMessage('minimum 8 character required'),
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
]

exports.login = [
  check("email").isEmail().withMessage("please fill all the fields"),
  check("password").isLength({min:8}).withMessage('minimum 8 character required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
]

exports.createBlog =[
  check("title").isLength({min:3}).withMessage("title need atleast 3 character"),
  check("description").isLength({min:5}).withMessage("description need atleast 5 character"),
  check("image").exists(),check("user").exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
]