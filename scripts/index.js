const { dateFormat } = require("./util");

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

const messageTarget = "运营FE小组"; // "文件互传助手";

function sendHiMessage() {
    launch('com.baidu.hi');

    const button = id("navigator_tab_unread_count").findOne().parent();

    button.click();
    id("tab_pager").findOne().children().forEach(child => {
        var target = child.findOne(id("global_search_bar"));
        target.click();
    });
    sleep(500);
    id("search_edit").findOne().setText(messageTarget);
    button = tryFindGroup();
    if (!button) { toastLog('无此联系人！'); return; }

    sleep(300);

    id("chat_editAndexpression_layout_inner").waitFor();
    id("chat_editAndexpression_layout_inner").findOne().children()[0].setText(dateFormat("MM-dd hh:mm:ss", new Date()) + '：这是来自一条来自AutoJS的消息示例。 ');
    id("chatSendButton").findOne().click();

}
function tryFindGroup(count) {
    if (count == undefined) count = 5;
    if (count === 0) return null;
    var button;
    id("global_search_choose_viewpager").findOne().children().forEach(child => {
        var target = child.findOne(id("group_display_name"));
        if (target && target.text() == messageTarget) {
            button = target; child.findOne(className("android.widget.RelativeLayout").clickable(true)).click();
        }
        target = child.findOne(id("tv_name"));
        if (target && target.text() == messageTarget) {
            button = target; child.findOne(className("android.widget.RelativeLayout").clickable(true)).click();
        }
        target = child.findOne(id("friend_display_name"));
        if (target && target.text() == messageTarget) {
            button = target; child.findOne(className("android.widget.RelativeLayout").clickable(true)).click();
        } 
    });
    if (button) return button;
    sleep(500);
    return tryFindGroup(count - 1);
}



function start() {
    // startCapScreen();

    console.log(currentPackage());

    sendHiMessage();


}


module.exports = {
    start: start
};