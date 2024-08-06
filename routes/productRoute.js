var express = require("express");
var router = express.Router();

var productModel = require("../models/product");
var categoryModel = require("../models/category");



// add product
router.post("/add", async function (req, res, next) {
  const { name, price, quantity, image, category } = req.body;

  const newProduct = { name, price, quantity, image, category };

  try {
    await productModel.create(newProduct);
    res.status(200).json(newProduct);
  } catch (e) {
    res.status(400).json({ error: "Lỗi khi tạo sản phẩm" });
  }
});

// Lấy thông tin của tất cả các sản phẩm
// http://localhost:5000/san-pham/list
router.get("/list", async function (req, res, next) {
  try {
    const list = await productModel.find().populate("category");
    res.status(200).json(list);
  } catch (e) {
    res.status(400).json({ error: "Lỗi" });
  }
});

// Lấy thông tin sản phẩm theo ID
router.get("/detail-find-by-id/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id).populate("category");
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json({ status: true, message: "Thành công", product });
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

// Lấy tên và giá của tất cả các sản phẩm
router.get("/list-product-name-price", async function (req, res, next) {
  try {
    const data = await productModel
      .find({}, "name price category")
      .populate("category");
    res.status(200).json({ status: true, message: "Thành công", data });
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

// Lấy thông tin các sản phẩm có giá trên 10000
router.get("/list-product-price-over-10000", async function (req, res, next) {
  try {
    const products = await productModel
      .find({ price: { $gt: 10000 } })
      .populate("category");
    res.status(200).json({ status: true, message: "Thành công", products });
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

// Lấy thông tin các sản phẩm thuộc loại 'Bánh'
// router.get("/list-product-category-banh", async function (req, res, next) {
//   try {
//     const products = await productModel
//       .find({ category: "669810d327277dbba48f6c69" })
//       .populate("category");
//     res.status(200).json({ status: true, message: "Thành công", products });
//   } catch (e) {
//     res.status(400).json({ status: false, message: "Thất bại" });
//   }
// });

router.get("/list-product-category-banh", async function (req, res, next) {
  try {
    // Find the category with the name "bánh"
    const category = await categoryModel.findOne({ name: "bánh" });

    if (!category) {
      return res
        .status(404)
        .json({ status: false, message: "Category not found" });
    }

    // Find products with the found category ID
    const products = await productModel
      .find({ category: category._id })
      .populate("category");

    res.status(200).json({ status: true, message: "Thành công", products });
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

// Đếm số lượng sản phẩm trong mỗi loại (countDocuments)
// router.get("/count-products-per-category", async function (req, res, next) {
//   try {
//     const counts = await productModel.aggregate([
//       { $group: { _id: "$category", count: { $sum: 1 } } },
//     ]);
//     res.status(200).json({ status: true, message: "Thành công", counts });
//   } catch (e) {
//     res.status(400).json({ status: false, message: "Thất bại" });
//   }
// });

// Lấy thông tin sản phẩm có số lượng ít hơn 10
router.get("/list-product-quantity-less-10", async function (req, res, next) {
  try {
    const products = await productModel
      .find({ quantity: { $lt: 10 } })
      .populate("category");
    res.status(200).json({ status: true, message: "Thành công", products });
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

// Cập nhật giá của sản phẩm theo ID, với giá người dùng truyền vào
router.put("/update-price/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const { price } = req.body;
    const product = await productModel.findByIdAndUpdate(
      id,
      { price },
      { new: true }
    );
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json({ status: true, message: "Thành công", product });
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

// Xóa sản phẩm theo ID
router.delete("/delete/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json({ status: true, message: "Xóa thành công", product });
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

// Lấy các sản phẩm có giá trong khoảng từ 5000 đến 15000
router.get("/list-product-price-range", async function (req, res, next) {
  try {
    const products = await productModel
      .find({ price: { $gte: 500, $lte: 1500 } })
      .populate("category");
    res.status(200).json({ status: true, message: "Thành công", products });
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

// Lấy tên và số lượng của các sản phẩm có số lượng lớn hơn 20
router.get("/list-product-quantity-more-20", async function (req, res, next) {
  try {
    const products = await productModel
      .find({ quantity: { $gt: 20 } }, "name quantity")
      .populate("category");
    res.status(200).json({ status: true, message: "Thành công", products });
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

// Lấy các sản phẩm có tên chứa từ khóa 'phone'
router.get(
  "/list-product-name-contains-phone",
  async function (req, res, next) {
    try {
      const products = await productModel
        .find({ name: { $regex: "phone", $options: "i" } })
        .populate("category");
      res.status(200).json({ status: true, message: "Thành công", products });
    } catch (e) {
      res.status(400).json({ status: false, message: "Thất bại" });
    }
  }
);

// Lấy thông tin sản phẩm đắt nhất
router.get("/most-expensive-product", async function (req, res, next) {
  try {
    const product = await productModel
      .findOne()
      .sort({ price: -1 })
      .populate("category");
    res.status(200).json({ status: true, message: "Thành công", product });
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

// Lấy thông tin sản phẩm rẻ nhất
router.get("/cheapest-product", async function (req, res, next) {
  try {
    const product = await productModel
      .findOne()
      .sort({ price: 1 })
      .populate("category");
    res.status(200).json({ status: true, message: "Thành công", product });
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

// Lấy giá trung bình của các sản phẩm
router.get("/average-price", async function (req, res, next) {
  try {
    const average = await productModel.aggregate([
      { $group: { _id: null, avgPrice: { $avg: "$price" } } },
    ]);
    res.status(200).json({
      status: true,
      message: "Thành công",
      average: average[0].avgPrice,
    });
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

// Tính tổng giá trị của tất cả các sản phẩm (số lượng * giá)
router.get("/total-value", async function (req, res, next) {
  try {
    const totalValue = await productModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ["$price", "$quantity"] } },
        },
      },
    ]);
    res.status(200).json({
      status: true,
      message: "Thành công",
      totalValue: totalValue[0].total,
    });
  } catch (e) {
    res.status(400).json({ status: false, message: "Thất bại" });
  }
});

module.exports = router;
