"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareCommitMessage = void 0;
const vscode = require("vscode");
const cp = require("child_process");
const utils_1 = require("../utils");
// --------------------------------------------------------------------------
// Подготовка сообщения для commit
// --------------------------------------------------------------------------
exports.prepareCommitMessage = vscode.commands.registerCommand('MyHelpfulExtension.prepareCommitMessage', () => {
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
        vscode.window.activeTerminal.sendText(`git commit -m "${currentBranchName}`, false);
        vscode.window.activeTerminal.show();
    }
});
//# sourceMappingURL=prepareCommitMessage.js.map