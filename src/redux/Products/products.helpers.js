import axios from "axios";
const url = "https://eduge-admin-backend.herokuapp.com/api/meal";
export const handleAddProduct = async (product) => {
  try {
    const { data } = await axios({
      url: url,
      method: "POST",
      data: product,
    });
    // console.log(data);
  } catch (err) {
    console.log(err.response.data);
  }
};

export const handleFetchProducts = async ({
  filterType,
  startAfterDoc,
  persistProducts = [],
}) => {
  try {
    const { data } = await axios({
      url: url,
      method: "GET",
    });
    // console.log(data);
    return {
      data,
    };
  } catch (err) {
    console.log(err.response.data);
  }
};

export const handleDeleteProduct = async (documentID) => {
  try {
    const { data } = await axios({
      url: `${url}/${documentID}`,
      method: "DELETE",
    });
    // console.log(data);
  } catch (err) {
    console.log(err.response.data);
  }
};

export const handleEditProduct = async (product) => {
  try {
    Object.keys(product).forEach((key) => {
      if (!product[key]) {
        delete product[key];
      }
    });
    const { data } = await axios({
      url: `${url}/${product._id}`,
      method: "PATCH",
      data: product,
    });
    console.log("This is the edited Data", product, data);
  } catch (err) {
    console.log(err.response.data);
  }
};

export const handleFetchProduct = async (productID) => {
  try {
    const { data } = await axios({
      url: `${url}/${productID}`,
      method: "GET",
    });
    // console.log(data);
  } catch (err) {
    console.log(err.response.data);
  }
};
