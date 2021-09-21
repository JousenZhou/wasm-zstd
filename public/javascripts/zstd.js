export default class  {
    // wasm模块线程
    instance = null;
    // 构造函数
    constructor() {
        this.instance = new Worker('/javascripts/worker.js');
    }
    // 解压
    decompression(arrays){
        let { instance } = this;
        return new Promise(resolve => {
            instance.onmessage = function (e) {
                resolve(e.data);
            };
            instance.postMessage(arrays);
        })
    }
}