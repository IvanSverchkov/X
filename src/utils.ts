import * as vscode from 'vscode';

export function getActiveFolderPath() {
	if (vscode.window.activeTextEditor?.document) {
		const pathToActiveFile = vscode.window.activeTextEditor.document.uri.path;

		const activeFolder = vscode.workspace.workspaceFolders?.find((folder) => {
			return pathToActiveFile.includes(folder.uri.path);
		});

		return activeFolder;
	}
}