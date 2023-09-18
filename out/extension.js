"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const cp = require("child_process");
// ----------------------------------------------------------------------------
// Вспомогательные функции
// ----------------------------------------------------------------------------
function getActiveFolderPath() {
    if (vscode.window.activeTextEditor?.document) {
        const pathToActiveFile = vscode.window.activeTextEditor.document.uri.path;
        const activeFolder = vscode.workspace.workspaceFolders?.find((folder) => {
            return pathToActiveFile.includes(folder.uri.path);
        });
        return activeFolder;
    }
}
function activate(context) {
    // --------------------------------------------------------------------------
    // Подготовка нескольких терминалов для работы
    // --------------------------------------------------------------------------
    const prepareTerminals = vscode.commands.registerCommand('MyHelpfulExtension.prepareTerminals', () => {
        if (vscode.window.activeTerminal) {
            const frontend = vscode.window.createTerminal({
                name: 'Frontend',
                color: new vscode.ThemeColor('terminal.ansiGreen'),
            });
            const databaseTerminal = vscode.window.createTerminal({
                name: 'Database',
                color: new vscode.ThemeColor('terminal.ansiMagenta'),
            });
            vscode.window.createTerminal({
                name: 'Terminal',
            });
            databaseTerminal.sendText('cd semrush_app_center/');
        }
    });
    // --------------------------------------------------------------------------
    // Подготовка сообщения для commit
    // --------------------------------------------------------------------------
    const prepareCommitMessage = vscode.commands.registerCommand('MyHelpfulExtension.prepareCommitMessage', () => {
        if (vscode.window.activeTerminal) {
            let currentBranchName = '';
            try {
                const folder = getActiveFolderPath();
                if (folder) {
                    currentBranchName = cp.execSync(`cd ${folder.uri.fsPath} && git rev-parse --abbrev-ref HEAD`, { encoding: 'utf-8' }).replace('\n', '') + ' ';
                }
            }
            catch (e) {
                console.error(e);
            }
            vscode.window.activeTerminal.sendText(`git commit -m "${currentBranchName}`, false);
            vscode.window.activeTerminal.show();
        }
    });
    // --------------------------------------------------------------------------
    // Подготовка сообщения для stash
    // --------------------------------------------------------------------------
    const prepareStashMessage = vscode.commands.registerCommand('MyHelpfulExtension.prepareStashMessage', () => {
        if (vscode.window.activeTerminal) {
            let currentBranchName = '';
            try {
                const folder = getActiveFolderPath();
                if (folder) {
                    currentBranchName = cp.execSync(`cd ${folder.uri.fsPath} && git rev-parse --abbrev-ref HEAD`, { encoding: 'utf-8' }).replace('\n', '') + ' ';
                }
            }
            catch (e) {
                console.error(e);
            }
            vscode.window.activeTerminal.sendText(`git stash push -m "${currentBranchName}`, false);
            vscode.window.activeTerminal.show();
        }
    });
    context.subscriptions.push(prepareTerminals);
    context.subscriptions.push(prepareCommitMessage);
    context.subscriptions.push(prepareStashMessage);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map