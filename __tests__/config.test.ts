import { HOMEKIT_TYPES } from "../src/accessories";
import { BlynkConfig, BlynkDeviceConfig } from "../src/config";

describe('BlynkConfig using defaults', () => {
  const blynkPlatformConfigJson =
    {
      "platform": "BlynkPlatform",
      "serverurl": "http://wwww.blynk.server",
      "devices": [
          {
              "name": "blynk app name",
              "token": "auth-token",
              "manufacturer": "who_done_it",
              "discover": false,
              "accessories": [
                {
                    "ame": "item name",
                    "type": "BUTTON",
                    "typeOf": "outlet",
                    "pintype": "virtual",
                    "pinnumber": "1",
                    "model": "accessory model",
                },
                {
                    "name": "item name",
                    "type": "SLIDER",
                    "typeOf": "temperature_sensor",
                    "pintype": "virtual",
                    "pinnumber": "111",
                    "model": "accessory model",
                }
            ]
          },
        ]
    };

    const verbose                 = false;
    let blynkConfig: BlynkConfig;
    const hapMock = jest.createMockFromModule('homebridge');
    const logMock = jest.createMockFromModule('homebridge/lib/logger');

    //@ts-ignore: implicit-any for here
    function logMessage(message: string, ...params): void {
      if (verbose) {
        console.log(message, ...params);
      }
    }

    beforeAll(() => {
      logMock.debug = jest.fn((message, ...params)  => { logMessage(`debug: ${message}`, ...params)});
      logMock.info  = jest.fn((message, ...params)  => { logMessage(`info: ${message}`, ...params)});
      logMock.warn  = jest.fn((message, ...params)  => { logMessage(`warn: ${message}`, ...params)});
      logMock.error = jest.fn((message, ...params)  => { logMessage(`error: ${message}`, ...params)});

      blynkConfig = new BlynkConfig(hapMock, logMock, blynkPlatformConfigJson);
    });

    test('BlynkConfig has been defined', () => {
      expect(blynkConfig).toBeDefined();
      expect(blynkConfig).toBeInstanceOf(BlynkConfig);
    })

    test('Validate device configuration', () => {
      expect(blynkConfig.platform).toBe(blynkConfig.DEFAULT_PLATFORM_NAME);
      expect(blynkConfig.pollerSeconds).toBe(blynkConfig.DEFAULT_BLYNK_POLLER_SECONDS);
    });

    test('Validate devices found in the config', () => {
      expect(blynkConfig.devices.length).toBe(1);

      const blynkDevice = blynkConfig.devices[0];
      expect(blynkDevice.discover).toBe(false);
      expect(blynkDevice.manufacturer).toBe("who_done_it");
      expect(blynkDevice.token).toBe("auth-token");
      expect(blynkDevice.name).toBe("blynk app name");
    });

    test('Validate widget configuration', () => {
      const blynkDevices: Array<BlynkDeviceConfig> = blynkConfig.devices;
      expect(blynkDevices[0].widgets.length).toBe(2);

      const blynkWidget = blynkDevices[0].widgets[0];
      expect(blynkWidget.getTypeOf()).toBe(HOMEKIT_TYPES.OUTLET);
      expect(blynkWidget.getName()).toBe('Wojstead Button');
      expect(blynkWidget.getManufacturer()).toBe('who_done_it');
      expect(blynkWidget.getModel()).toBe('accessory model');
      expect(blynkWidget.getWidgetType()).toBe('BUTTON');
      expect(blynkWidget.getPinType().toLowerCase()).toBe('virtual');
      expect(blynkWidget.getPinNumber()).toBe("1");
      expect(blynkWidget.getPinLabel()).toBe("Wojstead Button");

      expect(blynkDevices[0].widgets[1].getTypeOf()).toBe(HOMEKIT_TYPES.TEMPERATURE_SENSOR);
      expect(blynkDevices[0].widgets[1].getPin()).toBe(`http://wwww.blynk.server/external/api/get?token=auth-token&V111`);
     })
});

describe('BlynkConfig Fully Definied', () => {
  const blynkPlatformConfigJson =
    {
      "platform": "BlynkPlatform",
      "serverurl": "http://wwww.blynk.server",
      "pollerseconds": 1,
      "devices": [
          {
              "name": "blynk app name",
              "token": "auth-token",
              "manufacturer": "who_done_it",
              "discover": false,
              "accessories": [
                {
                    "name": "item name",
                    "type": "BUTTON",
                    "typeOf": "outlet",
                    "pintype": "virtual",
                    "pinnumber": "1",
                    "model": "accessory model",
                },
                {
                    "name": "item name",
                    "type": "SLIDER",
                    "typeOf": "temperature_sensor",
                    "pintype": "virtual",
                    "pinnumber": "111",
                    "model": "accessory model",
                }
            ]
          },
        ]
    };

  let blynkConfig: BlynkConfig;
  const verbose = false;
  const hapMock = jest.createMockFromModule('homebridge');
  const logMock = jest.createMockFromModule('homebridge/lib/logger');

  //@ts-ignore: implicit-any
  function logMessage(message: string, ...params): void {
    if (verbose) {
      console.log(message, ...params);
    }
  }

  beforeAll(() => {
    logMock.debug = jest.fn((message, ...params)  => { logMessage(`debug: ${message}`, ...params)});
    logMock.info  = jest.fn((message, ...params)  => { logMessage(`info: ${message}`, ...params)});
    logMock.warn  = jest.fn((message, ...params)  => { logMessage(`warn: ${message}`, ...params)});
    logMock.error = jest.fn((message, ...params)  => { logMessage(`error: ${message}`, ...params)});

    blynkConfig = new BlynkConfig(hapMock, logMock, blynkPlatformConfigJson);
  });

  test('BlynkConfig has been defined', () => {
    expect(blynkConfig).toBeDefined();
    expect(blynkConfig).toBeInstanceOf(BlynkConfig);
  })

  test('Validate device configuration', () => {
    expect(blynkConfig.platform).toBe('BlynkPlatform');
    expect(blynkConfig.pollerSeconds).toBe(1);
  });

  test('Validate devices found in the config', () => {
    expect(blynkConfig.devices.length).toBe(1);

    const blynkDevice = blynkConfig.devices[0];
    expect(blynkDevice.discover).toBe(false);
    expect(blynkDevice.manufacturer).toBe("who_done_it");
    expect(blynkDevice.token).toBe("auth-token");
    expect(blynkDevice.name).toBe("blynk app name");
  });

  test('Validate widget configuration', () => {
    const blynkDevices: Array<BlynkDeviceConfig> = blynkConfig.devices;
    expect(blynkDevices[0].widgets.length).toBe(2);

    const blynkWidget = blynkDevices[0].widgets[0];
    expect(blynkWidget.getTypeOf()).toBe(HOMEKIT_TYPES.OUTLET);
    expect(blynkWidget.getName()).toBe('item name');
    expect(blynkWidget.getManufacturer()).toBe('who_done_it');
    expect(blynkWidget.getModel()).toBe('accessory model');
    expect(blynkWidget.getWidgetType()).toBe('BUTTON');
    expect(blynkWidget.getPinType().toLowerCase()).toBe('virtual');
    expect(blynkWidget.getPinNumber()).toBe("1");
    expect(blynkWidget.getPinLabel()).toBe("item name");

    expect(blynkDevices[0].widgets[1].getTypeOf()).toBe(HOMEKIT_TYPES.TEMPERATURE_SENSOR);
    expect(blynkDevices[0].widgets[1].getPin()).toBe(`http://wwww.blynk.server/external/api/get?token=auth-token&V111`);
   })
})
