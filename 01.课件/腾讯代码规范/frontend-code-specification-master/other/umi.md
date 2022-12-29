#### 目录结构设计：
```
front
├─ README.md
├─ mock
│	├─ .gitkeep
│	├─ audience.js
│	├─ overview.js
│	├─ overview_check.js
│	└─ popcard.js
├─ package-lock.json
├─ package.json
├─ src
│	├─ app.js
│	├─ assets
│	│	├─ css
│	│	├─ fonts
│	│	├─ images
│	│	├─ scss
│	│	├─ svg
│	│	└─ svgs
│	├─ components
│	│	├─ game_select
│	│	├─ page_list.js
│	│	├─ rbac.js
│	│	├─ rtx.js
│	├─ layouts
│	│	├─ index.css
│	│	└─ index.js
│	├─ models
│	│	├─ auth.js
│	│	└─ system.js
│	├─ pages
│	│	├─ aix_config
│	│	│	├─ components
│	│	│	├─ model.js
│	│	│	├─ service.js
│	│	│	├─ index.css/index.less
│	│	│	└─ index.js
│	│	├─ bi
│	│	│	├─ components
│	│	│	├─ models
│	│	│	│	├─ aa.js
│	│	│	│	└─ bb.js
│	│	│	├─ services
│	│	│	│	├─ aa.js
│	│	│	│	└─ bb.js
│	│	│	├─ index.css/index.less
│	│	│	└─ index.js
│	│	├─ document.ejs
│	│	├─ index.js
│	│	├─ soon.jsx
│	├─ services
│	│	├─ auth.js
│	│	├─ config.js
│	│	└─ system.js
│	└─ utils
│			 ├─ file.js
│			 ├─ func.js
│			 ├─ request.js
│			 ├─ router.js
│			 └─ storage.js
├─ svgo-config.json
├─ tsconfig.json
├─ typings.d.ts
└─ yarn.lock
```
##### 结构说明

1. mock文件夹存放相关请求的本地mock数据
2. src文件夹下存放具体逻辑代码
	 - app.js，启动文件，存放全局配置信息
	 - components， 文件夹，存放可全局通用的组件
	 - layouts/index.js，全局框架文件，可在此文件中设置整个项目的页面框架
	 - models，文件夹，存放全局通用的状态数据
	 - services，文件夹，存放与全局通用状态对应的相关请求
	 - utils，文件夹，存放全局通用的一些方法，错误信息配置等
	 - pages，文件夹，存放具体的页面逻辑代码
	 - pages/抽象相关逻辑功能起名，比如aix_config，表示aix项目相关的配置信息，文件名请用小写加下划线连接
	 - pages/aix_config/components, 文件夹，存放aix_config此功能模块相关的组件
	 - pages/aix_config/model.js，文件，存放aix_config此功能模块相关的状态数据，如果代码超过600行，请使用多个文件分开，且统一放在models文件夹下
	 - pages/aix_config/service.js，文件，存放aix_config此功能模块相关的请求接口，如果代码超过600行，请使用多个文件分开，且统一放在services文件夹下
	 - pages/aix_config/index.css/less，文件，存放aix_config此功能模块相关的样式文件
	 - pages/aix_config/index.js，文件，存放aix_config此功能模块相关的页面主体文件，可调用components中相关组件拼接页面
##### 各个目录功能约定

1. pages文件夹下，由services到model，再到index.js目录。
	 - services文件中负责 （1）传入参数按照后台接口所需的改装，比如JSON.stringfy处理；比如传入int，但后端需要string的数据类型转换
	 - services文件中负责 （2）输出结果向前端页面所需结果的通用性转换处理，比如页面所有使用此接口的数据均需做数据类型转换等 ！！！**假如一个接口可能给到页面上多处调用，则此类型处理需移动到models文件中**！！！。
	 - models文件中 负责 （1）状态数据的修改，（2）非通用性数据转换
	 - index.js文件中 负责 （1）页面展示样式相关的数据转换，比如收入数据前面加上 货币符号，百分比数据的转换并加上百分号等，货币类数据加上逗号分割等
