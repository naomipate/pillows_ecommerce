const mainFunction = (cb) => {
  cb("Hello World");
};

mainFunction((param) => {
  console.log(param);
});
