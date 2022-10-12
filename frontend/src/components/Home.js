import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productActions";
import Banner from "./layout/Banner";
import { useLocation } from "react-router-dom";
import { getCategory } from "../actions/categoryActions";

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [catagory, setCatagory] = useState("");
  const [rating, setRating] = useState(0);
  const location = useLocation();
  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const { category } = useSelector((state) => state.category);

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getCategory());
    dispatch(getProducts(keyword, currentPage, catagory, rating));
  }, [dispatch, alert, error, keyword, currentPage, catagory, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }
  let ishome = false;
  if (location.pathname === "/") {
    ishome = true;
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Icinema"} />
          {ishome && <Banner />}
          {ishome ? (
            <div class="col-lg-12 mt-5">
              <div class="section-head-style-one">
                <h2>Best Movies This Week!</h2>
              </div>
            </div>
          ) : (
            <>
              <div class="col-lg-12 mt-5">
                <div class="section-head-style-one">
                  <h2>Movies List</h2>
                </div>
              </div>
            </>
          )}

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <hr className="my-5" />

                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>

                        <ul className="pl-0">
                          {category.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category._id}
                              onClick={() => setCatagory(category.name)}
                            >
                              {category.name}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="my-3" />

                      <div className="mt-5">
                        <h4 className="mb-3">Ratings</h4>

                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={star}
                              onClick={() => setRating(star)}
                            >
                              <div className="rating-outer">
                                <div
                                  className="rating-inner"
                                  style={{
                                    width: `${star * 20}%`,
                                  }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {shuffleArray(products).map((product) => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                <>
                  {shuffleArray(products).map((product) => (
                    <Product key={product._id} product={product} col={3} />
                  ))}
                </>
              )}
            </div>
          </section>

          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
                activeLinkClass="bg-f96822"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
