import Document, { Html, Head, Main, NextScript } from "next/document";

const APP_NAME = "Pashudh";
const APP_DESCRIPTION =
  "Woven by hand, designed from heart, our authentic, pure silk sarees are treasured for their contemporary appeal. Browse through our creations and discover masterpieces that embrace tradition and trends with equal zeal. Allow us to add a silken touch to the special moments of your life.";

export default class extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#1a1818" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/log.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/images/log.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
