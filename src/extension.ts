import { window, workspace, ExtensionContext, commands } from 'vscode';

const openWorkspaceTerminals = () => {
  const { workspaceFolders = [] } = workspace;
  const terminals = workspaceFolders
    .filter(({ name }) => !window.terminals.find(term => term.name === name))
    .map(({ uri, name }) => window.createTerminal({ cwd: uri, name }));
  
  if (terminals[0]) {
    terminals[0].show();
  }
};

const autoExecute = () => {
  const { auto } = workspace.getConfiguration('workspace-terminals');
  const numberOfWorkspaceFolders = workspace.workspaceFolders
    ? workspace.workspaceFolders.length
    : 0;

  if (auto === 'always' || (auto === 'multi-root' && numberOfWorkspaceFolders > 1)) {
    openWorkspaceTerminals();
  }
};

export function activate(context: ExtensionContext) {
  commands.registerCommand('extension.openWorkspaceTerminals', openWorkspaceTerminals);
  autoExecute();
  workspace.onDidChangeConfiguration(autoExecute);
}

export function deactivate() {}
