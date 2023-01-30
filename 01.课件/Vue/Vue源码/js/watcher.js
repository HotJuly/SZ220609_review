function Watcher(vm, exp, cb) {
  // this->watcher对象
  // new Watcher(vm, "msg", function(value, oldValue) {
  //     textUpdater && textUpdater(text节点, value, oldValue);
  // });

  this.cb = cb;
  this.vm = vm;
  this.exp = exp;

  this.depIds = {};

  this.value = this.get();
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    var value = this.get();

    var oldVal = this.value;

    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    // this->watcher对象
    // watcher.addDep(dep);

    // A.hasOwnProperty(B)=>用于检测A对象中,是否具有B属性
    // 如果有就是true,如果没有该属性就为false
    // 其实depIds对象,就是用于记录当前watcher与哪些dep有关
    // 这里其实就是在记录当前插值语法,用到了哪些响应式属性
    if (!this.depIds.hasOwnProperty(dep.id)) {
      this.depIds[dep.id] = dep;

      dep.addSub(this);
      // dep.addSub(watcher);
    }
  },
  get: function () {
    // this->watcher对象

    Dep.target = this;
    // Dep.target = watcher;

    var value = this.getVMVal();

    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    var exp = this.exp.split(".");

    var val = this.vm._data;

    exp.forEach(function (k) {
      val = val[k];
    });

    // ["msg"].forEach(function (k) {
      // 此处由于是直接从data对象身上读取的数据,所以此处只会触发数据劫持的get,不会触发数据代理的get
    //   val = data["msg"];

    // 以下写法才会触发数据代理的get,以及数据劫持的get
    //   val = vm["msg"];
    // });
    return val;
  },
};
