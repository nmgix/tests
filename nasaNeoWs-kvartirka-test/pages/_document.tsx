import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='ru'>
        <Head>
          <meta charSet='UTF-8' />
          <meta name='keywords' content='titla, meta, nextjs' />
          <meta name='author' content='Nginx' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
