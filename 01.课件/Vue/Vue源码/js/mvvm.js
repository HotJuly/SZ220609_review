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

  /*
    响应式
    需求:当某个属性值被修改的时候,页面需要展示出最新的结果
    拆解:
      1.当某个属性值被修改的时候
        绑定事件监听
          通过Object.defineProperty可以将某些属性变成具有get/set方法
            通过set方法,可以监视用户是否有修改该属性值

      2.页面需要展示出最新的结果
        通过一阶段所学的DOM的增删改查,可以找到页面上具体的某个节点,在对其进行DOM操作


    准备工作:
      1.在bind方法中,会调用Watcher函数,创建watcher实例对象
      2.在Watcher函数中,会调用get方法,用于获取到当前插值语法的结果
      3.在get方法中,会将Dep.target修改为当前这个watcher对象
      4.并且调用getVMVal方法,获取插值语法的表达式结果,在这个过程中,会触发数据劫持的get方法
      5.在数据劫持的get方法中,由于Dep.target已经有值,所以会执行dep.depend方法
      6.在depend方法中,会调用watcher对象的addDep方法,让watcher对象收集到与自身相关的dep对象
      7.在addDep方法中,会调用dep对象的addSub方法,让dep对象收集到与自身相关的watcher对象

    流程:
      1.开发者修改响应式属性的值,会触发数据代理的set方法
      2.在数据代理的set方法中,会同步修改data对象中的同名属性的值,会触发该属性的数据劫持的set方法
      3.在数据劫持的set方法中,会调用dep.notify方法,通知对应的watcher进行更新(其实就是调用watcher的update方法)
      4.在update方法中,
        -使用watcher.get方法,获取到当前表达式的最新结果
        -比较新旧两次的结果,如果不相同才会调用cb函数,对页面的节点进行更新
  
  */

  /*
    MVVM源码第二部分:数据劫持
    劫持:控制人身自由,强迫他人做一些他们不想做的事情
    目的:
      明面上的目的:为了将data中,所有的属性都变成具有get/set方法的访问描述符
      最终目的:将data中所有的属性重写之后,Vue就可以通过set方法监视到用户修改属性值的操作
              从而可以通知DOM进行更新
    次数:4次(数据劫持的次数与data对象中具有的属性名个数有关)
    流程:
      1.调用observe方法,并将data对象以及当前组件实例对象vm传入
      2.在observe方法中,会对传入的data进行判断
        如果data有值,而且是一个对象才会继续new Observer,否则直接return
      3.在Observer构造调用中,会调用this.walk方法
      4.在walk方法中,使用Object.keys获取到data对象所有直系属性名组成的数组,并对其进行遍历
      5.遍历的时候,每个属性名都会调用一次defineReactive方法
      6.在defineReactive方法中,
        -创建一个全新的dep对象
        -会将当前的属性值,传给observer进行深度数据劫持
        -调用Object.defineProperty方法,对data身上所有的属性进行重写操作
          将所有的属性都变成get/set方法,但是Vue使用了闭包,将原本应该丢失的value值进行了缓存
          如果用户读取该属性的值,就会执行get方法,将闭包缓存的value进行返回
          如果用户修改该属性的值,就会执行set方法,
            -判断新旧值是否相同,如果相同就什么都不做
            -将新值放入到闭包中,留给下次使用
            -将新值传入observe中,对其进行深度数据劫持操作
            -通过调用dep.notify方法,通知DOM进行更新

  */
  observe(data, this);
  // observe(data, vm);

  /*
    MVVM源码第三部分:模板解析
    目的:获取到开发者的页面内容,作为模版进行解析,将内部的插值语法等内容变成对应的数据进行显示
    流程:
      1.将配置对象的el属性传入Compile构造函数中
      2.在Compile函数中,会根据传入的el进行判断,找到页面上对应的DOM节点
      3.将el元素中,所有的子节点全部转移到文档碎片中
      4.调用init方法,开始解析文档碎片中的模版内容
      5.通过node.childNodes,获取到所有子节点组成的数组,并且遍历该数组
        -如果子节点是元素节点,就获取他身上所有的标签属性,判断是否有出现指令,并对其进行解析
        -如果子节点是文本节点,而且文本内容具有插值语法,那么就开始调用bind方法
        -如果子节点还有后代节点,会对其进行递归操作,进行递归解析,回到流程5
      6.在bind方法中,
        -找到对应的更新器函数
        -调用更新期函数,并传入对应的表达式结果
        -创建一个watcher对象
          总结:页面中,每具有一个插值语法,就会创建一个对应的watcher对象
  
  
  */
  this.$compile = new Compile(options.el || document.body, this);
  // this.$compile = new Compile("#app", vm);

  /*
    问题1:请问Vue1中,更新DOM是同步更新还是异步更新?
    回答:同步更新

    问题2:请问Vue2中,更新DOM是同步更新还是异步更新?
    回答:异步更新
      异步指的是微任务
      Vue2会将更新DOM的方法交给nextTick方法,而nextTick的回调函数会在清空微任务的时候执行

      为什么要异步更新DOM?
        因为异步更新DOM,可以减少更新的次数,只会按照最后一次的数据结果,来更新DOM节点(类似于防抖操作)

    问题3:请问Vue1中,更新DOM的范围是多大?(整个项目,组件,节点)
    回答:以节点为单位更新(精确更新)
      Vue1会为每一个插值语法准备一个对应的watcher对象

    问题4:请问Vue2中,更新DOM的范围是多大?(整个项目,组件,节点)
    回答:以组件为单位更新(范围更新)
      从表面上来看,Vue2的范围更新方案很可能出现误杀的情况
        感觉上去,性能不如Vue1的精确更新

      内存消耗上来说,Vue1会给每个插值语法都生成一个对应的watcher对象
          而Vue2,只会给每个组件生成一个watcher对象
          内存消耗Vue2更小

      Vue2其实有对可能出现的误杀情况做出优化->虚拟DOM和diff算法

    问题5:请问Vue1中,使用数组的下标更新内容,是否具有响应式效果?
    回答:数组的下标具有响应式效果

    问题6:请问Vue2中,使用数组的下标更新内容,是否具有响应式效果?
    回答:没有响应式效果

      延展问题1:为什么Vue2故意不对数组的下标进行数据劫持?
      回答:
        尤大大故意为之,如果对数组下标进行数据劫持,会导致产生非常多的dep对象
          然而,实际开发中,很少用到这些下标的dep对象,完全是浪费内存,最终尤大大决定优化该操作

      延展问题2:如果真的有需要修改某个下标的内容,在Vue2中,如何解决?
      回答:使用数组的7种方法即可解决
        7种:push,pop,shift,unshift,splice,reverse,sort

      延展问题3:请问数组的下标没有经过数据劫持,那么数组内部的内容是否会被数据劫持?
      回答:会的
        Vue2只是通过for循环的形式,跳过了对数组下标的数据劫持,但是依旧会数据劫持数组内部的对象

        扩展:如果数组内部的数据未来不会发生变化,就可以使用Object.freeze方法,对数组内部的数据进行数据冻结
          这样就可以让内部的属性变成只读属性,可以避免dep对象的产生

      延展问题4:请问Vue2,是如何在不影响普通数组的方法的同时,还能实现对7种方法的重写的?
      回答:
        其实就是对经过数据劫持的数组进行了特殊的处理

          1.Vue2会使用Object.create方法,创建一个新的对象,该对象的__proto__会指向Array.prototype
          2.在这个新对象身上,创建7种与数组同名的方法,如果这些方法被调用了
            -他们会先调用数组原型身上对应的7种方法
            -通过dep.notify通知DOM进行更新
          3.将数组劫持过的数组的__proto__,修改成流程1中创建的新对象
  
  */

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
