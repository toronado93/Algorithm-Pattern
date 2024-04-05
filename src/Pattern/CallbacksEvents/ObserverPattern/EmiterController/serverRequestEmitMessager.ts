// This Emitter method gives info about request
const serverRequestEmitMessager = (
  url: string,
  method: string,
  rawHeaders: string[]
) => {
  const clientAddress = rawHeaders[7];
  console.log(
    `Http request from "${clientAddress}" MethodType: "${method}" Target Url "${url}"`
  );
};

export default serverRequestEmitMessager;
