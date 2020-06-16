import React, { Component } from 'react';

export class VideosForm extends Component {
	title = 'New video';
	constructor(){
		super();
		this.state = {
			video: {
				id: '',
				idvideo: '',
				title: '',
				description: ''
			}
		};
	}

	componentWillReceiveProps( newProps ) {
		if(newProps.editable){
			this.setState({
				video: newProps.selectedVideo
			});
		}else{
			this.setState({
				video: {
					id: '',
					idvideo: '',
					title: '',
					description: ''
				}
			});
		}
	  }

	handleChange = (e) => {
		this.setState(
			{
				video: {
					...this.state.video, //conserva el valor anterior y agrega uno nuevo
					[e.target.name]: e.target.value
				}
			},
			() => {
				console.log(this.state.video);
			}
		);
	};

	handleSubmit = (e) => {
		e.preventDefault();
	    this.props.register(this.state.video);
		this.setState({
			video: {
				id: '',
				idvideo: '',
				title: '',
				description: ''
			}
		})
	};

	handleEditSubmit = (e) => {
		e.preventDefault();
		this.props.update(this.state.video);
	}

	render() {
		if(this.props.editable){
			this.title = 'Edit video'
		}
		return (
			<div>
				<h1>{this.title}</h1>
				<div className="form-cont mt-4">
					{this.props.editable ? (
						<form onSubmit={this.handleEditSubmit} id="videoForm">
						<div className="form-group">
							<input
								type="number"
								className="form-control"
								placeholder="ID from vimeo"
								name="idvideo"
								onChange={this.handleChange} /* value={this.props.selectedVideo.idvideo} */
								value={this.state.video.idvideo}
							/>
						</div>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Title"
								name="title"
								onChange={this.handleChange} /* value={this.props.selectedVideo.title} */
								value={this.state.video.title}
							/>
						</div>
						<div className="form-group">
							<textarea
								type="text"
								className="form-control"
								placeholder="Description"
								name="description"
								onChange={this.handleChange} /* value={this.props.selectedVideo.description} */
								value={this.state.video.description}
							/>
						</div>
						<button className="btn btn-primary btn-block">Update</button>
					</form>
					) : (
						<form onSubmit={this.handleSubmit} id="videoForm">
							<div className="form-group">
								<input
									type="number"
									className="form-control"
									placeholder="ID from vimeo"
									name="idvideo"
									onChange={this.handleChange} /* value={this.props.selectedVideo.idvideo} */
									value={this.state.video.idvideo}
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									placeholder="Title"
									name="title"
									onChange={this.handleChange} /* value={this.props.selectedVideo.title} */
									value={this.state.video.title}
								/>
							</div>
							<div className="form-group">
								<textarea
									type="text"
									className="form-control"
									placeholder="Description"
									name="description"
									onChange={this.handleChange} /* value={this.props.selectedVideo.description} */
									value={this.state.video.description}
								/>
							</div>
							<button className="btn btn-primary btn-block">Save</button>
						</form>
					)}
				</div>
			</div>
		);
	}
}

export default VideosForm;
