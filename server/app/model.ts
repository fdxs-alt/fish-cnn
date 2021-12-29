import * as tf from "@tensorflow/tfjs-node";
import { LayersModel, Tensor1D } from "@tensorflow/tfjs-node";
import { resolve } from "path";
import { logger } from "./logger";

const labels = [
  "Black sea sprat",
  "Gilt-Head bream",
  "Hourse mackerel",
  "Red mullet",
  "Red sea beam",
  "Sea bass",
  "Shrimp",
  "Stripped red mullet",
  "Trout",
];

const loadModel = async () => {
  return tf.loadLayersModel(
    `file://${resolve(__dirname, "../../model/tf-js-model/model.json")}`
  );
};

const createImage = (buffer: Buffer) => {
  return tf.node
    .decodeImage(buffer)
    .resizeBilinear([224, 224])
    .div(255)
    .expandDims(0)
    .toFloat();
};

const predictResult = async (model: LayersModel, buffer: Buffer) => {
  const image = createImage(buffer);
  const prediction = model.predict(image) as Tensor1D;
  const data = await prediction.data();
  logger.info(data);

  const result = labels[(await prediction.argMax(1).data())[0]];

  logger.info(result);

  return result;
};

export { loadModel, createImage, labels, predictResult };
