import React from "react";
import "./ParticularCard.css";
import Ratings from "./StarRatingComponent";
import EnhancedTable from "./EnhancedTable";
import { Button } from "react-bootstrap";

export class ParticularCard extends React.Component {
  state = {
    selectedTime: "0",
    facilityShow: true,
    facilities: "0",
  };
  show1 = (x) => {
    this.setState({ facilityShow: false });
    let ans = [];
    console.log(x);
    for (let i = 0; i < x.tags.length; i++) {
      ans.push(x.tags[i], <br />);
    }
    this.setState({ facilities: ans });
  };
  handleTime = (x) => {
    if (x.length > 0) this.setState({ selectedTime: x });
    else this.setState({ selectedTime: "0" });
  };
  render() {
    const { selectedTime, facilityShow, facilities } = this.state;
    const { CentreValue, userInfo, slots } = this.props; /* tochange */
    return (
      <>
        {facilityShow && this.show1(CentreValue)}
        <div className="user-row">
          <div className="user-col">
            <div className="UserPanel">
              <div className="user-avatar">
                {<img src={CentreValue.cen.FrontImage} alt="profile" />}
              </div>

              <div className="center-details">
                <h4>
                  <b>{CentreValue.cen.Name}</b>
                </h4>
              </div>
              <div className="center-details">
                <>
                  <b>Address: </b>
                  {CentreValue.cen.Address}
                </>
              </div>
              <div className="center-details">
                <>
                  <b>PhoneNo: </b>
                  {CentreValue.cen.PhoneNo}
                </>
              </div>
              <div className="center-details">
                <>
                  <b>Email: </b>
                  {CentreValue.cen.Email}
                </>
              </div>
              <div className="center-details">
                <>Timings:</>
                <>
                  {CentreValue.cen.OpeningTime} - {CentreValue.cen.ClosingTime}
                </>
              </div>
              <div className="center-details">
                <>Rating:</>
              </div>
              <div className="center-details">
                <h6>
                  <Ratings rating={CentreValue.cen.AvgStars} />
                </h6>
              </div>
              {/*<div className="center-details">
                    <>
                      Facilities: {facilities}
                    </>
    </div>*/}
            </div>
          </div>
          <div className="user-col">
            <div className="tble">
              <EnhancedTable handleTime={this.handleTime} slots={slots} />
            </div>
            <div className="box">
              <div className="info-row">
                <div className="info-col">
                  <div style={{ backgroundColor: "#EE4B2B" }}>
                    Negative Reviews Count: {}
                  </div>
                  <div style={{ backgroundColor: "green" }}>
                    Positive Reviews Count: {}
                  </div>
                  <div className="cmp-gif-wrapper">
                    <img src="/images/completion.gif" className="cmp-gif" />
                  </div>
                </div>

                <div className="info-time-col">
                  <div className="time-row1">
                    Time Slot Selected :{" "}
                    {selectedTime == "0" ? "None" : selectedTime}
                  </div>
			<div className="time-row1">
                    Date Selected :{" "}
                    {CentreValue.askeddate}
                  </div>

                  <div className="time-row">
                    <div className="details-col">
                      <div className="proceed-btn">
                        <Button
                          disabled={selectedTime == "0" || selectedTime == []}
                          variant="success"
                        >
                          Success
                        </Button>
                      </div>
                    </div>

                    <div className="details-col">
                      <div className="details-row">
                        Test : {CentreValue.service}
                      </div>
                      <div className="details-row">
                        Distance : {CentreValue.dis} Km
                      </div>
                      <div className="details-row">
                        Cost : ₹{CentreValue.costing}
                      </div>
                      <div className="details-row">
                        Fine : ₹{CentreValue.costing}
                      </div>
                      <div className="details-row">
                        Total : ₹
                        {parseInt(CentreValue.costing) +
                          parseInt(CentreValue.costing)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ParticularCard;
