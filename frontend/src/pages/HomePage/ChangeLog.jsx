import react, { useState, useEffect } from 'react';

import { Comment, Tooltip, List, Divider } from 'antd';
import moment from 'moment';

export default function ChangeLog(props) {
	const [ commitArray, setCommitArray ] = useState([]);

  useEffect( () => {
		const getRepoCommitInfo = async () => {
			const baseURL = "https://api.github.com";
			const repoOwner = "Depersonalizc";
			const repoName = "CSC4001-Better-SIS";
			const targetURL = `${baseURL}/repos/${repoOwner}/${repoName}/commits`;
			console.log(`targetURL = ${ targetURL }`);

			try {
				let resp = await( fetch(targetURL, {
					method: "GET",
					mode: "cors",
				}) );
				let json = await( resp.json() );
				console.log(`typeof json = ${ Object.prototype.toString.call(json) }`);

				// here, json is an array type
				let outputArray = [];
				for (let index in json) {
					if (!json[index]["author"]) {
						continue;
					}
					let obj = json[index]["commit"]
					outputArray.push( {
						author: obj["author"]["name"],
						time: obj["author"]["date"],
						email: obj["author"]["email"],
						avatar_url: json[index]["author"]["avatar_url"],
						mesg: obj["message"],
						url: obj["url"],
					} );
				}
				console.log(`outputArray = ${ JSON.stringify(outputArray) }`);
				setCommitArray(outputArray);
			}
			catch(error) {
				console.log(error);
			}
		};
		getRepoCommitInfo();
	}, [] )

	return (
		<div className="home-page-change-log">
			<p>更新日志</p>
			<ChangeLogItem data={commitArray} />
		</div>
	);
}


function ChangeLogItem(props) {
	// const [ data, setData ] = useState([]);

	// useEffect(() => {
	// 	let outputArray = [];
	// 	for (let index in props.data) {
	// 		outputArray.push({
	// 			actions: [<span key="learn-more">Learn More</span>],
	// 			author: props.data.author,
	// 			avatar_url: props.data.avatar_url,
	// 			content: (
	// 				<p>{props.data.mesg}</p>
	// 			),
	// 			datetime: (
	// 				<span>{props.data.time}</span>
	// 			),
	// 		});
	// 	}
	// 	console.log(`outputArray = ${outputArray}`);
	// 	setData(outputArray)
	// }, []);

	let data = [];
	for (let index in props.data) {
		console.log(`props.data[index] = ${ JSON.stringify(props.data[index]) }`);
		data.push({
			actions: [<a key="learn-more" href={props.data[index].url} target="_blank" rel="noopenner">Learn More</a>],
			author: props.data[index].author,
			avatar_url: props.data[index].avatar_url,
			content: (
				<p>{props.data[index].mesg}</p>
			),
			datetime: (
				<span>{props.data[index].time}</span>
			),
		});
	}

	return (
		<List
			className="change-log-commit-list"
			header={`${data.length} change logs`}
			itemLayout="horizontal"
			dataSource={data}
			renderItem={item => (
				<li>
					<Comment
						className="change-log-commit-item"
						actions={item.actions}
						author={item.author}
						avatar={item.avatar_url}
						content={item.content}
						datetime={item.datetime}
					/>
				</li>
			)}
		/>
	)
}