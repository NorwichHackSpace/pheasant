import {
  createRequires,
  createUseRemoteComponent,
} from "@paciolan/remote-component";
import { resolve } from "../../remote-component.config.js";

const requires = createRequires(resolve);

export const useRemoteComponent = createUseRemoteComponent({ requires });
