var img;


function startCapScreen() {
    if(!requestScreenCapture()){
        toast('请求截图失败');
        exit();
    }
    setInterval(function() {
        img = captureScreen();
    }, 5);
}

var enable = 0;
function checkState() {
    var p = images.findMultiColors(img, "#de191e", [
        [705 - 399, 147 -1503, "#ffffff"], 
        [0, 1599 - 1503, "#ffffff"]]);
    enable = !!p;
}

function photograph() {
    var p = images.findMultiColors(img, "#de191e", [
        [705 - 399, 147 -1503, "#ffffff"], 
        [0, 1599 - 1503, "#ffffff"]]);
    if (p) {
        click(p.x , p.y + 1599 - 1503);
    }
}

function cap() {
    startCapScreen();
    setInterval(function(){
        checkState();
    }, 100);
    var oldState;
    setInterval(function(){
        if (oldState !== enable) {
            oldState = enable;
            toastLog(oldState ? "开始拍照": "结束拍照");
        }
    }, 2000);

    setInterval(function(){
        photograph();
    }, 700);
}

module.exports = {
    cap: cap
};

