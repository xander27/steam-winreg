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
{ Language: 'russian',
  SteamExe: 'd:/steam/steam.exe',
  SteamPath: 'd:/steam',
  SuppressAutoRun: false,
  Restart: false,
  BigPictureInForeground: false,
  RememberPassword: true,
  SourceModInstallPath: 'D:\\steam\\steamapps\\sourcemods',
  Rate: '30000',
  AlreadyRetriedOfflineMode: false,
  WebHelperFirewall: 2,
  DWriteEnable: true,
  StartupMode: false,
  RunningAppID: 0 }
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

### Get info about active process

```javascript
import {getSettings} from 'steam-winreg'

async function main(){
    console.log(await getActiveProcess());
}

main().then();
```

Output:

```javascript
{ pid: 0,
  SteamClientDll: 'D:\\steam\\steamclient.dll',
  SteamClientDll64: 'D:\\steam\\steamclient64.dll',
  Universe: 'Public',
  ActiveUser: 0 }
```
or
```javascript
null
``` 

# License
MIT
