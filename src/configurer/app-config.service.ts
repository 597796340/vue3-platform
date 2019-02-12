import { AppConfig } from "./conf.interface";
import confJson from "@/config.json";

export class AppConfigService {
  private readonly configCase: AppConfig;

  constructor() {
    this.configCase = <any>confJson;
  }

  get<T>(): T {
    return this.configCase as any;
  }
}
