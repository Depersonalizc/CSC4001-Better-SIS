/* 引入图片 */
import DeveloperLyhAvatar from '@/static/images/developer-lyh.png';
import DeveloperLzyAvatar from '@/static/images/developer-lzy.png';
import DeveloperCaAvatar from '@/static/images/developer-ca.png';
import DeveloperLyxAvatar from '@/static/images/developer-lyx.png'; 

/* 引入Ant Design组件 */
import { GithubOutlined, ClockCircleOutlined } from '@ant-design/icons';



export const DeveloperData = [
    {
        name: "李易寒",
        avatar: DeveloperLyhAvatar,
        job: "Backend Developer",
        detailedJob: "detailed distribution",
        comment: "comment",
    },
    {
        name: "李泽宇",
        avatar: DeveloperLzyAvatar,
        job: "Frontend Developer",
        detailedJob: "detailed distribution",
        comment: "comment",
    },
    {
        name: "陈昂",
        avatar: DeveloperCaAvatar,
        job: "Algorithm Designer",
        detailedJob: "detailed distribution",
        comment: "comment",
    },
    {
        name: "刘宇轩",
        avatar: DeveloperLyxAvatar,
        job: "Frontend Developer",
        detailedJob: "detailed distribution",
        comment: "comment",
    },
];



export const HomePageFooterData = [
	{
		title: "致谢",
		data: [
			{
				name: "React-前端开发框架",
				href: "https://reactjs.org/",
			}, {
				name: "UmiJS-React脚手架",
				href: "https://umijs.org/zh-CN",
			}, {
				name: "Ant Design-UI库",
				href: "https://ant.design/index-cn",
			}, {
				name: "CUHK(SZ)-课程及教授信息来源",
				href: "https://www.cuhk.edu.cn/",
			},
		],
	}, 
	{
		title: "帮助",
		data: [
			{
				name: "GitHub仓库",
				icon: GithubOutlined,
				href: "https://github.com/Depersonalizc/CSC4001-Better-SIS",
			}, {
				name: "更新日志",
				icon: ClockCircleOutlined,
				href: "/",
			},
		],
	},
	{
		title: "证书",
		data: [
			{
				name: "MIT License",
				href: "https://spdx.org/licenses/MIT",
			},
		],
	},
];