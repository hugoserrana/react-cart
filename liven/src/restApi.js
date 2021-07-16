const SERVER_URL = "https://5d6da1df777f670014036125.mockapi.io/api/v1";

function fetchWrapper(endpoint) {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //'Authorization': getTokenFromStore(),
    },
  };

  return fetch(`${SERVER_URL}/${endpoint}`, requestOptions);
}

export const apiProductListGet = async () => {
  try {
    return await fetchWrapper("product");
  } catch (error) {
    console.error(error);
  }
};
