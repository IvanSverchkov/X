"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareTerminals = void 0;
const vscode = require("vscode");
// --------------------------------------------------------------------------
// Подготовка нескольких терминалов для работы
// --------------------------------------------------------------------------
exports.prepareTerminals = vscode.commands.registerCommand('MyHelpfulExtension.prepareTerminals', () => {
    if (vscode.window.activeTerminal) {
        const frontend = vscode.window.createTerminal({
            name: 'Frontend',
            color: new vscode.ThemeColor('terminal.ansiGreen'),
        });
        const databaseTerminal = vscode.window.createTerminal({
            name: 'Database',
            color: new vscode.ThemeColor('terminal.ansiMagenta'),
        });
        const terminal = vscode.window.createTerminal({
            name: 'Terminal',
        });
        databaseTerminal.sendText('cd semrush_app_center/');
        setTimeout(() => {
            frontend.sendText('clear');
            databaseTerminal.sendText('clear');
            terminal.sendText('clear');
        }, 1000);
    }
});
//# sourceMappingURL=prepareTerminals.js.map