const router = require("express").Router();
const Util = require("../../../utils/utils");
var multer = require("multer");
var upload = multer({
  dest: "./public/temp",//缓存目录
});
router.post(
  "/headPic",
  upload.single("headPic"),//单张图片，图片标识名
  Util.checkToken,//验证token
  (req, res) => {
    res.send({
      result: 1,
      msg: "上传成功",
      headPath: req.file,
    });
  }
);

module.exports = router;
