
#####访问方式
1. 如果想通过项目的物理地址访问example下的index.html
这时候先build然后需要通过下面这种方式找到相对的地址 
<script src="../dist/build.js"></script>  
2. npm run dev 后访问http://localhost:8181
webpack-dev-server起了服务, HtmlWebpackPlugin建立html。所以直接访问就可以。
####构建打包
npm run build
然后会生成dist文件夹