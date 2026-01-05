export const convertProps = (map, value) => {
  if (!value) return '';

  if (typeof value === 'string') {
    return map[value] || '';
  }

  if (typeof value === 'object') {
    return Object.entries(value)
      .map(([breakpoint, key]) => {
        const className = map[key];
        if (!className) return '';

        if (breakpoint === 'base') return className;

        return `${breakpoint}:${className}`;
      })
      .join(' ');
  }

  return '';
};