const router = require("express").Router();
const Util = require("../../../utils/utils");
var multer = require("multer");
var upload = multer({
  dest: "./public/temp",
});
router.post(
  "/headPic",
  upload.single("headPic"),
  Util.checkToken,
  (req, res) => {
    res.send({
      result: 1,
      msg: "上传成功",
      headPath: req.file,
    });
  }
);

module.exports = router;
