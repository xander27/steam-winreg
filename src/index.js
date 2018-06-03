import Registry from 'winreg'

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

function parseRegistryItem(item){
    let value = item.value;
    if(BOOLEAN_FIELDS.has(item.name)) {
         value = item.value.endsWith('1');
    } else if (value.startsWith('0x')){
        value = parseInt(value, 16);
    }
    return {
        name: item.name,
        value
    };
}

function parseApp(app){
    let result = {};
    for(let {name, value} of app){
        result[name] = value;
    }
    if(!result['Name']){
        return null;
    }
    return result;
}

function parseRegistryKey(key){
    return key.path;
}

function getRegistryItems(hive, key) {
    // noinspection JSCheckFunctionSignatures
    return new Promise(((resolve, reject) => new Registry({hive, key}).values((err, items) => {
        if (err) {
            return reject(err);
        }
        return resolve(items.map(parseRegistryItem));
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
    .then(keys => Promise.all(keys.map(key => getRegistryItems(Registry.HKCU, key))))
    .then(data => data.map(parseApp).filter(a => !!a));