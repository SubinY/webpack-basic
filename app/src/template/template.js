import myfetch from "../fetch.js";
import myjsonp from "../jsonp.js";
import promiseFn from "../promise.js";
import _ from 'lodash';

const templateHTML = require("./template.html");
// import templateHTML from './template/template.html';

// 基本dom操作
(() => {
    const root = document.getElementById("root");
    let newDiv = document.createElement("div");
    newDiv.innerHTML = templateHTML;
    root.appendChild(newDiv);
})();

(() => {
    const btnCS = document.getElementsByClassName("btnCS");
    const preTAG = document.getElementsByTagName("pre");
    const result = document.getElementById("result");
    const fnObj = [
        syncFn1,
        nestSyncFn1,
        nestSyncFn2,
        mistake1,
        mistake2
    ];
    for (let i = 0; i < btnCS.length; ++i) {
        btnCS[i].addEventListener("click", _ => {
            result.innerHTML = "";
            _prePublicFn(i);
            if (i === 4) {
                mistake2().then(data => {
                    resultWrap(`${data}, 3`)
                })
            } else {
                fnObj[i]();
            }
        })
    }

    function resultWrap(test) {
        const str = typeof test === 'string'? test: JSON.stringify(test);
        const dom = document.createElement("div");
        dom.setAttribute("class", "result-son");
        dom.innerHTML = str;
        result.appendChild(dom);
    }

    function _prePublicFn(index) {
        for (let i = 0; i < preTAG.length; ++i) {
            preTAG[i].setAttribute("style", "display: none;");
        }
        preTAG[index].style.display = "block";
    }

    // 同步调接口 (Promise.all)
    function syncFn1() {
        const heavyApi = myfetch.fetchFn("heavyApi", {}, null);
        const api1 = myfetch.fetchFn("api1", {}, null);
        Promise.all([heavyApi, api1]).then(arr => {
            resultWrap(`${arr}`);
            console.log(arr);
        })
    }
    // syncFn1();

    // 嵌套同步调接口1 promise嵌套（仅是把promise抽成公共api）
    function nestSyncFn1() {
        myjsonp.jsonpFn().then(res2 => {
            resultWrap(`${res2}`);
            myfetch.fetchFn("api1?id=1", {}).then(res1 => {
                const id = _.get(res1[0], "id", "0");
                resultWrap(`${id}`);
            })
        })
    }
    // nestSyncFn1();

    // 嵌套同步调接口2 （es7语法asayn await）
    async function nestSyncFn2() {
        let api1Id;
        await myfetch.fetchFn("api1?id=1", {}, null).then(res1 => {
            api1Id = _.get(res1[0], "id", "0");
            resultWrap(`${api1Id}, api1`);
        });
        resultWrap('api1和api2之间');
        await myfetch.fetchFn(`api2?id=${api1Id}`, {}).then(res2 => {
            resultWrap(`${_.get(res2[0], "id", "0")}, api2`);
        })
        resultWrap(`api2之后`);
    }
    // nestSyncFn2();

    // 针对promise的then方法误区实例
    function mistake1() {
        let api1Id;
        promiseFn.promiseFn("api1?id=1")
            .then(res1 => {
                api1Id = _.get(res1[0], "id", "0");
                resultWrap(`${res1}, res1`);
                return api1Id;
            }).then(id => {
                resultWrap(`${id}, res2 inside`);
                fetch(`http://localhost:3000/api2?id=${id}`, {}).then(res2 => {
                    resultWrap(`res2`);
                    return res2.json();
                })
                // return 999;
            }).then(id => {
                resultWrap(`${id}, res3`);
            })
    }
    // mistake1();

    function mistake2() {
        return new Promise(resolve => {
            fetch(`http://localhost:3000/api1?id=1`, {}).then(res1 => {
                resultWrap(`1`);
                resolve(res1.json());
            })
        }).then(res => {
            const id = _.get(res[0], 'id', 0);
            fetch(`http://localhost:3000/api2?id=${id}`, {}).then(res2 => {
                resultWrap(`2`);
                return res2.json();
            })
        })
    }

    // mistake2().then(data => {
    //     console.log(data, 3);
    // })
})();