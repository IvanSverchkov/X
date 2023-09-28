import * as vscode from 'vscode';
import * as cp from 'child_process';

import { getActiveFolderPath } from '../utils';

// --------------------------------------------------------------------------
// Подготовка сообщения для stash
// --------------------------------------------------------------------------
export const prepareStashMessage = vscode.commands.registerCommand('MyHelpfulExtension.prepareStashMessage', () => {
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

    vscode.window.activeTerminal.sendText(`git stash push -m "${currentBranchName}`, false);
    vscode.window.activeTerminal.show();
  }
});