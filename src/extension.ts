import * as vscode from "vscode";

const TAG_REGEX = /<\/?(?:com|prop):[^>]+?>|<%@[^%]*%>/g;

let decorationType: vscode.TextEditorDecorationType | undefined;

function getHighlightColor(): string {
    const config = vscode.workspace.getConfiguration("prado");
    const colorConfig = config.get("highlightColor") as { dark?: string; light?: string } | undefined;
    const fallback = { dark: "#FFFFFF25", light: "#FFFA0040" };
    const resolved = colorConfig && typeof colorConfig === "object" ? colorConfig : fallback;
    const isLight = vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Light;
    return isLight ? resolved.light || fallback.light : resolved.dark || fallback.dark;
}

function ensureDecorationType(): void {
    const color = getHighlightColor();
    if (decorationType) {
        decorationType.dispose();
    }
    decorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: color
    });
}

function collectRanges(document: vscode.TextDocument): vscode.Range[] {
    const text = document.getText();
    const ranges: vscode.Range[] = [];
    let match: RegExpExecArray | null;
    TAG_REGEX.lastIndex = 0;
    while ((match = TAG_REGEX.exec(text)) !== null) {
        const start = document.positionAt(match.index);
        const end = document.positionAt(match.index + match[0].length);
        ranges.push(new vscode.Range(start, end));
    }
    return ranges;
}

function updateEditor(editor: vscode.TextEditor | undefined): void {
    if (!editor || editor.document.languageId !== "prado") {
        return;
    }

    const enabled = vscode.workspace.getConfiguration("prado").get("highlight", true);
    if (!enabled) {
        editor.setDecorations(decorationType!, []);
        return;
    }

    const ranges = collectRanges(editor.document);
    editor.setDecorations(decorationType!, ranges);
}

export function activate(context: vscode.ExtensionContext): void {
    ensureDecorationType();

    const updateActive = () => updateEditor(vscode.window.activeTextEditor);

    updateActive();

    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(updateActive),
        vscode.workspace.onDidChangeTextDocument((event) => {
            const editor = vscode.window.activeTextEditor;
            if (editor && event.document === editor.document) {
                updateEditor(editor);
            }
        }),
        vscode.workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration("prado.highlight") || event.affectsConfiguration("prado.highlightColor")) {
                ensureDecorationType();
                updateActive();
            }
        }),
        vscode.window.onDidChangeActiveColorTheme(() => {
            ensureDecorationType();
            updateActive();
        })
    );
}

export function deactivate(): void {
    if (decorationType) {
        decorationType.dispose();
        decorationType = undefined;
    }
}
