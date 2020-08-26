const iot = require('alibabacloud-iot-device-sdk');

options = {
    productKey: '',
    deviceName: '',
    deviceSecret: ''
};

const device = iot.device(options);

var attrs = {
    temperature: 0,
    humidity: 0,
    power: 0,
    period: 10
};

device.on('connect', () => {
    console.log('connect succesfully');
    setInterval(function () {
        device.postProps(attrs, (res) => {
            if (res.code == 200) {
                console.log('post succesfully', JSON.stringify(attrs));
            }
        });
    }, 10000);
});

device.onProps((res) => {
    console.log('onProps', res);
    if (res.params.powerstate != undefined) {
        attrs.powerstate = res.params.powerstate;
    }
    if (res.params.colorTemperature != undefined) {
        attrs.colorTemperature = res.params.colorTemperature;
    }
    if (res.params.brightness != undefined) {
        attrs.brightness = res.params.brightness;
    }
});
