import React, { Component } from "react";
const PaytmChecksum = require("./paytmChecksum");
const https = require("https");

export default class PaytmButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      token: "",
      order: "",
      mid: "",
      amount: "",
    };
  }

  componentDidMount() {
    this.initialize();
  }

  initialize = () => {
    let orderId = "Order_" + new Date().getTime();
    var that = this;
    // Sandbox Credentials
    let mid = "nfOOpD41981333797711"; // Merchant ID
    let mkey = "zo5Pzc3eopB8K%4u"; // Merhcant Key
    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: mid,
      websiteName: "WEBSTAGING",
      orderId: orderId,
      callbackUrl: "https://merchant.com/callback",
      txnAmount: {
        value: that.props.price,
        currency: "INR",
      },
      userInfo: {
        custId: "1001",
      },
    };

    PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      mkey
    ).then(function (checksum) {
      console.log(checksum);
      paytmParams.head = {
        signature: checksum,
      };

      var post_data = JSON.stringify(paytmParams);

      var options = {
        /* for Staging */
        hostname: "securegw-stage.paytm.in" /* for Production */,

        // hostname: 'securegw.paytm.in',

        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": post_data.length,
        },
      };

      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
          response += chunk;
        });
        post_res.on("end", function () {
          console.log("Response: ", response);
          // res.json({data: JSON.parse(response), orderId: orderId, mid: mid, amount: amount});
          that.setState({
            ...that.state,
            token: JSON.parse(response).body.txnToken,
            order: orderId,
            mid: mid,
            amount: that.props.price,
          });
        });
      });

      post_req.write(post_data);
      post_req.end();
    });
  };

  makePayment = () => {
    var that = this;
    that.setState({ loading: true });
    var config = {
      root: "",
      style: {
        bodyBackgroundColor: "#fafafb",
        bodyColor: "",
        themeBackgroundColor: "#0FB8C9",
        themeColor: "#ffffff",
        headerBackgroundColor: "#284055",
        headerColor: "#ffffff",
        errorColor: "",
        successColor: "",
        card: {
          padding: "",
          backgroundColor: "",
        },
      },
      data: {
        orderId: that.state.order,
        token: that.state.token,
        tokenType: "TXN_TOKEN",
        amount: that.state.amount /* update amount */,
      },
      payMode: {
        labels: {},
        filter: {
          exclude: [],
        },
        order: ["CC", "DC", "NB", "UPI", "PPBL", "PPI", "BALANCE"],
      },
      website: "WEBSTAGING",
      flow: "DEFAULT",
      merchant: {
        mid: that.state.mid,
        redirect: false,
      },
      handler: {
        transactionStatus: function transactionStatus(paymentStatus) {
          console.log("paymentStatus => ", paymentStatus);
          that.setState({ loading: false });
          that.props.callSendEmail();
        },
        notifyMerchant: function notifyMerchant(eventName, data) {
          console.log("Closed");
          that.setState({ loading: false });
        },
      },
    };

    if (window.Paytm && window.Paytm.CheckoutJS) {
      console.log("here", window.Paytm);
      console.log("here again", config);
      // initialze configuration using init method
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          console.log("Before JS Checkout invoke");
          // after successfully update configuration invoke checkoutjs
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("Error => ", error);
        });
    }
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <img
            width={"35"}
            src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
          />
        ) : (
          <button
            className="btn-primary"
            style={{ height: "100%", display: "inline" }}
            onClick={this.makePayment}
          >
            Pay Now
          </button>
        )}
      </div>
    );
  }
}
