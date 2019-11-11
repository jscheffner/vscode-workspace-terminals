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


function changedEditor(e: any) {
  let folders = workspace.workspaceFolders;
  let terms = window.terminals;
  if (folders != undefined) {
    for (let f of folders) {
      // if editor's filepath includes workspace folder
      if (e.document.fileName.includes(f.uri.path)) {
        // and if there's a corresponding terminal
        for (let t of terms) {
          if (t.name == f.name) {
            // switch to that terminal
            t.show(false);
          }
        }
      }
    }
  }
}

export function activate(context: ExtensionContext) {
  commands.registerCommand('extension.openWorkspaceTerminals', openWorkspaceTerminals);
  autoExecute();
  workspace.onDidChangeConfiguration(autoExecute);

  let switch_terminals = workspace.getConfiguration('workspace-terminals').get("switch_terminals");
  if (switch_terminals) {
    // trigger at every active editor change
    window.onDidChangeActiveTextEditor(e => {
      changedEditor(e);
    });
  }
}

export function deactivate() { }
