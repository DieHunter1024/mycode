import React from "react";
import "./home.less";
import Left from "../../components/left/left";
import Top from "../../components/top/top";
// import Foot from "../../components/foot/foot";
import { Layout } from "antd";
const { Header, Sider, Content } = Layout;

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Header>
            <Top fn={this.ExitLogin}></Top>
          </Header>
          <Layout>
            <Sider>
              <Left></Left>
            </Sider>
            <Content>{this.props.children}</Content>
          </Layout>
          {/* <Footer> */}
            {/* <Foot></Foot> */}
          {/* </Footer> */}
        </Layout>
      </div>
    );
  }
  ExitLogin = () => {
    this.props.history.push("/login");
  };
}
