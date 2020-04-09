import React from "react";
import { Result, Button } from "antd";
export default class Error extends React.Component {
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={this.backHome}>
            Back Home
          </Button>
        }
      />
    );
  }
  backHome = () => {
    this.props.history.push("/admin/findshop");
  };
}
