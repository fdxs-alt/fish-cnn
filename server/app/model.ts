import * as tf from "@tensorflow/tfjs-node";
import { LayersModel, Tensor1D } from "@tensorflow/tfjs-node";
import { resolve } from "path";
import sharp from "sharp";
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
  return tf.node.decodeImage(buffer).expandDims(0).toFloat();
};

const predictResult = async (model: LayersModel, buffer: Buffer) => {
  const resizedImage = await sharp(buffer).jpeg().resize(224, 224).toBuffer();

  const image = createImage(resizedImage);
  const prediction = model.predict(image) as Tensor1D;
  const data = await prediction.data();

  logger.info(data);

  const result = labels[(await prediction.argMax(1).data())[0]];

  logger.info(result);

  return result;
};

export { loadModel, createImage, labels, predictResult };
