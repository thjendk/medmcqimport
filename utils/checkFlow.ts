import { Flow } from "../interfaces/Flow";

interface checkFlowArgs {
  obj: any;
  decoders: { path: string; decoder: any }[];
}

const checkFlow = async ({
  obj,
  decoders
}: checkFlowArgs): Promise<boolean> => {
  await Promise.all(
    decoders.map(({ path, decoder }) =>
      runDecoder(obj, path, decoder).catch(e => {
        throw e;
      })
    )
  );
  return true;
};

const runDecoder = async (
  obj: any,
  path: string,
  decoder: any
): Promise<Flow> => {
  const partToDecode = path ? obj[path] : obj;
  const decodedObj = decoder.run(partToDecode);

  return new Promise((resolve, reject) => {
    if (decodedObj.ok) {
      const result: Flow = decodedObj.result;
      resolve(result);
    } else {
      reject({ err: "wrong wormat" });
    }
  });
};

export default checkFlow;
