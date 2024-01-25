export const cn = (...classNames: (string | undefined | false | null)[]): string => {
  return classNames.filter(Boolean).join(' ');
};
