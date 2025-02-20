(function(){

    // 获取元素
    var elements = document.getElementsByClassName("drag-and-drop");

    // 用于获取元素内点击位置的全局（类似）变量
    var x;
    var y;

    // 当鼠标在元素内按下或触摸时触发
    for(var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("mousedown", mdown, false);
        elements[i].addEventListener("touchstart", mdown, false);
    }

    // 鼠标按下时的函数
    function mdown(e) {

        // 添加 .drag 类名
        this.classList.add("drag");

        // 兼容触摸事件和鼠标事件的差异
        if(e.type === "mousedown") {
            var event = e;
        } else {
            var event = e.changedTouches[0];
        }

        // 获取元素内的相对坐标
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;

        // 绑定移动事件的回调
        document.body.addEventListener("mousemove", mmove, false);
        document.body.addEventListener("touchmove", mmove, false);
    }

    // 鼠标移动时触发
    function mmove(e) {

        // 获取正在拖拽的元素
        var drag = document.getElementsByClassName("drag")[0];

        // 同样兼容鼠标和触摸事件的差异
        if(e.type === "mousemove") {
            var event = e;
        } else {
            var event = e.changedTouches[0];
        }

        // 阻止默认行为，防止拖动时页面滚动
        e.preventDefault();

        // 将元素移动到鼠标移动的位置
        drag.style.top = event.pageY - y + "px";
        drag.style.left = event.pageX - x + "px";

        // 当鼠标松开或光标离开时触发
        drag.addEventListener("mouseup", mup, false);
        document.body.addEventListener("mouseleave", mup, false);
        drag.addEventListener("touchend", mup, false);
        document.body.addEventListener("touchleave", mup, false);

    }

    // 鼠标松开时触发
    function mup(e) {
        var drag = document.getElementsByClassName("drag")[0];

        // 移除移动事件监听器
        document.body.removeEventListener("mousemove", mmove, false);
        drag.removeEventListener("mouseup", mup, false);
        document.body.removeEventListener("touchmove", mmove, false);
        drag.removeEventListener("touchend", mup, false);

        // 移除 .drag 类名
        drag.classList.remove("drag");
    }

})()