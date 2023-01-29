function MVVM(options) {

  /*
    this->组件实例对象,简称vm
    options->{
        el: "#app",
        data: {
          msg: "hello mvvm",
          person:{
            name:"xiaoming",
            msg:"123"
          }
        }
      }
  */

  this.$options = options;

  var data = this._data = this.$options.data;
  // var data = (this._data = this.$options.data);

  // var data = this.$options.data;
  // this._data = this.$options.data;
  // Vue1中的_data,其实就是Vue2的$data

  var me = this;

  /*
      MVVM源码第一部分:数据代理
      代理:例如,我找代理买酒,代理会找厂家获取,再将得到的酒给我
          从我的视角中,感觉代理是有酒的,实际上他并没有

      目的:为了开发者方便快速读取$data中的数据,所以统一减少了.$data的书写
        开发者可以通过读取/设置vm对象身上的某个属性,获取/影响到$data上同名的属性
        个人理解:其实数据代理并不能算是响应式中不可缺少的一环

      次数:2次(代理的次数与data对象的直系属性名个数有关)

      流程:
        1.使用Object.keys方法,获取到data对象所有的直系属性名组成的数组
        2.遍历得到的属性名数组,并将每个属性名作为参数,传递给_proxy方法
        3.在_proxy方法中,使用Object.defineProperty方法,
          给vm对象新增了许多与data对象中同名的属性
        4.并将这些属性都变为访问描述符,让他们具有get/set方法(代表该属性没有value值)
          如果开发者读取该属性的值,就会自动执行get方法,并读取vm._data中的同名属性的值进行返回
          如果开发者修改该属性的值,就会自动执行set方法,并修改vm._data中同名属性的值
  
  
  */

  Object.keys(data).forEach(function (key) {
    me._proxy(key);
  });

  // Object.keys可以获取到的是某个对象的直系属性名组成的数组
  // ["msg","person"].forEach(function (key) {
  //   vm._proxy("msg");
  // });

  observe(data, this);

  this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
  //   vm._proxy("msg");
  // this->vm对象,key->"msg"

    var me = this;

    /*
      在ES6语法之前,对象的属性名只可能是字符串
        每个属性都具有自己的value值

      但是在ES6语法推出之后,对象的属性发生了变化
        对象除了之前那种以外,还多出一种新的,称为访问描述符
        访问描述符意思就是说,该属性没有value值,只有get/set方法
          如果读取该属性的值,就会自动执行get方法,并将该方法的返回值进行返回
          如果设置该属性的值,就会自动执行set方法
        创建访问描述符的API,就是Object.defineProperty
    
    */
    Object.defineProperty(me, key, {
      configurable: false, //不能重复定义
      enumerable: true, //可以遍历
      get: function proxyGetter() {
        return me._data[key];
      },
      set: function proxySetter(newVal) {
        me._data[key] = newVal;
      },
    });

    
    // 在这行代码执行之前,vm对象并没有msg属性,此处是在新增msg属性
    // Object.defineProperty(vm, "msg", {
    //   configurable: false, //不能重复定义
    //   enumerable: true, //可以遍历
    //   get: function proxyGetter() {
    //     return vm._data["msg"];
    //   },
    //   set: function proxySetter(newVal) {
    //     vm._data["msg"] = newVal;
    //   },
    // });

    // console.log(vm.msg)
    // vm.msg=666;

  },
};
