import React from 'react';
import './VideosTable.css';

export default function VideosTable(props)  {

	const handleDeleteCLick = (videoid) =>{
		props.delete(videoid);
	};

		return (
			<div className="container-fluid">
				<table className="videos-table">
					<thead>
						<tr>
							{/* <th>Id</th> */}
							<th>Id Vimeo</th>
							<th>Title</th>
							<th>Description</th>
							<th>Created at</th>
							<th>Updated at</th>
							<th />
							<th />
						</tr>
					</thead>
					<tbody>
						{props.videos.map((v) => {
							return (
								<React.Fragment key={v.id}>
									<tr className="video-row">
										{/* <td>{v.id}</td> */}
										<td>{v.idvideo}</td>
										<td>{v.title}</td>
										<td>{v.description}</td>
										<td>{v.created_at}</td>
										<td>{v.updated_at}</td>
										<td>
											<button className="btn btn-success" onClick={() => props.edit(v)}>
												Edit
											</button>
										</td>
										<td>
											<button className="btn btn-danger" onClick={() => handleDeleteCLick(v.id)}>Delete</button>
										</td>
									</tr>
									<tr>
										<td colSpan="8"><hr/></td>
									</tr>
								</React.Fragment>
							);
						})}
					</tbody>
				</table>
			</div>
		);
}

