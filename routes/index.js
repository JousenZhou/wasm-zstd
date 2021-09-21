var express = require('express');
var router = express.Router();
let Mock  = require('mockjs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 模拟数据
let dataSource = Mock.mock({
  'list|70000':[{
    'key|+1': 1,
    'mockTitle|1':['哑巴', 'Butter-fly', '肆无忌惮', '摩天大楼', '初学者'],
    'mockContent|1': ['你翻译不了我的声响', '数码宝贝主题曲', '摩天大楼太稀有', '像海浪撞破了山丘'],
    'mockAction|1': ['下载', '试听', '喜欢']
  }]
}).list;

let compress;
let fly=require("flyio");
// 请求php服务 将数据转成zstd格式
fly.post('http://localhost:8088/zstd',{
  data:{code:0,data:dataSource}
}).then(res=>{
  compress = res.data
});
// 原始数据接口;
router.post('/orginal', function(req, res, next) {
  res.json({code:0,data:dataSource});
});
// 压缩数据zstd接口
router.post('/wasm', function(req, res, next) {
  res.setHeader('content-encoding','zstd');
  res.send(compress);
});
module.exports = router;
