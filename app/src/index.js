import fetch from "./fetch.js";
import _ from 'lodash';
// 同步调接口
const syncFn1 = () => {
    const heavyApi = fetch.fetchFn("heavyApi", {}, null);
    const api1 = fetch.fetchFn("api1", {}, null);
    Promise.all([heavyApi, api1]).then(arr => {
        console.log(arr);
    })
}
// syncFn1();

// 嵌套同步调接口1 promise嵌套（仅是把promise抽成公共api）
const nestSyncFn1 = () => {
    fetch.fetchFn("api1?id=1", {}).then(res1 => {
        const id = _.get(res1[0], "id", "0");
        fetch.fetchFn(`api2?id=${id}`).then(res2 => {
            console.log(_.get(res2[0], "id", "0"));
        })
    })
}
// nestSyncFn1();

// 嵌套同步调接口2 （asayn await）
const nestSyncFn2 = async () => {
    const api1Id;
    await fetch.fetchFn("api1?id=1", {}, null).then(res1 => {
        api1Id = _.get(res1[0], "id", "0");
    });
    console.log('api1和api2之间');
    await fetch.fetchFn(`api1?id=${api1Id}`, {}).then(res2 => {
        console.log(_.get(res2[0], "id", "0"));
    })
    console.log('api2之后');
}
nestSyncFn2();