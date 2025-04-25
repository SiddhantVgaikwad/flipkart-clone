import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../constants/wishlistConstants";

// Helper to handle fetch and error
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

// Add To Wishlist
export const addToWishlist = (id) => async (dispatch, getState) => {
  try {
    const res = await fetch(`https://flipkart-clone-ajp0.onrender.com/api/v1/product/${id}`);
    const data = await handleResponse(res);

    dispatch({
      type: ADD_TO_WISHLIST,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        cuttedPrice: data.product.cuttedPrice,
        image: data.product.images[0].url,
        ratings: data.product.ratings,
        reviews: data.product.numOfReviews,
      },
    });

    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
  } catch (error) {
    console.error("Add to wishlist failed:", error.message);
  }
};

// Remove From Wishlist
export const removeFromWishlist = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_WISHLIST, payload: id });
  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
};
