import React from "react";
import { Layout, Row, Col } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer
      style={{
        backgroundColor: "#ffff",
        color: "#001529",
        padding: "20px 0",
      }}
    >
      <Row justify="center">
        <Col>
          <h3 style={{ margin: 0 }}>İletişim</h3>
          <p style={{ margin: "5px 0" }}>info@ornekmail.com</p>
          <p style={{ margin: "5px 0" }}>+90 123 456 7890</p>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "10px" }}>
        <Col>
          <h3 style={{ margin: 0 }}>Sosyal Medya</h3>
          <div style={{ fontSize: "24px", marginTop: "5px" }}>
            <FacebookOutlined style={{ margin: "0 10px", color: "#001529" }} />
            <TwitterOutlined style={{ margin: "0 10px", color: "#001529" }} />
            <InstagramOutlined style={{ margin: "0 10px", color: "#001529" }} />
          </div>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "10px" }}>
        <Col>
          <p style={{ margin: 0 }}>© 2024 Tüm Hakları Saklıdır.</p>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
