const express = require('express');
//middleware
const compression = require('compression');  //内容压缩
const morgan = require('morgan');  //日志
const bodyParser = require('body-parser');  //数据请求处理
const methodOverride = require('method-override'); //support HTTP DELETE & PUT



module.exports = function(){
  var app = express();

  //middleware *FIFO

  if(process.env.NODE_ENV === "devlopment"){
    app.use(morgan('dev'));
  }else if(process.env.NODE_ENV === "production"){
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended:true
  }));

  app.use(bodyParser.json());
  app.use(methodOverride());

  app.set('views','./app/views');
  app.set('view engine','ejs');

  //配置路由
  require('../app/routes/index.server.routes')(app);

  app.use(express.static('./public'));

  return app;
};
