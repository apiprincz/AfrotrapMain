export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
  TOTAL: "TOTAL",
};
export const deleteItem = (item, cart) => {
  const newCart = cart.filter((cartItem) => {
    return cartItem._id !== item._id;
  });

  // cart = cart.splice(index, 1);

  return {
    type: "ADD_CART",
    payload: [...newCart],
  };
};

export const addToCart = (product, cart) => {
  const check = cart.every((item) => {
    return item._id !== product._id;
  });

  if (!check) {
    return {
      type: "ADD_CART",
      payload: [...cart],
    };
  }
  return {
    type: "ADD_CART",
    payload: [...cart, { ...product, quantity: 1, msg: "item added to cart" }],
  };
};

export const notify = (product, cart) => {
  const check = cart.every((item) => {
    return item._id !== product._id;
  });

  if (!check) {
    return {
      type: "NOTIFY",
      payload: { fail: true, msg: "Item already added", type: "fail" },
    };
  }
  return {
    type: "NOTIFY",
    payload: { success: true, type: "success", msg: "Item added to cart" },
  };
};
export const notifyDel = (item, cart) => {
  const check = cart.every((cartItem) => {
    return cartItem._id !== item._id;
  });

  if (!check) {
    return {
      type: "NOTIFY",
      payload: {
        success: true,
        type: "success",
        msg: "Item deleted from cart",
      },
    };
  }
};
export const resetNotif = (notify) => {
  if (notify.success || notify.fail) {
    return {
      type: "NOTIFY",
      payload: {},
    };
  } else
    return {
      type: "NOTIFY",
      payload: { ...notify },
    };
};
export const decrease = (data, id) => {
  const newData = [...data];

  newData.forEach((item) => {
    if (item._id === id) item.quantity -= 1;
  });

  return { type: "ADD_CART", payload: newData };
};
export const increase = (data, id) => {
  const newData = [...data];

  newData.forEach((item) => {
    if (item._id === id) item.quantity += 1;
  });

  return { type: "ADD_CART", payload: newData };
};
