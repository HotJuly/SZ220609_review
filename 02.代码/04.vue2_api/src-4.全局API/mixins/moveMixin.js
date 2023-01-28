export default {
    data(){
      return {
        pageX:0,
        pageY:0
      }
    },
    mounted(){
      /*
        需求:当用户鼠标在页面上移动的时候,需要获取到他的鼠标坐标,并在页面上进行展示
        拆解:
          1.当用户鼠标在页面上移动的时候
            绑定事件监听
              事件源:document
              事件名:mousemove
  
          2.获取到他的鼠标坐标
            通过event事件对象,可以获取到当前坐标
  
          3.在页面上进行展示
      
      */
  
      document.addEventListener('mousemove',this.moveHandler);
    },
    methods:{
      moveHandler(event){
        // console.log('moveHandler',event)
        const {clientX,clientY} = event;
        this.pageX = clientX;
        this.pageY = clientY;
      }
    }
}