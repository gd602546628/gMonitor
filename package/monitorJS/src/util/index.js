export function getDevice () {
    let device = {};
    let ua = navigator.userAgent;
    let android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    let ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    let iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    let mobileInfo = ua.match(/Android\s[\S\s]+Build\//);
    device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
    device.isWeixin = /MicroMessenger/i.test(ua);
    device.os = "web";
    device.deviceName = "PC";
    // Android
    if (android) {
        device.os = 'android';
        device.osVersion = android[2];
        device.android = true;
        device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
        device.osVersion = iphone[2].replace(/_/g, '.');
        device.iphone = true;
    }
    if (ipad) {
        device.osVersion = ipad[2].replace(/_/g, '.');
        device.ipad = true;
    }
    if (ipod) {
        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        device.iphone = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
        if (device.osVersion.split('.')[0] === '10') {
            device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
        }
    }

    // 如果是ios, deviceName 就设置为iphone，根据分辨率区别型号
    if (device.iphone) {
        device.deviceName = "iphone";
        let screenWidth = window.screen.width;
        let screenHeight = window.screen.height;
        if (screenWidth === 320 && screenHeight === 480) {
            device.deviceName = "iphone 4";
        } else if (screenWidth === 320 && screenHeight === 568) {
            device.deviceName = "iphone 5/SE";
        } else if (screenWidth === 375 && screenHeight === 667) {
            device.deviceName = "iphone 6/7/8";
        } else if (screenWidth === 414 && screenHeight === 736) {
            device.deviceName = "iphone 6/7/8 Plus";
        } else if (screenWidth === 375 && screenHeight === 812) {
            device.deviceName = "iphone X/S/Max";
        }
    } else if (device.ipad) {
        device.deviceName = "ipad";
    } else if (mobileInfo) {
        let info = mobileInfo[0];
        let deviceName = info.split(';')[1].replace(/Build\//g, "");
        device.deviceName = deviceName.replace(/(^\s*)|(\s*$)/g, "");
    }
    // 浏览器模式, 获取浏览器信息
    // TODO 需要补充更多的浏览器类型进来
    if (ua.indexOf("Mobile") == -1) {
        let agent = navigator.userAgent.toLowerCase();
        let regStr_ie = /msie [\d.]+;/gi;
        let regStr_ff = /firefox\/[\d.]+/gi
        let regStr_chrome = /chrome\/[\d.]+/gi;
        let regStr_saf = /safari\/[\d.]+/gi;

        device.browserName = '未知';
        //IE
        if (agent.indexOf("msie") > 0) {
            let browserInfo = agent.match(regStr_ie)[0];
            device.browserName = browserInfo.split('/')[0];
            device.browserVersion = browserInfo.split('/')[1];
        }
        //firefox
        if (agent.indexOf("firefox") > 0) {
            let browserInfo = agent.match(regStr_ff)[0];
            device.browserName = browserInfo.split('/')[0];
            device.browserVersion = browserInfo.split('/')[1];
        }
        //Safari
        if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
            let browserInfo = agent.match(regStr_saf)[0];
            device.browserName = browserInfo.split('/')[0];
            device.browserVersion = browserInfo.split('/')[1];
        }
        //Chrome
        if (agent.indexOf("chrome") > 0) {
            let browserInfo = agent.match(regStr_chrome)[0];
            device.browserName = browserInfo.split('/')[0];
            device.browserVersion = browserInfo.split('/')[1];
        }
    }
    // Webview
    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

    // Export object
    return device;
}

export function getUUID(){
    let timeStamp = new Date().getTime()
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16) + "-" + timeStamp;
    });
}