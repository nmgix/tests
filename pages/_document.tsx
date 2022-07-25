import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='ru'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap'
            rel='stylesheet'
          />
          <title>Nginx's todo-app</title>
        </Head>
        <body>
          <ul id='errors-wrapper'></ul>
          <div id='modal'></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
