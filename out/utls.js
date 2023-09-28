"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveFolderPath = void 0;
const vscode = require("vscode");
function getActiveFolderPath() {
    if (vscode.window.activeTextEditor?.document) {
        const pathToActiveFile = vscode.window.activeTextEditor.document.uri.path;
        const activeFolder = vscode.workspace.workspaceFolders?.find((folder) => {
            return pathToActiveFile.includes(folder.uri.path);
        });
        return activeFolder;
    }
}
exports.getActiveFolderPath = getActiveFolderPath;
//# sourceMappingURL=utls.js.map