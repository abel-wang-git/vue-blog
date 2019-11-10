/**
 * @module codeblock/utils
 */

/**
 * The list of supported codeblock options: https://prismjs.com/#supported-languages
 */
export const supportedLanguages = [
  'xml', 'css', 'cpp', 'cs', 'js',
  'apacheconf', 'shell', 'coffee', 'cmake',
  'dart', 'diff', 'go', 'ini', 'java', 'json',
  'lua', 'md', 'nginx', 'php',
  'puppet', 'rb', 'scss', 'sql', 'ts', 'yml'
]

export function getCodeBlockLabel(lang) {
  const labelMap = {
    'none': 'None',
    'xml': 'XML/HTML',
    'css': 'CSS',
    'cpp': 'C++',
    'cs': 'C#',
    'js': 'JavaScript',
    'apacheconf': 'Apache config',
    'shell': 'Bash/Shell',
    'coffee': 'CoffeeScript',
    'cmake': 'CMake',
    'dart': 'Dart',
    'diff': 'Diff',
    'go': 'Go',
    'ini': 'INI',
    'java': 'Java',
    'json': 'JSON',
    'lua': 'LUA',
    'md': 'Markdown',
    'nginx': 'Nginx',
    'php': 'PHP',
    'puppet': 'Puppet',
    'rb': 'Ruby',
    'scss': 'SCSS',
    'sql': 'SQL',
    'ts': 'TypeScript',
    'yml': 'Yaml'
  }

  return labelMap[ lang ] ? labelMap[ lang ] : lang
}

/**
 * Checks whether the passed option is supported by {@link module:codeblock/codeblockediting~CodeBlockEditing}.
 *
 * @param {String} lang The option value to check.
 * @returns {Boolean}
 */
export function isSupported(lang) {
  return supportedLanguages.includes(lang)
}
