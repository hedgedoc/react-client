declare module 'highlight.js/lib/core' {
  export = hljs;
}

declare module 'highlight.js/lib/languages/*' {
  export default function(hljs?: hljs): LanguageDetail;
}
