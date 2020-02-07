const HandleError = (error) => {
  console.log(error);
  alert(error + "\n" + JSON.stringify(error, null, 2));
};

export default HandleError;