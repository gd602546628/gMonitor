import InDB from 'indb'

const RECORD = 'RECORD' // record story name
const OPERATION = 'OPERATION' // operation story name
import Operation from './operation'
import Record from './record'

const noop = function () {
}
export default class ErrorWatcher {
    db
    currentEvent

    constructor() {
        this.init()
    }

    init() {

        document.addEventListener('click', (e) => {
            this.currentEvent = e
        })

        window.addEventListener('error', (event) => {
            console.log(event)
            setTimeout(() => {
                console.log(this.currentEvent)
            }, 0)
        })

        window.addEventListener('unhandledrejection', (e) => {
            console.log(e)
        })
    }

    createDb() {
        this.db = new InDB({
            name: 'g_monitor',
            stores: [
                {
                    name: RECORD,
                    keyPath: 'id',
                    indexes: [{
                        name: 'id',
                        keyPath: 'id'
                    }]
                },

                {
                    name: OPERATION,
                    keyPath: 'id',
                    indexes: [{
                        name: 'id',
                        keyPath: 'id'
                    }]
                }

            ]
        })
    }

    switchStore(name) {
        if (this.db) {
            this.db.use(name)
        }
    }

    createRecord() {
        const record = new Record()
        return record
    }

    createOperation() {
        const operation = new Operation()
        return operation
    }


}