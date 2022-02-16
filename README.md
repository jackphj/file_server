# 文件服务器

## 实现功能

1. 文件管理(上传下载，断电续传)
2. 用户管理
3. 视频播放(HLS\webRTC)
4. 文件解压
5. 文件分享(限时共享链接)

## 配置(基于Ubuntu LTS 20.04)

### 配置文件

- config(json配置文件)
    - tokenOrKey 登录加密密匙
    - mongoLink mongoDB数据库连接链接用户名和密码
    - port 服务器端口

### 数据库配置

- 数据库使用 MongoDB v5.0.5 [安装方式](https://docs.mongodb.com/manual/administration/install-community/)
  安装版本5.0.5
- 创建database file_server
- 创建collection用户并开启验证

    mongod --port 27017 --dbpath /var/lib/mongodb   //运行mongoDB
    mongosh --port 27017                              //链接mongoDB
    db.createUser( { user:"myDBAdmin", pwd:passwordPrompt(), roles:["root"] } )  //创建超级用户
    输入密码：abcxyz666
    use file_server                                 //进入file_server这个database
    db.createUser( { user:"fileServerAdmin", pwd:"abcxyz888", roles:[ { role:"dbOwner", db:"file_server" } ] } )    //创建file_server数据库管理员
    db.adminCommand( { shutdown: 1 } )              //关闭mongoDB
    mongod --port 27017 --dbpath /var/lib/mongo --auth  --fork --logpath /var/lib/mongodb_log/mongogb.log --logappend //运行mongoDB开启验证

### 配置Nginx

- [安装Nginx](https://nginx.org/en/linux_packages.html) 版本 v1.20.2
- 配置nginx服务器

    server {
        listen 443;
        server_name samllfile.xxx.com;
        
        ssl_certificate /location off ullchain.pem;
        ssl_certificate_key /location of privkey.pem;
        ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers         HIGH:!aNULL:!MD5;
                
        location /v2ray {
            proxy_pass http://127.0.0.1:3000;
            proxy_redirect             off;
            proxy_http_version         1.1;
            proxy_set_header Upgrade   $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host      $http_host;
    
            root   /www/file_server;
            index  index.html index.htm;
        }
    }

### 运行服务

- [安装node.js](https://nodejs.dev/how-to-install-nodejs) 版本 v12.14.1 LTS
- [下载服务器]()
- 运行服务器

    wget https://
    tar -vxf 
    cd 
    npm install         国内推荐使用cnpm
    node index.js
    