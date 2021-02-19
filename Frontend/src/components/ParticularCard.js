import React from 'react';
import './ParticularCard.css';
import EnhancedTable from './EnhancedTable';
import {Button} from 'react-bootstrap';


export class ParticularCard extends React.Component {
	state={
		selectedTime:"0"
	};
	handleTime = (x) => {
		if(x.length>0)
			this.setState({selectedTime:x});
		else
			this.setState({selectedTime:"0"});
	};
  render(){
  	const{
  		selectedTime
  	}=this.state;
    // const { CentreValue,userInfo,slots} = this.props;        /* tochange */
	  return (
	    <>
		<div className="user-row">
			<div className="user-col">
				<div className="UserPanel">
				        <div className="user-avatar">
				                {/*<img src={CentreValue.cen.FrontImage} alt='profile' />*/}
				                
				        </div>
				        <div className="name" style={{color:'white'}}>
				                {/*CentreValue.cen.Name*/}
				        </div>
				        <div className="name">
				                <h5>{/*CentreValue.cen.Address*/}</h5>
				        </div>
				        <div className="name">
				                <h5>{/*CentreValue.cen.OpeningTime*/}</h5>
				        </div>
				        <div className="name">
				                <h5>{/*CentreValue.cen.ClosingTime*/}</h5>
				        </div>
				        {/*<div className="profile-row">
				        				        	<div className="profile-col">
				        				        		<i className="far fa-user" />
				        				        	</div>
				        				        	<div className="profile-col">
				        				        		<i className="far fa-clock" />
				        				        	</div>
				        				        </div>
				        				        <div className="profile-row">
				        				        	<div className="profile-col">
				        				        		<i className="fa fa-suitcase" />
				        				        	</div>
				        				        	<div className="profile-col">
				        				        		<i className="far fa-calendar" />
				        				        	</div>
				        				        </div>*/}
			        </div>
			</div>
			<div className="user-col">
				<div className="tble">
					<EnhancedTable handleTime={this.handleTime}/>
				</div>
				<div className="info-row">
					<div className="info-time-col">
						Time Slot Selected : {selectedTime=="0" ? "None" : selectedTime}
					</div>
				</div>
				<div className="info-row">
					<div className="info-col">
            	<div className="details-row">
            		Test : {/*CentreValue.cen.Name*/}
            	</div>
            	<div className="details-row">
            		Distance : {/*CentreValue.dis*/}
            	</div>
            	<div className="details-row">
            		Cost : 	{/*CentreValue.costing*/}
            	</div>
					</div>
					{console.log(selectedTime)}
					<div className="info-col">
              	<div className="proceed-btn">
              		<Button disabled={selectedTime=="0" || selectedTime==[]} variant="success">Success</Button>{' '}
                </div>
					</div>
				</div>
				
				<div className="content-row">

				</div>
			</div>
		</div>

	    </>
	  );
	}
}

export default ParticularCard;
