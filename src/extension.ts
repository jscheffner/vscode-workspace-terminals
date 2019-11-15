import { window, workspace, ExtensionContext, commands, TextEditor } from 'vscode';

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

const switchTerminal = (editor: TextEditor | undefined) => {
  const { workspaceFolders, getWorkspaceFolder, getConfiguration } = workspace;
  const { switchTerminal } = getConfiguration('workspace-terminals');
  const { activeTerminal } = window;

  const isActiveTerminalWorkspaceTerminal = () => activeTerminal
    && workspaceFolders
    && workspaceFolders.some(({ name }) => name === activeTerminal.name);

  if (!editor || switchTerminal === 'never' || (switchTerminal === 'from workspace terminals' && !isActiveTerminalWorkspaceTerminal())) {
    return;
  }

  const folder = getWorkspaceFolder(editor.document.uri);

  if (folder === undefined || (activeTerminal && folder.name === activeTerminal.name)) {
    return;
  }
  
  const term = window.terminals.find(({ name }) => (name === folder.name));

  if (term === undefined) {
    return;
  }

  term.show(false);
}

export function activate(context: ExtensionContext) {
  commands.registerCommand('extension.openWorkspaceTerminals', openWorkspaceTerminals);
  autoExecute();
  workspace.onDidChangeConfiguration(autoExecute);
  window.onDidChangeActiveTextEditor(switchTerminal);
}

export function deactivate() { }
