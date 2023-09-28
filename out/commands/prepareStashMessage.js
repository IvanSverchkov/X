"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareStashMessage = void 0;
const vscode = require("vscode");
const cp = require("child_process");
const utils_1 = require("../utils");
// --------------------------------------------------------------------------
// Подготовка сообщения для stash
// --------------------------------------------------------------------------
exports.prepareStashMessage = vscode.commands.registerCommand('MyHelpfulExtension.prepareStashMessage', () => {
    if (vscode.window.activeTerminal) {
        let currentBranchName = '';
        try {
            const folder = (0, utils_1.getActiveFolderPath)();
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
//# sourceMappingURL=prepareStashMessage.js.map