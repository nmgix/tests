import express, { Application } from "express";
import Bundler from "parcel-bundler";

interface AppParameters {
  port: number;
}

class App {
  public app: Application;
  private port: number;

  constructor(appParameters: AppParameters) {
    this.app = express();
    this.port = appParameters.port;

    this.app.listen(this.port, () => console.log(`Server running on PORT: ${this.port}`));

    const bundler = new Bundler("./src/resources/index.html", {});
    this.app.use(bundler.middleware());
  }
}

const app = new App({ port: 5000 });
