import * as tf from "@tensorflow/tfjs-node";
import { resolve } from "path";

const loadModel = async () => {
  return tf.loadLayersModel(
    `file://${resolve(__dirname, "../../model/tf-js-model/model.json")}`
  );
};

export { loadModel };
