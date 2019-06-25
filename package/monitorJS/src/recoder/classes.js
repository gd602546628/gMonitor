import {getDevice} from '../util/index'

class Base {
    constructor() {
        this.happenTime = new Date().getTime()
        this.simpleUrl = window.location.href.split('?')[0].replace('#', ''); // 页面的url
        this.completeUrl = window.location.href // 页面的完整url
        let device = getDevice()
        this.browserName = device.browserName
        this.browserVersion = device.browserVersion
        this.deviceName = device.deviceName
        this.os = device.os
    }
}

export class JavascriptInfo extends Base {
    constructor({line, column, errorMessage, errorStack, errorType}) {
        super();
        this.line = line
        this.column = column
        this.errorMessage = errorMessage
        this.errorStack = errorStack
        this.errorType = errorType
    }
}

export class ResourceInfo extends Base {
    constructor({sourceUrl, elementType}) {
        super()
        this.sourceUrl = sourceUrl
    }
}

export class EventInfo extends Base {
    constructor({tagName, clientX, clientY, className, idName, eventType,}) {
        super()
        this.tagName = tagName
        this.clientX = clientX
        this.clientY = clientY
        this.className = className
        this.idName = idName
        this.eventType = eventType
    }
}

export class HttpInfo extends Base {
    constructor({startTime, endTime, disTime, requestData, queryData, responseData,requestUrl}) {
        super()
        this.startTime = startTime
        this.endTime = endTime
        this.disTime = disTime
        this.requestData = requestData
        this.queryData = queryData
        this.responseData = responseData
        this.requestUrl = requestUrl
    }
}