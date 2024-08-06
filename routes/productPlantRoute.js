var express = require('express');
var router = express.Router();
var productPlantModel = require('../models/productPlant');


/**
 * @swagger
 * /product/add_products:
 *   post:
 *     summary: thêm sản phẩm mới
 *     responses:
 *       200:
 *         description: thêm sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /product/get_all_products:
 *   get:
 *     summary: lấy toàn bộ sản phẩm
 *     responses:
 *       200:
 *         description: lấy toàn bộ sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /product/get_product_byID/{id}:
 *   get:
 *     summary: lấy sản phẩm theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của sản phẩm cần lấy
 *     responses:
 *       200:
 *         description: lấy sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/add-product', async function(req, res, next){
  const {name, price, type, image} = req.body;
  const newProducts = {name, price, type, image};
  try {
    const creatProducts = await productPlantModel.create(newProducts);
    res.status(201).json(creatProducts)
  } catch (error) {
    res.status(500).json({"status": false, "message":"Thất bại", "error": error});
  }
})



router.get('/get-all-product', async function (req, res, next){
  try {
    const product = await productPlantModel.find()
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({"status":  false , "message":"Thất bại","error":error})
  }

})

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
