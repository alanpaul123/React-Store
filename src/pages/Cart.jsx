import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import {
  decQuantity,
  emptyCart,
  incQuantity,
  removeCartItem,
} from "../../Redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const ourCart = useSelector((state) => state.cartReducer);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (ourCart?.length > 0) {
      setCartTotal(
        ourCart?.map((item) => item.totalPrice).reduce((t1, t2) => t1 + t2)
      );
    } else {
      setCartTotal(0);
    }
  }, [ourCart]);

  const handleDecrement = (product) => {
    if (product.quantity > 1) {
      dispatch(decQuantity(product.id));
    } else {
      dispatch(removeCartItem(product.id));
    }
  };
  const checkout = () => {
    dispatch(emptyCart());
    alert("Order placed successfully.Thank You for purchasing with us!!!");
    navigate("/");
  };
  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: "150px" }}>
        {ourCart?.length > 0 ? (
          <div className="cart">
            <h1>Cart Summary</h1>
            <div className="row mt-4">
              <div className="col-lg-8">
                <table className="table shadow">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>...</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ourCart?.map((product, index) => (
                      <tr key={product?.id}>
                        <td>{index + 1}</td>
                        <td>{product?.title.slice(0, 20)}...</td>
                        <td>
                          <img
                            src={product?.thumbnail}
                            alt="product image"
                            width={"50px"}
                            height={"50px"}
                          />
                        </td>
                        <td>
                          <div className="d-flex">
                            <button
                              className="btnw fw-bolder"
                              style={{ color: "black" }}
                              onClick={() => handleDecrement(product)}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={product?.quantity}
                              style={{ width: "50px" }}
                              className="fw-bolder me-1 ms-1"
                              readOnly
                            />
                            <button
                              className="btnw fw-bolder"
                              style={{ color: "black" }}
                              onClick={() => dispatch(incQuantity(product?.id))}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>$ {product?.totalPrice}</td>
                        <td>
                          <button
                            onClick={() =>
                              dispatch(removeCartItem(product?.id))
                            }
                            className="btnw"
                          >
                            <i className="fa-solid fa-trash text-danger"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="float-end">
                  <button
                    onClick={() => dispatch(emptyCart())}
                    className=" me-2 x"
                  >
                    EMPTY CART
                  </button>
                  <Link to={"/"} className=" y">
                    SHOP MORE
                  </Link>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="border rounded shadow p-5">
                  <h4>
                    Total Amount :{" "}
                    <span className="text-danger">$ {cartTotal}</span>
                  </h4>
                  <div className="d-grid">
                    <button onClick={checkout} className="m">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{ height: "60vh" }}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <img
              src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-1188.jpg"
              alt=""
              width={"400px"}
            />
            <h3 className="text-danger">Your wish list is empty</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
