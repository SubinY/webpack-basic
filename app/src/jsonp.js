const URL = "https://api.douban.com/v2/book/1220562";

let jsonpFn = (fn = null) => {
    return new Promise(resolve => {
        $.ajax({
            url: URL,
            type: "GET",
            dataType: "jsonp", //指定服务器返回的数据类型
            success: function (data) {
                resolve(data);
            }
        });
    })
}

module.exports = {
    jsonpFn: jsonpFn
}