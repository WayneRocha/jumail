import { Serializable } from "child_process";

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export  function replaceVariables(content: string, variables: {[replacement: string]: Serializable}): string {
  for (const param of Object.entries(variables)) {
    content = content.replace(`{{${param[0]}}}`, param[1].toString());
  }
  const RegExp: RegExp = /{{*.*}}/gm;
  while (RegExp.test(content)) {
    content = content.replace(RegExp, `_${RegExp.source.toUpperCase()}_`);
  }
  return content;
}