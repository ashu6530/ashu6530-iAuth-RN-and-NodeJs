import { check,validationResult } from "express-validator";

export const validateUserSignup = () => [
    check('name')
        .trim()
        .not().isEmpty().withMessage('Name is required!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be 3 to 20 characters long'),

    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid email'),

    check('password')
        .trim()
        .not().isEmpty()
        .isLength({ min: 6, max: 14 })
        .withMessage('Password must be 6 to 14 characters long'),

    check('confirmPassword')
        .trim()
        .not().isEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Both passwords must be the same!');
            }
            return true;
        })
];

export const handleSignupValidation =(req,res,next)=>{
            const result = validationResult(req).array()
            if (!result.length) return next();
            const err = result[0].msg
            res.json({
                success:false,
                message:err

            })


}

export const validateUserSignin =()=>[
    check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Email is required'),

    check('password')
    .trim()
    .not().isEmpty()
    .withMessage('password is required')
]

