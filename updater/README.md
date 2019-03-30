Билды должны быть собраны с помощью пакета electron-builder
Установить
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
