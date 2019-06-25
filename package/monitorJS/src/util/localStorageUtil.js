export default {

    setItem(key, value) {
        if (typeof value === 'string') {
            localStorage.setItem(key, value)
        } else {
            value = value ? JSON.stringify(value) : null
            localStorage.setItem(key, value)
        }
    },

    getItem(key) {
        try {
            return JSON.parse(localStorage.getItem(key))
        } catch (e) {
            return localStorage.getItem(key)
        }
    }

}

