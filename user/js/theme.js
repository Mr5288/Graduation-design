function changeStyleRed() {
    var stylecss = document.querySelector('.layui-layout-admin .layui-header')
    stylecss.css("background-color", "red");
}

function changeStyleBlue() {
    var stylecss = document.getElementById("css");
    stylecss.setAttribute("href", "../layui/css/layui.css");
}

function changeStyleDefault() {
    var stylecss = document.getElementById("css");
    stylecss.setAttribute("href", "");
}

function changeStyleGreen() {
    var stylecss = document.getElementById("css");
    stylecss.setAttribute("href", "");
}

function changeStylePurple() {
    var stylecss = document.getElementById("css");
    stylecss.setAttribute("href", "");
}