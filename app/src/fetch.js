const URL = "http://localhost:3000";

let fetchFn = (url, opt, fn) => {
    const baseUrl = `${URL}/${url}`;
    const option = {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'authorization': 'Bearer anonymous.anonymous',
            'Content-Type': 'application/json',
            'Cache-control': 'no-cache',
        }
    }
    Object.assign(option, opt);
    return fetch(baseUrl, option).then(res => {
        if (fn) {
            fn();
        }
        return res.json();
    })
}

module.exports = {
    fetchFn: fetchFn
}