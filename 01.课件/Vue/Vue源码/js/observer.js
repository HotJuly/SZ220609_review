function Observer(data) {
    // this->ob对象,data->this._data
    this.data = data;

    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
        // this->ob对象,data->this._data
        var me = this; 

        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });

        
        // ["msg","person"].forEach(function(key) {
        //     ob.convert("msg", data["msg"]);
        //     ob.convert("msg", "hello mvvm");
        // });
    },
    convert: function(key, val) { 
        //ob.convert("msg", "hello mvvm");
        this.defineReactive(this.data, key, val); 
        // this.defineReactive(this.data, "msg", "hello mvvm"); 
    },

    defineReactive: function(data, key, val) { 
        // this.defineReactive(this.data, "msg", "hello mvvm"); 
        // this->ob对象

        // 每调用一次defineReactive,都会生成一个全新的dep对象
        // data对象每具有一个直系属性名,就会生成一个全新的dep对象
        // 总结:data对象中每具有一个属性名,就会生成一个对应的dep对象
        var dep = new Dep();  

        // 此处会将属性值传入observe函数,进行递归数据劫持
        // 也就是说,data中所有的属性都会被数据劫持
        var childObj = observe(val);

        
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define

            get: function() {
              
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;

                childObj = observe(newVal);
                
                dep.notify();
            }
        });

        // 由于data对象中,原本就具有msg属性,所以此处不是在新增属性,而是在重写属性
        // 他会将原先具有value值的属性,全部变成get/set方法
        // 如果开发者读取data对象身上的msg,就会触发此处的get方法
        // 如果开发者修改data对象身上的msg,就会触发此处的set方法
        // 此处Vue通过闭包的形式,将当前属性的值进行了保存
        //  这样就实现了一个属性,既有get/set方法,同时还不丢失原先的value值

        // Object.defineProperty(vm._data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     get: function() {
              
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {
        //     从此行代码,我们可以得知,只要新值与旧值相同,无论更新多少次数据,页面也只会更新一次
        //         if (newVal === val) {
        //             return;
        //         }

        //         将闭包中的旧值更换成当前最新的结果
        //         val = newVal;

        //      此处就是将普通属性变成响应式属性的第二个时机
        //      将对象数据类型传入响应式属性中,就会触发新一轮的数据劫持
        //         childObj = observe(newVal);
                
        //          此处在通知DOM进行更新
        //         dep.notify();
        //     }
        // });

    }
    
};


function observe(value, vm) {
  // observe(data, vm);
//   第二次:observe("hello mvvm")

//   此处在判断传进来的value值,是否有值,以及是否是一个对象
// 不进入这个判断,说明当前value应该是一个对象
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;