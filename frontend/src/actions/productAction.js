import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    ALL_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    SLIDER_PRODUCTS_REQUEST,
    SLIDER_PRODUCTS_SUCCESS,
    SLIDER_PRODUCTS_FAIL,
  } from "../constants/productConstants";
  
  const fetcher = async (url, options = {}) => {
    const res = await fetch(url, options);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    return res.json();
  };
  
  export const getProducts = (keyword = "", category, price = [0, 200000], ratings = 0, currentPage = 1) => async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });
      let url = `https://flipkart-clone-ajp0.onrender.com/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&page=${currentPage}`;
      if (category) {
        url = `https://flipkart-clone-ajp0.onrender.com/api/v1/products?keyword=${keyword}&category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&page=${currentPage}`;
      }
      const data = await fetcher(url);
      dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ALL_PRODUCTS_FAIL, payload: error.message });
    }
  };
  
  export const getSimilarProducts = (category) => async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });
      const data = await fetcher(`https://flipkart-clone-ajp0.onrender.com/api/v1/products?category=${category}`);
      dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ALL_PRODUCTS_FAIL, payload: error.message });
    }
  };
  
  export const getProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const data = await fetcher(`https://flipkart-clone-ajp0.onrender.com/api/v1/product/${id}`);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
    } catch (error) {
      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
  };
  
  export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
      const data = await fetcher("https://flipkart-clone-ajp0.onrender.com/api/v1/review", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: NEW_REVIEW_FAIL, payload: error.message });
    }
  };
  
  export const getSliderProducts = () => async (dispatch) => {
    try {
      dispatch({ type: SLIDER_PRODUCTS_REQUEST });
      const data = await fetcher("https://flipkart-clone-ajp0.onrender.com/api/v1/products/all");
      dispatch({ type: SLIDER_PRODUCTS_SUCCESS, payload: data.products });
    } catch (error) {
      dispatch({ type: SLIDER_PRODUCTS_FAIL, payload: error.message });
    }
  };
  
  export const getAdminProducts = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCTS_REQUEST });
      const data = await fetcher("https://flipkart-clone-ajp0.onrender.com/api/v1/admin/products");
      dispatch({ type: ADMIN_PRODUCTS_SUCCESS, payload: data.products });
    } catch (error) {
      dispatch({ type: ADMIN_PRODUCTS_FAIL, payload: error.message });
    }
  };
  
  export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
      const data = await fetcher("https://flipkart-clone-ajp0.onrender.com/api/v1/admin/product/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: NEW_PRODUCT_FAIL, payload: error.message });
    }
  };
  
  export const updateProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
      const data = await fetcher(`https://flipkart-clone-ajp0.onrender.com/api/v1/admin/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.message });
    }
  };
  
  export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
      const data = await fetcher(`https://flipkart-clone-ajp0.onrender.com/api/v1/admin/product/${id}`, { method: "DELETE" });
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message });
    }
  };
  
  export const getAllReviews = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEWS_REQUEST });
      const data = await fetcher(`https://flipkart-clone-ajp0.onrender.com/api/v1/admin/reviews?id=${id}`);
      dispatch({ type: ALL_REVIEWS_SUCCESS, payload: data.reviews });
    } catch (error) {
      dispatch({ type: ALL_REVIEWS_FAIL, payload: error.message });
    }
  };
  
  export const deleteReview = (reviewId, productId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
      const data = await fetcher(`https://flipkart-clone-ajp0.onrender.com/api/v1/admin/reviews?id=${reviewId}&productId=${productId}`, { method: "DELETE" });
      dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: DELETE_REVIEW_FAIL, payload: error.message });
    }
  };
  
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  
