
import "./index.scss";
import "./template/template.js"


// 异步方法集合
// const sbFnGather = (() => {
//     // 同步调接口 (Promise.all)
//     const syncFn1 = () => {
//         const heavyApi = myfetch.fetchFn("heavyApi", {}, null);
//         const api1 = myfetch.fetchFn("api1", {}, null);
//         Promise.all([heavyApi, api1]).then(arr => {
//             console.log(arr);
//         })
//     }
//     // syncFn1();

//     // 嵌套同步调接口1 promise嵌套（仅是把promise抽成公共api）
//     const nestSyncFn1 = () => {
//         myjsonp.jsonpFn().then(res2 => {
//             console.log(res2);
//             myfetch.fetchFn("api1?id=1", {}).then(res1 => {
//                 const id = _.get(res1[0], "id", "0");
//                 console.log(id);
//             })
//         })
//     }
//     // nestSyncFn1();

//     // 嵌套同步调接口2 （es7语法asayn await）
//     const nestSyncFn2 = async () => {
//         let api1Id;
//         await myfetch.fetchFn("api1?id=1", {}, null).then(res1 => {
//             api1Id = _.get(res1[0], "id", "0");
//             console.log(api1Id, 'api1');
//         });
//         console.log('api1和api2之间');
//         await myfetch.fetchFn(`api2?id=${api1Id}`, {}).then(res2 => {
//             console.log(_.get(res2[0], "id", "0"), 'api2');
//         })
//         console.log('api2之后');
//     }
//     // nestSyncFn2();

//     // 针对promise的then方法误区实例
//     const mistake1 = () => {
//         let api1Id;
//         promiseFn.promiseFn("api1?id=1")
//             .then(res1 => {
//                 api1Id = _.get(res1[0], "id", "0");
//                 console.log(res1, 'res1');
//                 return api1Id;
//             }).then(id => {
//                 console.log(id, 'res2 inside');
//                 fetch(`http://localhost:3000/api2?id=${id}`, {}).then(res2 => {
//                     console.log('res2');
//                     return res2.json();
//                 })
//                 // return 999;
//             }).then(id => {
//                 console.log(id, 'res3');
//             })
//     }
//     // mistake1();

//     const mistake2 = () => {
//         return new Promise(resolve => {
//             fetch(`http://localhost:3000/api1?id=1`, {}).then(res1 => {
//                 console.log(1);
//                 resolve(res1.json());
//             })
//         }).then(res => {
//             const id = _.get(res[0], 'id', 0);
//             fetch(`http://localhost:3000/api2?id=${id}`, {}).then(res2 => {
//                 console.log(2);
//                 return res2.json();
//             })
//         })
//     }

//     // mistake2().then(data => {
//     //     console.log(data, 3);
//     // })
// })();