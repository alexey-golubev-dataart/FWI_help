import { dialog } from 'electron';
import { autoUpdater } from 'electron-updater';


autoUpdater.autoDownload = false;

autoUpdater.on('error', (error) => {
    // log error
});

autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Обновление',
        message: 'Хотите обновиться? Загрузка начнется после вашего согласия. Не закрывайте программу пока не увидите сообщение об удачной загрузке.',
        buttons: ['Да', 'Нет'],
    }, (buttonIndex) => {
        if (buttonIndex === 0) {
        autoUpdater.downloadUpdate();
        }
    });
});

autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
        title: 'Установка обновлений',
        message: 'Обновления загружены. Запустите программу после установки.',
    }, () => {
        setImmediate(() => autoUpdater.quitAndInstall(false, false));
    });
});

autoUpdater.checkForUpdates();