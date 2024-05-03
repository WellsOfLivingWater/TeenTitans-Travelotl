const createErr = ({ method, type, err }) => {
  return {
    log: `${method}: ${type} ${err}`,
    message: { err: `Error occurred in ${method}. Check server logs for details.` },
  };
};

module.exports = createErr;