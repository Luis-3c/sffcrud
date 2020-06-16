import React, { useState, useEffect } from 'react';
import './css/index.css';
import VideosForm from '../components/videosform/VideosForm';
import VideosTable from '../components/videostable/VideosTable';
import superffService from '../services/superffService';
import Loader from '../components/loader/Loader';
import Dialog from '../components/dialog/Dialog';

const loadVideosTable = async (setVideos) => {
	// llenar la table de videos
	setVideos({
		loading: true
	});
	await superffService.videos
		.list()
		.then((res) => {
			setVideos({
				v: res.data,
				loading: false,
				error: false
			});
		})
		.catch((error) => {
			setVideos({
				error: error.response,
				loading: false
			});
		});
};

export default function useVideos() {
	const [ videos, setVideos ] = useState({
		v: [],
		loading: false,
		error: false
	});

	const [ videoSelected, setVideoSelected ] = useState({
		v: {},
		editable: false
	});

	const [ dialog, setDialog ] = useState({
		show: false,
		message: '',
		videoId: 0
	});

	useEffect(() => {
		loadVideosTable(setVideos);
	}, []);

	const register = async (v) => {
		// registrar nuevos videos
		videos.loading = true;
		await superffService.videos
			.create(v)
			.then((res) => {
				loadVideosTable(setVideos);
			})
			.catch((error) => {
				videos.error = error.response.data.response;
				videos.loading = false;
			});
	};

	const update = async (v) => {
		videos.loading = true;
		await superffService.videos
			.update(v)
			.then((res) => {
				loadVideosTable(setVideos);
				videoSelected.editable = false;
			})
			.catch((error) => {
				videos.error = error.response.data.response;
				videos.loading = false;
			});
	};

	const selectedToEdit = (v) => {
		setVideoSelected({
			v: v,
			editable: true
		});
	};

	const showDeleteDialog = (videoId) => {
		setDialog({
			show: true,
			message: 'Are ypu sure you want to delete this video?',
			videoId: videoId
		});
	};

	const confirmDeleteDialog = async (videoId) => {
		setDialog({
			show: false,
			message: '',
			videoId: 0
		});
		videos.loading = true;
		await superffService.videos
			.delete(videoId)
			.then(() => {
				loadVideosTable(setVideos);
			})
			.catch((e) => {
				videos.error = e.response.data.response;
				videos.loading = false;
			});
	};

	const cancelDeleteDialog = () => {
		setDialog({
			show: false,
			message: '',
			videoId: 0
		});
	};

	return (
		<div className="main-cont">
			{dialog.show ? (
				<Dialog
					message={dialog.message}
					id={dialog.videoId}
					confirm={confirmDeleteDialog}
					cancel={cancelDeleteDialog}
				/>
			) : null}
			<div className="row">
				<div className="col-sm-3">
					<VideosForm
						register={register}
						selectedVideo={videoSelected.v}
						editable={videoSelected.editable}
						update={update}
					/>
				</div>
				<div className="col-sm-9">
					{videos.loading ? (
						<div className="loader-cont">
							<Loader />
						</div>
					) : videos.error ? (
						<div className="error-container">{videos.error}</div>
					) : (
						<VideosTable videos={videos.v} edit={selectedToEdit} delete={showDeleteDialog} />
					)}
				</div>
			</div>
		</div>
	);
}
