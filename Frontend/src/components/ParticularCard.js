import { Link,Redirect } from 'react-router-dom';
import React from "react";
import "./ParticularCard.css";
import Axios from "axios";
import Ratings from "./StarRatingComponent";
import EnhancedTable from "./EnhancedTable";
import TnCModal from "./TnCModal";
import { Button } from "react-bootstrap";

export class ParticularCard extends React.Component {
  state = {
    selectedTime: "0",
    facilityShow: true,
    facilities: "0",
    ModalShow1:false,
    ModalShow2:false,
    ModalShow3:false,
    disableSuccess:true,
    proceedToHome:false,
    client:""
  };
  show1 = (x,userInfo) => {
    this.setState({ facilityShow: false });
    this.setState({client:userInfo})
    let ans = [];
    console.log(x);
    for (let i = 0; i < x.tags.length; i++) {
      ans.push(x.tags[i], <br />);
    }
    this.setState({ facilities: ans });
  };
  handleModal1 = (x) => {
    this.setState({disableSuccess:true})
    this.setState({ModalShow1:x})
  };
  handleModal2 = (x) => {
    this.setState({disableSuccess:true})
    this.setState({ModalShow2:x})
  };
  handleModal3 = (x) => {
    this.setState({disableSuccess:true})
    this.setState({ModalShow3:x})
  };
  handleTime = (x) => {
    if (x.length > 0) this.setState({ selectedTime: x });
    else this.setState({ selectedTime: "0" });
  };
  success = (data) => {
    this.handleModal1(false);
    this.setState({disableSuccess:false})
    Axios.post("http://localhost:5000/appointment/new", data)
    .then((res) => {
      this.handleModal2(true) ;
    })
    .catch((err) => {
      console.log("Axios", err);
      this.handleModal3(true) ;
    });
  };
  render() {
    const { 
      selectedTime,
      facilityShow,
      facilities,
      ModalShow1,
      ModalShow2,
      ModalShow3,
      disableSuccess,
      proceedToHome,
	client
    } = this.state;
    const { CentreValue, userInfo, slots } = this.props; /* tochange */
    const values={
      CentreValue,
      selectedTime
    }
    return (
      <>
      <TnCModal
        size="lg"
        name="Terms & Conditions"
        head="Read The Terms And Conditions Carefully"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                     in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                     sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                     mollit anim id est laborum."
        show={ModalShow1}
        onHide={() => this.handleModal1(false)}
        onAgree={() => this.success(values)}
      />
      <TnCModal
        size="sm"
        name="Success"
        head="Your appointment has been booked successfully."
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                    ad minim veniam."
        show={ModalShow2}
        onHide={() => this.handleModal2(false)}
        onAgree={() => this.setState({proceedToHome:true})}
      />
      <TnCModal
        size="sm"
        name="Failed"
        head="Your appointment booking failed due to an error."
        text="Please try again."
        show={ModalShow3}
        onHide={() => this.handleModal3(false)}
        onAgree={() => this.handleModal3(false)}
      />
        {facilityShow && this.show1(CentreValue,userInfo)}
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
                
                  <b>Address: </b>
                  {CentreValue.cen.Address}
                
              </div>
              <div className="center-details">
                
                  <b>PhoneNo: </b>
                  {CentreValue.cen.PhoneNo}
                
              </div>
              <div className="center-details">
                
                  <b>Email: </b>
                  {CentreValue.cen.Email}
                
              </div>
              <div className="center-details">
                Timings:
                
                  {CentreValue.cen.OpeningTime} - {CentreValue.cen.ClosingTime}
                
              </div>
              <div className="center-details">
                Rating:
              </div>
              <div className="center-details">
                <h6>
                  <Ratings rating={CentreValue.cen.AvgStars} />
                </h6>
              </div>
              {/*<div className="center-details">
                      Facilities: {facilities}
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
                          disabled={disableSuccess && (selectedTime == "0" || selectedTime == [])}
                          variant="success"
                          onClick={() => this.handleModal1(true)}
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
        {proceedToHome && <Redirect to={{
                      pathname: "/loginHome", 
                      data: {userInfo}
                     }} />}
      </>
    );
  }
}

export default ParticularCard;
