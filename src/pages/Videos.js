import React, { Component } from 'react';
import './css/index.css';
import VideosForm from '../components/videosform/VideosForm';
import VideosTable from '../components/videostable/VideosTable';
import superffService from '../services/superffService';
import Loader from '../components/loader/Loader';
import Dialog from '../components/dialog/Dialog';

export default class Videos extends Component {
	constructor() {
		super();
		this.state = {
			videos: [],
			loading: Boolean,
			error: null,
			videoSelected: {
				id: '',
				idvideo: '',
				title: '',
				description: ''
			},
			editable: false,
			showDialog: false,
			dialogMessage: '',
			videoId: 0
		};
	}

	componentDidMount() {
		this.loadVideosTable();
	}

	loadVideosTable = async () => {
		// llenar la table de videos
		this.setState({
			loading: true
		});
		await superffService.videos
			.list()
			.then((res) => {
				this.setState({
					videos: res.data,
					loading: false,
					error: false
				});
			})
			.catch((error) => {
				console.log(error.response);
				this.setState({
					error: error.response,
					loading: false
				});
			});
	};

	register = async (v) => {
		// registrar nuevos videos
		this.setState({
			loading: true
		});
		await superffService.videos
			.create(v)
			.then((res) => {
				this.loadVideosTable();
				this.clearVideoForm();
			})
			.catch((error) => {
				this.setState({
					error: error.response.data.response,
					loading: false
				});
			});
	};

	//editar videos
	update = async (v) => {
		this.setState({
			loading: true
		});
		await superffService.videos
			.update(v)
			.then((res) => {
				this.loadVideosTable();
				this.setState({
					editable: false
				});
			})
			.catch((error) => {
				this.setState({
					error: error.response.data.response,
					loading: false
				});
			});
	};

	showDeleteDialog = (videoId) => {
		this.setState({
			showDialog: true,
			dialogMessage: 'Are you sure you want to delete this video ?',
			videoId: videoId
		});
	};

	confirmDeleteDialog = async (videoId) => {
		this.setState({
			showDialog: false,
			loading: true
		});
		await superffService.videos
			.delete(videoId)
			.then((res) => {
				this.loadVideosTable();
			})
			.catch((e) => {
				this.setState({
					error: e.response.data.response,
					loading: false
				});
			});
	};

	cancelDeleteDialog = () => {
		this.setState({
			showDialog: false,
			dialogMessage: '',
			videoId: 0
		});
	};

	selectedToEdit = (v) => {
		// pasar el video seleccionado al estado para luego enviarlo al formulario
		this.setState({
			videoSelected: v,
			editable: true
		});
	};

	clearVideoForm() {
		document.getElementById('videoForm').reset();
	}
	render() {
		return (
			<div className="main-cont">
				{this.state.showDialog ? (
					<Dialog
						message={this.state.dialogMessage}
						id={this.state.videoId}
						confirm={this.confirmDeleteDialog}
						cancel={this.cancelDeleteDialog}
					/>
				) : null}
				<div className="row">
					<div className="col-sm-3 mb-4">
						<VideosForm
							register={this.register}
							selectedVideo={this.state.videoSelected}
							editable={this.state.editable}
							update={this.update}
						/>
					</div>
					<div className="col-sm-9">
						{this.state.loading ? (
							<div className="loader-cont">
								<Loader />
							</div>
						) : this.state.error ? (
							<div className="error-container">{this.state.error}</div>
						) : (
							<VideosTable
								videos={this.state.videos}
								edit={this.selectedToEdit}
								delete={this.showDeleteDialog}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}
