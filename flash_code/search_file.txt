Array.from(document.querySelectorAll('a')).map(a => a.href).filter(href => href.endsWith('.pdf'));

console.log(
    Array.from(document.querySelectorAll('a'))
         .map(a => a.href)
         .filter(href => href.endsWith('.pdf'))
         .join('\n')
);

Array.from(document.querySelectorAll('a'))
    .map(a => a.href)
    .filter(href => href.includes('.pdf'));
