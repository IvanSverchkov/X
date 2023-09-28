import * as vscode from 'vscode';
import * as cp from 'child_process';

import { getActiveFolderPath } from '../utils';

// --------------------------------------------------------------------------
// Подготовка сообщения для commit
// --------------------------------------------------------------------------
export const prepareCommitMessage = vscode.commands.registerCommand('MyHelpfulExtension.prepareCommitMessage', () => {
  if (vscode.window.activeTerminal) {
    let currentBranchName: string = '';

    try {
      const folder = getActiveFolderPath();
      if (folder) {
        currentBranchName = cp.execSync(`cd ${folder.uri.fsPath} && git rev-parse --abbrev-ref HEAD`, { encoding: 'utf-8' }).replace('\n', '') + ' ';
      }
    } catch(e: any) {
      console.error(e);
    }

    vscode.window.activeTerminal.sendText(`git commit -m "${currentBranchName}`, false);
    vscode.window.activeTerminal.show();
  }
});
