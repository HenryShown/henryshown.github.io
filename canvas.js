var drawing = false;
// 记录上一次的坐标（初始值：0）
var before_x = 0;
var before_y = 0;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.addEventListener('mousemove', draw_canvas);
// 当鼠标按下时
canvas.addEventListener('mousedown', function(e) {
  drawing = true;
  var rect = e.target.getBoundingClientRect();
  before_x = e.clientX - rect.left;
  before_y = e.clientY - rect.top;
});
// 当鼠标松开时
canvas.addEventListener('mouseup', function() {
  drawing = false;
});

// 绘制处理
function draw_canvas(e) {
  // 如果drawing不为true，则返回
  if (!drawing) {
    return;
  }

  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  // 获取输入框的当前值
  var w = document.getElementById('width').value || 5;  // 默认宽度为 5
  var color = document.getElementById('color').value || '#FF0000';  // 默认颜色为红色

  var r = parseInt(color.substring(1, 3), 16);
  var g = parseInt(color.substring(3, 5), 16);
  var b = parseInt(color.substring(5, 7), 16);

  // 绘制
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
  ctx.lineWidth = w;
  ctx.beginPath();
  ctx.moveTo(before_x, before_y);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();

  // 更新上一次的坐标
  before_x = x;
  before_y = y;
}



// 清除按钮点击时
// 点击清除按钮时显示提示框
function delete_canvas(){
ret = confirm('是否擦除马克笔？');
// 当提示框选择“确定”时
if (ret == true){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
}

var pen = document.getElementById('pencil');
var era = document.getElementById('eraser');
// 铅笔和橡皮擦的切换

function tool(btnNum){
// 如果点击的按钮是铅笔
if (btnNum == 1){
  ctx.globalCompositeOperation = 'source-over';
  pen.className = 'active';
  era.className = '';
}
// 如果点击的按钮是橡皮擦
else if (btnNum == 2){
  ctx.globalCompositeOperation = 'destination-out';
  pen.className = '';
  era.className = 'active';
}
}