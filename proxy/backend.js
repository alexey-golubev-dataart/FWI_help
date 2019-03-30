import { app } from 'electron';

/*
* Если прокси с авторизацией то в бекендной части следует добавить код авторизации прокси.
* к сожалению вариант когда мы задаем http://login;pass@host:port в фронтендовой части
* у меня не работал, возможно его добавили в более свежих версиях
*/

app.on('login', (event, webContents, request, authInfo, callback) => {
    if(authInfo.isProxy){
        let settings = getSettings();
        if(settings && settings.proxy && settings.proxy.login){
            callback(settings.proxy.login, settings.proxy.password);
            return;
        }
    }
    callback('', '');
});