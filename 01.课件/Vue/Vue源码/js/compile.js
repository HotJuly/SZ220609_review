function Compile(el, vm) {
  // this.$compile = new Compile("#app", vm);
//   this->com对象,el->"#app"

    this.$vm = vm;

    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {

        this.$fragment = this.node2Fragment(this.$el);

        this.init();

        // 此处操作,其实就是所谓的挂载
        this.$el.appendChild(this.$fragment);

    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
            child;

        // 此处在将el中所有的直系子节点,全部进行抄家处理
        while (child = el.firstChild) {
            // 将第一个子节点,放入到文档碎片中
            fragment.appendChild(child);
        }

        // 经过以上操作之后,el元素中没有任何的节点了,fragment中会存储el中原先的所有节点

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // 第一次进来:this->com对象,el->fragment对象
        // 第二次进来:el->p元素节点
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });

        
        // childNodes用于返回子节点组成的伪数组
        // var childNodes = fragment.childNodes,
        //     me = this;

        // [].slice.call(childNodes)目的就是将伪数组转成真数组

        // 第一次进入:[text节点,p元素节点,text节点].forEach(function(node) {
        // 第二次进入:[text节点].forEach(function(node) {
        //  第一次进来,node是p元素节点
        //          text=>"{{msg}}"
        //  第二次进来,node是text节点
        //          text=>"{{msg}}"

        //     var text = node.textContent;
        //     var reg = /\{\{(.*)\}\}/;

        //     if (me.isElementNode(node)) {
        //         me.compile(node);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //         me.compileText(text节点, "msg");
        //     }

        //     if (node.childNodes && node.childNodes.length) {
        //         me.compileElement(node);
        //     }
        // });

    },

    compile: function(node) {
        // node->p元素节点

        // attributes会返回当前所有标签属性节点组成的伪数组
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);

                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });

    },

    compileText: function(node, exp) {
        // com.compileText(text节点, "msg");
        compileUtil.text(node, this.$vm, exp);
        // compileUtil.text(text节点, vm, "msg");
        
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // this->compileUtil对象
        // compileUtil.text(text节点, vm, "msg");
        this.bind(node, vm, exp, 'text');
        // this.bind(text节点, vm, "msg", 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // this.bind(text节点, vm, "msg", 'text');

        // 找到专门用户更新文本的更新器函数
        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // updaterFn && updaterFn(text节点, this._getVMVal(vm, "msg"));
        // updaterFn && updaterFn(text节点, "hello mvvm");

        // 每执行一次bind方法,就会创建一个对应的watcher对象
        // 总结:页面上,每具有一个插值语法,就会创建一个对应的watcher对象
        // new Watcher(vm, exp, function(value, oldValue) {
        //     updaterFn && updaterFn(node, value, oldValue);
        // });

    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        // this._getVMVal(vm, "msg")

        // val的初始值是data对象
        var val = vm._data;

        // exp=>["msg"]
        // exp=>["person","name"]
        exp = exp.split('.');

        exp.forEach(function(k) {
            val = val[k];
        });

        // ["person","name"].forEach(function(k) {
        // 第一次进入:k=>"person",val=>data对象
        //     val = val[k];
        //      此处由于是直接从data身上读取的person,所以有经过数据劫持的get方法,没有经过数据代理的get方法
        //     val = vm._data["person"];

        // 第二次进入:k=>"name",val=>person对象
        //     val = person["name"];
        // });

        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        // updaterFn(text节点, "hello mvvm");
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};