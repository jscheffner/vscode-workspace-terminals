import { window, workspace, ExtensionContext, commands, TextEditor, Terminal, WorkspaceFolder } from 'vscode';

const getActiveWorkspaceTerminal = (editor: TextEditor, terminals: readonly Terminal[]): Terminal | undefined => {
  const folder = workspace.getWorkspaceFolder(editor.document.uri);
  if (!folder) {
    return;
  }

  return terminals.find(({ name }) => (name === folder.name));
};

const openWorkspaceTerminals = () => {
  const { workspaceFolders = [] } = workspace;
  const { activeTextEditor } = window;

  const createdTerminals = workspaceFolders
    .filter(({ name }) => !window.terminals.find(term => term.name === name))
    .map(({ uri, name }) => window.createTerminal({ cwd: uri, name }));

  const activeWorkspaceTerminal = activeTextEditor && getActiveWorkspaceTerminal(activeTextEditor, createdTerminals);
  const switchTo = activeWorkspaceTerminal || createdTerminals[0];

  switchTo?.show(false);
};

const autoExecute = () => {
  const { auto } = workspace.getConfiguration('workspace-terminals');
  const numberOfWorkspaceFolders = workspace.workspaceFolders
    ? workspace.workspaceFolders.length
    : 0;

  if (auto === 'always' || (auto === 'multiRoot' && numberOfWorkspaceFolders > 1)) {
    openWorkspaceTerminals();
  }
};

const switchTerminal = (editor: TextEditor | undefined) => {
  const { workspaceFolders, getConfiguration } = workspace;
  const { switchTerminal } = getConfiguration('workspace-terminals');
  const { activeTerminal } = window;

  const isActiveTerminalWorkspaceTerminal = () => activeTerminal
    && workspaceFolders
    && workspaceFolders.some(({ name }) => name === activeTerminal.name);

  if (!editor || switchTerminal === 'never' || (switchTerminal === 'fromWorkspaceTerminals' && !isActiveTerminalWorkspaceTerminal())) {
    return;
  }

  getActiveWorkspaceTerminal(editor, window.terminals)?.show(false);
};

export function activate(context: ExtensionContext) {
  commands.registerCommand('extension.openWorkspaceTerminals', openWorkspaceTerminals);
  autoExecute();
  workspace.onDidChangeConfiguration(autoExecute);
  workspace.onDidChangeWorkspaceFolders(autoExecute);
  window.onDidChangeActiveTextEditor(switchTerminal);
}

export function deactivate() { }
