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
[ { name: 'Language', value: 'russian' },
  { name: 'SteamExe', value: 'd:/steam/steam.exe' },
  { name: 'SteamPath', value: 'd:/steam' },
  { name: 'SuppressAutoRun', value: false },
  { name: 'Restart', value: false },
  { name: 'BigPictureInForeground', value: false },
  { name: 'AutoLoginUser', value: 'xander27b' },
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
[ { Installed: false,
    Updating: false,
    Launching: false,
    Running: false,
    Name: 'Project Zomboid' },
  { Installed: false,
    Updating: false,
    Name: 'L.A. Noire',
    Running: false },
  { Installed: false,
    Updating: false,
    Name: 'Pox Nora',
    Running: false },
  { Installed: true,
    Updating: false,
    Name: 'Wolfenstein: The New Order',
    Running: false }
]
```

#License
MIT