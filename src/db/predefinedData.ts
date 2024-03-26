const adminUser = {
  id: "0fe36d16-49bc-4aab-a227-f84df899a6cb",
};

const emptyUser = {
  id: "0c5b00fb-0639-4420-816e-cee1492c7869",
};

const bookProduct = {
  id: "51422fcd-0366-4186-ad5b-c23059b6f64f",
  title: "Book",
  description: "A very interesting book",
  price: 100,
};

const penProduct = {
  id: "afdd68c4-d359-45e6-b9fd-c8fdb2a162a0",
  title: "Pen",
  description: "Cute pen",
  price: 20,
};

const adminCart = {
  id: "1434fec6-cd85-420d-95c0-eee2301a971d",
  userId: "0fe36d16-49bc-4aab-a227-f84df899a6cb",
  isDeleted: false,
  items: [
    {
      product: {
        id: bookProduct.id,
      },
      count: 2,
    },
    {
      product: {
        id: penProduct.id,
      },
      count: 5,
    },
  ],
};

const adminOrder = {
  id: "dffd6fa8-be6b-47f6-acff-455612620ac2",
  userId: "0fe36d16-49bc-4aab-a227-f84df899a6cb",
  cartId: "",
  items: adminCart.items,
  payment: {
    type: "paypal",
    address: undefined,
    creditCard: undefined,
  },
  delivery: {
    type: "post",
    address: undefined,
  },
  comments: "",
  status: "created",
  total: 2,
};

export default {
  users: [adminUser, emptyUser],
  carts: [adminCart],
  orders: [adminOrder],
  products: [bookProduct, penProduct],
};
