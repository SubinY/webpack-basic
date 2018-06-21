const URL = "http://localhost:3000";

let promiseFn = (url) => {
    const baseUrl = `${URL}/${url}`;
    let xhr;
    return new Promise((resolve, reject) => {
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        // xhr.setRequestHeader("Cache-control", "no-cache");
        xhr.open("get", baseUrl, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.status)
                }
            }
        }
    })
}

module.exports = {
    promiseFn: promiseFn
}