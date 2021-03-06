(function () {
    $('#submit').on('click', function (e) {
        e.preventDefault();
        document.getElementById('url').value = location.href.split('#')[0];
        $.ajax({
            url: './wechat/configJsSDK.do',
            type: 'post',
            data: $("#from").serializeArray(),
            dataType: 'json',
            success: function (response, stat, xhr) {
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: response.data.appId, // 必填，公众号的唯一标识
                    timestamp: response.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
                    signature: response.data.signature,// 必填，签名
                    jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表
                });
                wx.ready(function(){
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    console.log("success ready");
                    wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        }
                    });
                });
                wx.error(function(res){
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                   // console.log("错误啦",res);
                });
            },
            error: function (xhr, stat, exception) {
                console.log("错误啦222",exception);
            }
        });
    });
}())