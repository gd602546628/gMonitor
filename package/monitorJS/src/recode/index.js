import {JavascriptInfo, ResourceInfo, HttpInfo, EventInfo} from './classes'
import {isFunction, noop} from '../util/index'

export default class Recode {
    constructor(options = {}) {
        this.options = options || {};
        ['jsHandler', 'eventHandler', 'resourceHandler', 'httpHandler'].forEach(key => {
            this.options[key] = isFunction(options[key]) ? options[key] : noop
        })
        this.init()
    }

    init() {
        this.recordJsAndResourceError()
        this.recordEvent()
        this.recordHttp()
    }

    recordJsAndResourceError() {
        window.addEventListener('error', (error) => {
            if (error instanceof ErrorEvent) { //js异常
                let jsInfo = new JavascriptInfo({
                    line: error.lineno,
                    column: error.colno,
                    errorMessage: error.message,
                    errorType: 'jsError',
                    fileName: error.filename,
                    errorStack: error.error && error.error.stack
                })
                this.options.jsHandler(jsInfo, error)
            } else { // 资源异常
                const target = error.target || {}
                let resourceInfo = new ResourceInfo({
                    sourceUrl: target.src || target.href,
                    elementType: target.localName,
                    errorType: 'resourceError'
                })
                this.options.resourceHandler(resourceInfo, error)
            }

        }, true)

        window.addEventListener('unhandledrejection', error => {
            let jsInfo = new JavascriptInfo({
                errorMessage: error.reason && error.reason.message,
                errorType: 'promiseError',
                errorStack: error.reason && error.reason.stack
            })
            this.options.jsHandler(jsInfo, error)
        })
    }


    recordEvent() {
        window.addEventListener('click', (event) => {
            const target = event.target || {}
            let eventInfo = new EventInfo({
                tagName: target.localName,
                clientX: event.clientX,
                clientY: event.clientY,
                className: target.className,
                idName: target.id,
                eventType: 'click'
            })
            this.options.eventHandler(eventInfo, event)
        })
    }

    recordHttp() {

    }


}