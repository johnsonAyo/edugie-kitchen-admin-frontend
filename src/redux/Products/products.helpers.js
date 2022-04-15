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
  console.log("*******");
  try {
    const { data } = await axios({
      url: url,
      method: "GET",
    });
    console.log(data);
    return {
      data,
    };
  } catch (err) {
    console.log(err.response.data);
  }
};

// export const handleFetchProducts = ({
//   filterType,
//   startAfterDoc,
//   persistProducts = [],
// }) => {
//   return new Promise((resolve, reject) => {
//     const pageSize = 6;

//     let ref = firestore
//       .collection("products")
//       .orderBy("createdDate")
//       .limit(pageSize);

//     if (filterType) ref = ref.where("productCategory", "==", filterType);
//     if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

//     ref
//       .get()
//       .then((snapshot) => {
//         const totalCount = snapshot.size;

//         const data = [
//           ...persistProducts,
//           ...snapshot.docs.map((doc) => {
//             return {
//               ...doc.data(),
//               documentID: doc.id,
//             };
//           }),
//         ];

//         resolve({
//           data,
//           queryDoc: snapshot.docs[totalCount - 1],
//           isLastPage: totalCount < 1,
//         });
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

export const handleDeleteProduct = async (documentID) => {
  try {
    const { data } = await axios({
      url: `${url}/${documentID}`,
      method: "DELETE",
    });
    console.log(data);
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
    console.log(data);
  } catch (err) {
    console.log(err.response.data);
  }
};
