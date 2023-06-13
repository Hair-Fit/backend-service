
exports.slugToTitle = (str)=>{
  const onlySlug = str.split('/')[3].split('.')[0]
  const words = onlySlug.split('-');
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
}