import React from "react";
import Header from "../components/Header";
import { Col, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlistItem } from "../../Redux/slices/wishlistSlice";
import { addToCart } from "../../Redux/slices/cartSlice";

function Wishlist() {
  const ourWishlist = useSelector((state) => state.wishlistReducer);
  const dispatch = useDispatch();
  const ourCart = useSelector((state) => state.cartReducer);
  const handleCart = (product) => {
    const existingProduct = ourCart?.find((item) => item.id == product.id);
    if (existingProduct) {
      dispatch(addToCart(product));
      dispatch(removeWishlistItem(product.id));
      alert(" Product quantity is incrementing");
    } else {
      dispatch(addToCart(product));
      dispatch(removeWishlistItem(product.id));
    }
  };
  return (
    <div>
      <Header />
      <div className="container-fluid " style={{ marginTop: "150px" }}>
        {ourWishlist.length > 0 ? (
          <div>
            <h3 className="text-danger">Your wish list</h3>
            <Row className="my-5">
              {ourWishlist?.map((product) => (
                <Col
                  key={product?.id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  className="mb-5 me-2"
                >
                  <Card className="shadow rounded" style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={product?.thumbnail}
                      height={"180px"}
                    />
                    <Card.Body>
                      <Card.Title>{product?.title.slice(0, 20)}...</Card.Title>
                      <div className="d-flex justify-content-between mt-3">
                        <button
                          onClick={() =>
                            dispatch(removeWishlistItem(product?.id))
                          }
                          className="btnw"
                        >
                          <i className="fa-solid fa-heart-circle-xmark text-danger"></i>
                        </button>

                        <button
                          onClick={() => handleCart(product)}
                          className="btnw"
                        >
                          <i className="fa-solid fa-cart-plus text-success"></i>
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
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

export default Wishlist;
