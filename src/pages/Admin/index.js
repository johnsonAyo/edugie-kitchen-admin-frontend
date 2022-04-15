import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
} from "./../../redux/Products/products.actions";
import Modal from "./../../components/Modal";
import FormInput from "./../../components/forms/FormInput";
import FormSelect from "./../../components/forms/FormSelect";
import Button from "./../../components/forms/Button";
import LoadMore from "./../../components/LoadMore";
import { CKEditor } from "ckeditor4-react";
import "./styles.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Admin = (props) => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [category, setProductCategory] = useState("");
  const [title, setProductName] = useState("");
  const [img, setProductThumbnail] = useState("");
  const [price, setProductPrice] = useState(0);
  const [desc, setProductDesc] = useState("");
  const [query, setQuery] = useState({ pageNumber: 1, limit: 10 });
  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  // console.log(!Array.isArray(products) && products.data.data.data, "PRODUCTS");

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory("BREAKFAST");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
    setProductDesc("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProductStart({
        category,
        title,
        img,
        price,
        desc,
      })
    );
    resetForm();
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="admin">
      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>Add new product</Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            <h2>Add new product</h2>

            <FormSelect
              label="Category"
              options={[
                {
                  value: "BREAKFAST",
                  name: "BREAKFAST",
                },
                {
                  value: "Special Orders",
                  name: "Special Orders",
                },
                {
                  value: "Lunch",
                  name: "Lunch",
                },
                {
                  value: "Beer",
                  name: "Beer",
                },
                {
                  value: "Wines",
                  name: "Wines",
                },
              ]}
              handleChange={(e) => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              value={title}
              handleChange={(e) => setProductName(e.target.value)}
            />

            <FormInput
              label="Main image URL"
              type="url"
              value={img}
              handleChange={(e) => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="1000000.00"
              step="1"
              value={price}
              handleChange={(e) => setProductPrice(e.target.value)}
            />

            <FormInput
              label="Description"
              type="text"
              value={desc}
              handleChange={(e) => setProductDesc(e.target.value)}
            />

            {/* <CKEditor
              onChange={(evt) => setProductDesc(evt.editor.getData())}
            /> */}

            <br />

            <Button type="submit">Add product</Button>
          </form>
        </div>
      </Modal>

      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>Manage Products</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className="results"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    {!Array.isArray(products) &&
                      products.data.data.data.map((product, index) => {
                        const { title, img, price, _id } = product;

                        console.log(product, "Map");

                        return (
                          <tr key={index}>
                            <td>
                              <img className="thumb" src={img} />
                            </td>
                            <td>{title}</td>
                            <td>₦{price}</td>
                            <td>
                              <Button
                                onClick={() =>
                                  dispatch(deleteProductStart(_id))
                                }
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
