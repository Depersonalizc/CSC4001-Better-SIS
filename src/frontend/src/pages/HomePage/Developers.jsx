/* 引入数据 */
import { DeveloperData } from '../data.d';

/* 引入Ant Design组件 */
import { Divider } from 'antd';


export default function Developers(props) {
  return (
		<div id="home-page-developers">
			<p>
				开发团队
				<Divider style={{backgroundColor: "cyan",}} />
			</p>
			<div>
				{
					DeveloperData.map( (ele, index) => {
						return (
							<div key={index}>
								<img src={ele.avatar} />
								<div>
									<p>{ele.name}</p>
									<p>
										{ele.job}
										<Divider style={{backgroundColor: "cyan",}} />
									</p>
									<p>{ele.detailedJob}</p>
									<p>{ele.comment}</p>
								</div>
							</div>
						);
					} )
				}
			</div>
		</div>
	);
}