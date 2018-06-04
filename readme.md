#  steam-winreg
Simple js helper functions to get information about local steam installation from windows registry

## Installation
```bash
npm i -S steam-winreg
```

## Examples
### Get steam settings
```javascript
import {getSettings} from 'steam-winreg'

async function main(){
    console.log(await getSettings());
}

main().then();
```

Output:
```javascript
[ { name: 'SteamExe', value: 'd:/steam/steam.exe' },
  { name: 'SteamPath', value: 'd:/steam' },
  { name: 'SuppressAutoRun', value: false },
  { name: 'Restart', value: false },
  { name: 'BigPictureInForeground', value: false },
  { name: 'RememberPassword', value: true },
  { name: 'SourceModInstallPath',
    value: 'D:\\steam\\steamapps\\sourcemods' },
  { name: 'Rate', value: '30000' },
  { name: 'AlreadyRetriedOfflineMode', value: false },
  { name: 'WebHelperFirewall', value: 2 },
  { name: 'DWriteEnable', value: true },
  { name: 'StartupMode', value: false },
  { name: 'RunningAppID', value: 0 } ]
```

### Get info about apps
**NOTE** steam save some information about apps which currently not installed in registry. See `Installed` property

```javascript
import {getSettings} from 'steam-winreg'

async function main(){
    console.log(await getApps());
}

main().then();
```

Output:

```javascript
{ '2820': 
   { Installed: false,
     Updating: false,
     Name: 'X3: Terran Conflict',
     Running: false },
  '8500': 
   { Installed: true,
     Updating: false,
     Launching: false,
     Running: false,
     Name: 'EVE Online' },
  '24980': 
   { Installed: false,
     Updating: false,
     Running: false,
     Name: 'Mass Effect 2' }
}
```

#License
MIT