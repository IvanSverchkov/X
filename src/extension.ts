// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { prepareTerminals } from './commands/prepareTerminals';
import { prepareCommitMessage } from './commands/prepareCommitMessage';
import { prepareStashMessage } from './commands/prepareStashMessage';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(prepareTerminals);
	context.subscriptions.push(prepareCommitMessage);
	context.subscriptions.push(prepareStashMessage);
}

export function deactivate() {}
