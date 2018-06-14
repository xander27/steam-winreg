import Registry from 'winreg'
import fromPairs from 'lodash.frompairs'

const BOOLEAN_FIELDS = new Set([
    'SuppressAutoRun',
    'Restart',
    'BigPictureInForeground',
    'RememberPassword',
    'AlreadyRetriedOfflineMode',
    'DWriteEnable',
    'StartupMode',
    'Installed',
    'Updating',
    'Launching',
    'Running',
]);

function parseRegistryItem(item) {
    let value = item.value;
    if (BOOLEAN_FIELDS.has(item.name)) {
        value = item.value.endsWith('1');
    } else if (value.startsWith('0x')) {
        value = parseInt(value, 16);
    }
    return [item.name, value];
}

function parseApp(app) {
    let result = {};
    for (let {name, value} of app) {
        result[name] = value;
    }
    if (!result['Name']) {
        return null;
    }
    return result;
}

function parseRegistryKey(key) {
    return key.path;
}

function getRegistryItems(hive, key) {
    // noinspection JSCheckFunctionSignatures
    return new Promise(((resolve, reject) => new Registry({hive, key}).values((err, items) => {
        if (err) {
            return reject(err);
        }
        return resolve(fromPairs(items.map(parseRegistryItem)));
    })));
}

function getRegistryKeys(hive, key) {
    return new Promise(((resolve, reject) => new Registry({hive, key}).keys((err, items) => {
        if (err) {
            return reject(err);
        }
        return resolve(items.map(parseRegistryKey));
    })));
}

/**
 * Get steam settings
 */
export const getSettings = () => getRegistryItems(Registry.HKCU, '\\Software\\Valve\\Steam');

/**
 * Get list of Apps (including not installed)
 */
export const getApps = () => getRegistryKeys(Registry.HKCU, '\\Software\\Valve\\Steam\\Apps')
    .then(keys => keys.filter(k => !!k).map(k => k.substr(4)))
    .then(keys => Promise.all(keys.map(key => getRegistryItems(Registry.HKCU, key).then(data => ({data, key})))))
    .then(items => {
        let result = {};
        for (let {key, data} of items) {
            let app = parseApp(data);
            if (!app) {
                continue;
            }
            let parts = key.split('\\');
            let id = parts[parts.length - 1];
            result[id] = app;
        }
        return result;
    });

/**
 * Get active process info or {@code null} if no steam process running
 */
export const getActiveProcess = () => getRegistryItems(Registry.HKCU, '\\Software\\Valve\\Steam\\ActiveProcess')
    .then(data => {
        if (data['ActiveUser'] === 0) {
            return null;
        }
        return data;
    });


getActiveProcess().then(console.log);