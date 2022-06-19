## 项目运行
开两个终端，分别进入前后端执行：
- 1. npm install
- 2. tsc 
- 3. npm run dev(前端)和npm run serve(后端) (后端需要保持运行中)
## 模块划分

- 1.注册
- 2.登录
- 3.个人中心
- 4.首页
- 5.新建表单
- 6.填写详情-数据统计
- 7.填写详情-分享
- 8.填写详情-问题
- 9.表单填写

## 项目说明

- 1. 在创建完表单后，在首页点击新创建表单一行中的发布后，才可进入填写，否则为草稿状态。
- 2. 填写完成后，可以查看表单问题，填写详情,所有填写的答案等

### 技术选型

基于 vue3 、 element-plus 和 typescript 实现

- 框架
- 语言
- npm 包及其作用

## 运行环境

- VS Code
- Nginx
- NodeJS
- NPM

### 运行说明

```bash
$ npm i
$ npm serve
```

host 配置：手机端和电脑端运行在同一个局域网里


### eslint 规范参考

[eslint-config-standard](https://github.com/standard/eslint-config-standard)

## 文件结构

```sh
│  .env.development
│  .env.production
│  .gitignore
│  index.html
│  list.txt
│  package-lock.json
│  package.json
│  README.md
│  tsconfig.json
│  tsconfig.node.json
│  vite.config.ts
│  
├─.vscode
│      extensions.json
│      
├─public
│      favicon.ico
│      wps.ico
│      
└─src
    │  App.vue       #入口页面
    │  env.d.ts
    │  main.ts         #入口文件
    │  test.js
    │  
    ├─api       #封装网络请求
    │      axios.ts
    │      index.ts
    │      status.ts
    │      
    ├─assets       #静态资源
    │  ├─icon
    │  │      demo.css
    │  │      demo_index.html
    │  │      iconfont.css
    │  │      iconfont.js
    │  │      iconfont.json
    │  │      iconfont.ttf
    │  │      iconfont.woff
    │  │      iconfont.woff2
    │  │      
    │  ├─imgs
    │  │      app store-fill.png
    │  │      arow.png
    │  │      avatar.jpeg
    │  │      bell.png
    │  │      bgImg.png
    │  │      calendar.png
    │  │      collect.png
    │  │      crown.png
    │  │      js-form.png
    │  │      kdocs.svg
    │  │      link.svg
    │  │      little-program.png
    │  │      load.svg
    │  │      logo.svg
    │  │      message.png
    │  │      password.png
    │  │      picture1.svg
    │  │      picture2.svg
    │  │      picture3.svg
    │  │      picture4.svg
    │  │      plus.png
    │  │      post.png
    │  │      qq.png
    │  │      qr-code.png
    │  │      qrlogo.png
    │  │      refresh.png
    │  │      return-arrow.png
    │  │      right-arrow.svg
    │  │      rocket.png
    │  │      safe.png
    │  │      search.png
    │  │      shield.png
    │  │      user.png
    │  │      wechat.png
    │  │      write-success.png
    │  │      xiaochengxu.png
    │  │      
    │  └─style
    │          global.css
    │          
    ├─components    #公用组件
    │  │  BreadCrumb.vue
    │  │  DataDetailItem.vue
    │  │  FormDetail.vue
    │  │  FormStatics.vue
    │  │  Header.vue
    │  │  HeaderNav.vue
    │  │  HeaderNavWrite.vue
    │  │  StaticsTableItem.vue
    │  │  
    │  ├─answerType
    │  │      AnswerDetail.vue
    │  │      
    │  ├─homePage
    │  │      FirstPage.vue
    │  │      FreeTemplate.vue
    │  │      Help.vue
    │  │      Nav.vue
    │  │      Solution.vue
    │  │      
    │  ├─oneProblem
    │  │      ChoiceItem.vue
    │  │      DialogNewProblem.vue
    │  │      NewProblem.vue
    │  │      
    │  ├─problemType
    │  │      ChoiceQuestion.vue
    │  │      DateQuestion.vue
    │  │      FillinQuestion.vue
    │  │      ScoreQuestion.vue
    │  │      
    │  └─WriteType
    │          DateWrite.vue
    │          InputWrite.vue
    │          multiSelectWrite.vue
    │          pullSelectWrite.vue
    │          RateWrite.vue
    │          SingleSelectWrite.vue
    │          TimeWrite.vue
    │          
    ├─router     #路由配置
    │      index.ts
    │      routes.ts
    │      
    ├─store
    │      index.ts
    │      store-names.ts
    │      
    ├─types
    │      models.ts
    │      request.ts
    │      
    └─views       #所有页面
            CreateForm.vue
            DefaultView.vue
            FirstHome.vue
            FormInfo.vue
            FormPreview.vue
            FormQuestion.vue
            FormShare.vue
            FormStaticsDetail.vue
            Home.vue
            Login.vue
            Register.vue
            Search.vue
            SubmitSucceed.vue
            test.vue
            TestHome.vue
            TestRouter.vue
            UpLoad.vue
            UserCenter.vue
            WatchDetail.vue
            WriteForm.vue
            
```

