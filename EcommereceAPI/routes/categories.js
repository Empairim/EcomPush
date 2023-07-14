var express = require("express");
var authMiddleware = require("../middleware/auth");
const { categoryModel } = require("../model/category");
var router = express.Router();


router.get("/", authMiddleware, async function(req, res, next) {
    try {
        const categories = await categoryModel.find();
        res.status(200).json({
            data: categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' });
    }
});

router.post("/addCategory", authMiddleware, async function(req, res, next) {
    try {
        const {
            name,
            tags,
            slug,
            image,
            icon,
            productCount,
        } = req.body;

        if (!(name && slug)) {
            return res.status(401).json({
                errors: [
                    "The name is required! all the data is being saved as default values ",
                ],
            });
        }

        const exists = await categoryModel.findOne({ slug });
        if (exists) {
            return res.status(401).json({
                errors: [
                    `The slug you are assigning is already assign to the ${exists} is `,
                ],
            });
        }

        const category = await categoryModel.create({
            name,
            tags,
            slug,
            image,
            icon,
            productCount,
        });

        res.status(201).send(JSON.stringify(category));
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
