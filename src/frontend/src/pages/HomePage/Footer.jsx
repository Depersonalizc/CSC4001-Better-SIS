/* 引入Ant Design组件 */
import { Divider } from 'antd';

/* 引入数据 */
import { HomePageFooterData } from '../data.d';


export default function Footer(props) {
  return (
		<div>
			{
				HomePageFooterData.map((ele, index) => {
					return (
						<div key={index}>
							<ul key={index}>
								<li>{ele.title}</li>
								{
									ele.data.map((innerEle, innerIndex) => {
										return (
											<li key={innerIndex}>
												<a href={innerEle.href} key={innerIndex} target="_blank" rel="noreferrer">
													{innerEle.icon && <innerEle.icon className="home-page-footer-icon" />}
													{innerEle.name}
												</a>
											</li>
										);
									})
								}
							</ul>
						</div>
					);
				})
			}
			<div className="home-page-footer-copyright">
				<Divider style={{backgroundColor: "white",}} />
				{`COPYRIGHT © ${2021} ${"CSC4001-Group-Members"}. ALL RIGHTS RESERVED.`}
			</div>
		</div>
	);
}