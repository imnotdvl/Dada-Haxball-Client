const winstaller = require('electron-winstaller');
const path = require('path');

async function criarInstalador() {
    try {
        await winstaller.createWindowsInstaller({
            appDirectory: path.resolve(__dirname, 'MyClient-win32-x64'),
            outputDirectory: path.resolve(__dirname, 'dist/installer'),
            authors: '',
            exe: 'MyClient.exe',
            setupIcon: path.resolve(__dirname, 'icon.ico'),
            setupExe: 'ClientSetup.exe',
            noMsi: true,
            appDescription: ''
        });
    } catch (e) {}
}

criarInstalador();