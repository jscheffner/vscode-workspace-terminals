import { window, workspace, ExtensionContext, commands } from 'vscode';

const autoExecute = () => {
		if (workspace.getConfiguration('workspace-terminals').auto) {
			commands.executeCommand('extension.openWorkspaceTerminals');
		}
};

export function activate(context: ExtensionContext) {
	commands.registerCommand('extension.openWorkspaceTerminals', () => {
		return (workspace.workspaceFolders  || []).map(folder => {
			if (!window.terminals.find(term => term.name === folder.name)) {
				return window.createTerminal({ cwd: folder.uri, name: folder.name });
			}
		});
	});

	autoExecute();
	workspace.onDidChangeConfiguration(autoExecute);
}

export function deactivate() {}
