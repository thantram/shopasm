var express = require('express');
var router = express.Router();
var productPlantModel = require('../models/productPlant');

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API để quản lý sản phẩm
 */

/**
 * @swagger
 * /product/add-product:
 *   post:
 *     tags: [Product]
 *     summary: Thêm sản phẩm mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Cây Xương Rồng"
 *               price:
 *                 type: number
 *                 example: 150000
 *               type:
 *                 type: string
 *                 example: "Cây cảnh"
 *               image:
 *                 type: string
 *                 example: "url_to_image"
 *     responses:
 *       201:
 *         description: Thêm sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 type:
 *                   type: string
 *                 image:
 *                   type: string
 *       500:
 *         description: Lỗi khi thêm sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

router.post('/add-product', async function(req, res, next){
  const {name, price, type, image} = req.body;
  const newProducts = {name, price, type, image};
  try {
    const creatProducts = await productPlantModel.create(newProducts);
    res.status(201).json(creatProducts);
  } catch (error) {
    res.status(500).json({"status": false, "message":"Thất bại", "error": error});
  }
});

/**
 * @swagger
 * /product/get-all-product:
 *   get:
 *     tags: [Product]
 *     summary: Lấy toàn bộ sản phẩm
 *     responses:
 *       200:
 *         description: Lấy toàn bộ sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   type:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: Lỗi khi lấy sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

router.get('/get-all-product', async function (req, res, next){
  try {
    const product = await productPlantModel.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({"status": false , "message":"Thất bại","error":error});
  }
});

/**
 * @swagger
 * /product/get-productDetail/{id}:
 *   get:
 *     tags: [Product]
 *     summary: Lấy sản phẩm theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của sản phẩm cần lấy
 *     responses:
 *       200:
 *         description: Lấy sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 product:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     type:
 *                       type: string
 *                     image:
 *                       type: string
 *       404:
 *         description: Không tìm thấy sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy sản phẩm"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

router.get('/get-productDetail/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productPlantModel.findById(id);

    if (!product) {
      return res.status(404).json({ status: false, message: 'Không tìm thấy sản phẩm' });
    }
    res.status(200).json({ status: true, product });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi server', error });
  }
});

module.exports = router;
