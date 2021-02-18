import React from 'react';
import './ParticularCard.css';


function ParticularCard() {
  return (
    <>
	<Navbar />
	<div className="user-row">
		<div className="user-col">
			<div className="UserPanel">
			        <div className="user-avatar">
			                <img src='/images/profile.jpg' alt='profile' />
			                
			        </div>
			        <div className="name" style={{color:'white'}}>
			                Navya Singh Parmar
			        </div>
			        <div className="name">
			                <h5>Mexican Chef</h5>
			        </div>
			        <div className="profile-row">
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
			        </div>
		        </div>
		</div>
		<div className="user-col">
				<div className="user-img">
					<img src="/images/img-home.jpg"  alt="home"/>
				</div>

			<div className="content-row">
				<div className="content-col">
					100 Uploads 
					<div>
					<i className="far fa-heart" />
					</div>
				</div>
				<div className="content-col">
					100 Buzzes
					<div>
					<i className="far fa-heart" />
					</div>
				</div>
				<div className="content-col">
					100 Followers
					<div>
					<i className="far fa-heart" />
					</div>
				</div>
			</div>
			<div className="post-row">
				<div className="post-img-col">
			              	<div className="post-img">
				                <img className="Post-img" src="images/img-4.jpg" alt="post" />
			                </div>
				</div>
				<div className="post-img-col">
			              	<div className="post-img">
				                <img className="Post-img" src="images/img-4.jpg" alt="post" />
			                </div>
				</div>
				<div className="post-img-col">
			              	<div className="post-img">
				                <img className="Post-img" src="images/img-4.jpg" alt="post" />
			                </div>
				</div>
				
		        </div>
		        <div className="post-row">
				<div className="post-img-col">
			              	<div className="post-img">
				                <img className="Post-img" src="images/img-4.jpg" alt="post" />
			                </div>
				</div>
				<div className="post-img-col">
			              	<div className="post-img">
				                <img className="Post-img" src="images/img-4.jpg" alt="post" />
			                </div>
				</div>
				<div className="post-img-col">
			              	<div className="post-img">
				                <img className="Post-img" src="images/img-4.jpg" alt="post" />
			                </div>
				</div>
				

		        </div>
		        <div className="post-row">
				<div className="post-img-col">
			              	<div className="post-img">
				                <img className="Post-img" src="images/img-4.jpg" alt="post" />
			                </div>
				</div>
				<div className="post-img-col">
			              	<div className="post-img">
				                <img className="Post-img" src="images/img-4.jpg" alt="post" />
			                </div>
				</div>
				<div className="post-img-col">
			              	<div className="post-img">
				                <img className="Post-img" src="images/img-4.jpg" alt="post" />
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

export default ParticularCard;
