import React, { useEffect } from "react";
import Header from "../components/Header";
import { Col, Row, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { allProducts, error, loading } = useSelector(
    (state) => state.productReducer
  );
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="home">
      <Header insideHome={true} />
      <div className="container-fluid " style={{ marginTop: "150px" }}>
        {loading ? (
          <div className="text-center mt-5 fw-bolder">
            <Spinner className="me-2" animation="border" variant="info" />
            Loading...
          </div>
        ) : (
          <Row className="my-5">
            {allProducts?.length > 0 ? (
              allProducts?.map((product) => (
                <Col
                  key={product?.id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  className="mb-5"
                >
                  <Card className="shadow rounded">
                    <Card.Img
                      variant="top"
                      src={product?.thumbnail}
                      height={"180px"}
                    />
                    <Card.Body>
                      <Card.Title> {product?.title.slice(0, 20)}...</Card.Title>
                      <div className="text-center mt-3">
                        <Link to={`/${product?.id}/view`}>View More....</Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div className="fw-bolder text-center mt-5 mb-5 text-danger">
                Product not found
              </div>
            )}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Home;
