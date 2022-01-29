const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const createToken = async() => {
    const token = await jwt.sign({ _id: "123ret45456" }, "agdvasjhsjvsjbcscjksjcksjckaskcjq23rr2347wwwfhj", {
        expiresIn: "2 seconds"
    });
    // expiresIn: "2 minutes"
    console.log(token);

    const userVer = await jwt.verify(token, "agdvasjhsjvsjbcscjksjcksjckaskcjq23rr2347wwwfhj");
    console.log(userVer);
}

//Payload Payload Means Body Data

// router.get('/', async(req, res, next) => {
//     res.send({ message: 'OK Api is Working' });
// });

createToken();

router.get('/products', async(req, res, next) => {
    try {
        // const products = await prisma.product.findMany({});
        // const categories = await prisma.category.findMany({});
        // const categories = await prisma.category.findMany({
        //     include: { products: true } // if wants to show product name then include product table
        // });
        const products = await prisma.product.findMany({
            include: { Category: true } // if wants to show category name then include category
        })

        res.json(products);
        // res.json({
        //     products,
        //     categories
        // });
    } catch (error) {
        next(error);
    }
});
router.get('/products/:id', async(req, res, next) => { //:id it is a string convert in integer using Number(id)
    try {
        const { id } = req.params
        const product = await prisma.product.findUnique({
            where: {
                prod_id: Number(id)
            },
            include: { Category: true }, // if wants to category name add inclued
        })
        res.json(product);
    } catch (error) {
        next(error);
    }

});
router.post('/products', async(req, res, next) => {
    try {
        // const data = req.body
        // res.json(data);
        const product = await prisma.product.create({
            data: req.body,
            // data: {
            //     name: req.body.name,
            //     price: req.body.price
            // }
        })
        res.json(product);


    } catch (error) {
        next(error);
    }
});
router.delete('/products/:id', async(req, res, next) => { //:id it is a string convert in integer using Number(id)
    try {
        const { id } = req.params
        const deletedProduct = await prisma.product.delete({
            where: {
                prod_id: Number(id)
            },
        })
        res.json(deletedProduct);
    } catch (error) {
        next(error);
    }
});
router.patch('/products/:id', async(req, res, next) => { //:id it is a string convert in integer using Number(id)
    try {
        const { id } = req.params
        const updateProduct = await prisma.product.update({
            where: {
                prod_id: Number(id)
            },
            data: req.body,
            include: { Category: true }, // if wants to category name add inclued
        })
        res.json(updateProduct);
    } catch (error) {
        next(error);
    }
});

module.exports = router;