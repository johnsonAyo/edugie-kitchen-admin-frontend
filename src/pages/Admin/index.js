import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
  editProductStart,
} from "./../../redux/Products/products.actions";
import axios from "axios";
import Modal from "./../../components/Modal";
import FormInput from "./../../components/forms/FormInput";
import FormSelect from "./../../components/forms/FormSelect";
import Button from "./../../components/forms/Button";
import LoadMore from "./../../components/LoadMore";
import { CKEditor } from "ckeditor4-react";
import "./styles.scss";
import SimpleAccordion from "../../components/Accordion";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    console.log("Add Form Details", title, img, price, desc);
    resetForm();
  };

  const handleEditSubmit = async (_id) => {
    console.log({ "our id is: ": _id });
    console.log("Form Details to edit", { title, img, price, desc });
    dispatch(
      editProductStart({
        _id,
        category,
        title,
        img,
        price,
        desc,
      })
      
    );
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
    setProductDesc("");
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
                  value: "SPECIAL ORDERS",
                  name: "SPECIAL ORDERS",
                },
                {
                  value: "LUNCH / DINNER",
                  name: "LUNCH / DINNER",
                },
                {
                  value: "EXTRAS AND SIDE DISHES",
                  name: "EXTRAS AND SIDE DISHES",
                },
                {
                  value: "SOFT DRINKS",
                  name: "SOFT DRINKS",
                },
                {
                  value: "JUICE & YOGHURT",
                  name: "JUICE & YOGHURT",
                },
                {
                  value: "WINE & CREAM",
                  name: "WINE & CREAM",
                },
                {
                  value: "ENERGY DRINKS & BEERS",
                  name: "ENERGY DRINKS & BEERS",
                },
                {
                  value: "VSOP, VODKA, WHISKEY, SPIRITS & CHAMPAGNES",
                  name: "VSOP, VODKA, WHISKEY, SPIRITS & CHAMPAGNES",
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

                        // console.log(product, "Map");

                        return (
                          <tr key={index}>
                            <td>
                              <img className="thumb" src={img} alt="" />
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
                            <td>
                              <Button>
                                <div>
                                  <Accordion>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                      className="blackie"
                                    >
                                      <h5 className=""> Edit Meal</h5>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <form
                                        onSubmit={(e) => {
                                          e.preventDefault();
                                          handleEditSubmit(_id);
                                        }}
                                      >
                                        <div>
                                          <input
                                            id="categories"
                                            type="text"
                                            placeholder="categories"
                                            name="categories"
                                            // value={category}
                                            onChange={(e) =>
                                              setProductCategory(e.target.value)
                                            }
                                          />
                                        </div>
                                        <div>
                                          <input
                                            id="name"
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            // value={title}
                                            onChange={(e) => {
                                              console.log("title changed");
                                              setProductName(e.target.value);
                                            }}
                                          />
                                        </div>
                                        <div>
                                          <input
                                            id="img"
                                            type="text"
                                            placeholder="Image Url"
                                            name="img"
                                            // value={img}
                                            onChange={(e) =>
                                              setProductThumbnail(
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <div>
                                          <input
                                            id="desc"
                                            type="text"
                                            placeholder="description"
                                            name="description"
                                            // value={desc}
                                            onChange={(e) =>
                                              setProductDesc(e.target.value)
                                            }
                                          />
                                        </div>
                                        <div>
                                          <input
                                            id="price"
                                            type="text"
                                            placeholder="price"
                                            name="price"
                                            // value={price}
                                            onChange={(e) =>
                                              setProductPrice(e.target.value)
                                            }
                                          />
                                        </div>
                                        <input  className="submit-btn btn" type="submit" value="submit" />
                                      </form>
                                    </AccordionDetails>
                                  </Accordion>
                                </div>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
