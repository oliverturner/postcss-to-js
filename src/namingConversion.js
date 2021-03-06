const reserved = [
  'styled', 'css', 'injectGlobal', 'require', 'export', 'module',
  'abstract', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'export', 'extends', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with', 'yield'
];

const process_first = (name) => {
  const c = name[0];
  switch (c) {
    case '#':
      return "$" + name.substr(1);
    case '.':
      return name.substr(1);
    case ':':
      return name;

    default:
      return 'tag_' + name;
  }
};

const escape = (name) => {
  let result = process_first(name);

  const subresult = result
    .split('--').join('$$')
    .split('-').join('_')
    .split(' ').join('__')
    .split('.').join('_and_')
    .split(':').join('$$')
    .split('#').join('$');

  if (!isJSfriendly(subresult)) {
    if (isJSfriendly("_" + subresult)) {
      return "_" + subresult;
    }
  }
  return subresult;
};

const reserve = name => reserved.indexOf(name) >= 0 ? name + "_$" : name;

const nameRule = (name) => {
  if (name === ':root') {
    return '__root'
  }
  return reserve(escape(name));
};

export const isJSfriendly = (name) => (/^[a-z_\$][\w\$]*$/i).test(name);
export const isReactFriendly = (name) => (/^[A-Z]/).test(name);

export default nameRule;