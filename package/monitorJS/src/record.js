let uuid = 0
export  default class Record {
    id
    lineNo //出错行
    colNo //出错列
    path // 页面url
    time //时间
    agnet //浏览器信息
    message // 错误信息
    type //错误类型
    device //设备信息
    system //操作系统信息
    network //网络信息
    constructor() {
        this.id = uuid++
    }
}