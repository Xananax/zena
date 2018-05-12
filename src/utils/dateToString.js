export const dateToString = (date) => {
  if(!(date instanceof Date)){ return date }
  const mm = date.getMonth() + 1; // getMonth() is zero-based
  const dd = date.getDate();
  const yyyy = date.getFullYear()

  return [ 
    yyyy,
    ( mm > 9 ? '' : '0') + mm,
    ( dd > 9 ? '' : '0') + dd
  ].join('-');
};
