Билды должны быть собраны с помощью пакета electron-builder

Апдейтер представляет из себя просто папку на веб сайте где лежит .yml файл с описанием последней версии и сам инсталлер. Апдейте открывает yml, сравнивает версию и уже действует исходя из увиденного.

Версия приложения береться из `package.json` который лежит в папке с билдом. Будь аккауратен, если ты не укажешь папку где лежат все файлы для приложения, твой билдер запакует вообще всю папку с приложением. Я перемещаю все js бандлы, ассеты в отедльную папку и явно указываю ее для билдера.

Для сброа билдов я рекомендую использовать команду 
```sh
npm run build
```
А все параметры для сборки указывать в `package.json` в поле `build`. У вас там все сделано как-то странно через кучу файлов и настроек. В конце будет пример моего `build` под `win`.

Установить апдейтер
```sh
npm i --save electron-updater
```

в package.json следует дбавить строчки места где лежат наши апйдеты
```sh
"build": {
    ....
    "publish": [
      {
        "provider": "generic",
        "url": "https://site.com/path_with_installer_and_yml/"
      }
    ]
  }
  ```
  
после билда получатья инсталеры + файлы latest.yml для win, latest-mac.yml для macOS, latest-linux.yml для Linux.

при старте приложения необходимо инициализировать код из файла backend.js.
Там описана ситуация когда мы сначала спрашиваем пользователя и только потом качаем обновление. Там есть куча событий, можно кастомизировать как угодно

подробне https://www.electron.build/auto-update

мануалы по сборке https://www.electron.build/configuration/configuration

полный пример моего build

```sh
"build": {
    "appId": "facebot",
    "mac": {
      "category": "your.app.category.type"
    },
    "win": {
      "target": "nsis"
    },
    "directories": {
      "output": "release-installer",
      "app": "prod" --- папка с билдом после webpack
    },
    "extends": null,
    "squirrelWindows": {
      "msi": true
    },
    "nsis": {
      "allowElevation": true,
      "createDesktopShortcut": false,
      "createStartMenuShortcut": false,
      "runAfterFinish": false,
      "deleteAppDataOnUninstall": false
    },
    "publish": [
      {
        "provider": "generic",
        "url": "https://site.com/"
      }
    ]
  }
```
