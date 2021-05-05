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


export const TermListData = [
	"2018-2019 Term 1",
	"2018-2019 Term 2",
	"2018-2019 Summer Term",
	"2019-2020 Term 1",
	"2019-2020 Term 2",
	"2019-2020 Summer Term",
	"2020-2021 Term 1",
	"2020-2021 Term 2",
	"2020-2021 Summer Term",
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


export const StudentData = [
	{
		name: "刘宇轩",
		gender: true,
		age: 21,
		studentID: "118010200",
		major: "计算机科学与工程",
		school: "数据科学学院",
		college: "祥波书院",
	},
];


export const CourseTimeSlotList = [
	{
		courseTitle: "CSC1001",
		session: 1,
		isLecture: true,
		beginTime: "8:30",
		endTime: "9:50",
		weekday: "Monday",
		location: "TB 105",
	},
	{
		courseTitle: "CSC1001",
		session: 2,
		isLecture: false,
		beginTime: "18:00",
		endTime: "18:50",
		weekday: "Monday",
		location: "TD 110",
	},
];

export const AddedNotConfirmedList = [
	{
		courseTitle: "CSC3100",
		session: 1,
		isLecture: true,
		beginTime: "8:30",
		endTime: "9:50",
		weekday: "Wednesday",
		location: "TA 101",
	},
	{
		courseTitle: "CSC3100",
		session: 2,
		isLecture: true,
		beginTime: "10:30",
		endTime: "11:50",
		weekday: "Friday",
		location: "TA 310",
	},
];


export const ComingTimeSlotList = [
	{
		courseTitle: "CSC1001",
		session: 1,
		isLecture: true,
		beginTime: "8:30",
		endTime: "9:50",
		weekday: "Tuesday",
		location: "TB 105",
	},
	{
		courseTitle: "CSC1001",
		session: 1,
		isLecture: true,
		beginTime: "8:30",
		endTime: "9:50",
		weekday: "Tuesday",
		location: "TB 105",
	},
];


export const SearchData = {
	coursePrefix: {
		title: "课程前缀",
		data: [
			"CSC",
			"EIE",
			"CHI",
			"ECO",
			"MKT",
			"ERG",
			"ENG",
			"MAT",
			"STA",
		],
	},
	courseSchool: {
		title: "所属学院",
		data: [
			"SSE",
			"SDS",
			"SME",
			"HSS",
			"LHS",
		],
	},
	courseTargetStudent: {
		title: "目标学生",
		data: [
			"本科生",
			"硕士生",
			"博士生",
		],
	},
};


export const CourseData = [
	{
		title: "CSC1001",
		fullName: "CSC1001 - Introduction to Computational Programming",
		code: 1001,
		credit: 3,
		school: "SDS",
		term: "2020-2021 Term 2",
		mode: "Onsite",
		targetStudent: "Undergraduate",
		introduction: `
		Python is an interpreted high-level general-purpose programming language. Python's design philosophy emphasizes code readability with its notable use of significant indentation. Its language constructs as well as its object-oriented approach aim to help programmers write clear, logical code for small and large-scale projects.[29]
		Python is dynamically-typed and garbage-collected. It supports multiple programming paradigms, including structured (particularly, procedural), object-oriented and functional programming. Python is often described as a "batteries included" language due to its comprehensive standard library.[30]
		Guido van Rossum began working on Python in the late 1980s, as a successor to the ABC programming language, and first released it in 1991 as Python 0.9.0.[31] Python 2.0 was released in 2000 and introduced new features, such as list comprehensions and a garbage collection system using reference counting and was discontinued with version 2.7.18 in 2020.[32] Python 3.0 was released in 2008 and was a major revision of the language that is not completely backward-compatible and much Python 2 code does not run unmodified on Python 3.
		Python consistently ranks as one of the most popular programming languages.
		`,
		markingCriteria: [
			{
				item: "Assignments",
				weight: "20%",
			}, {
				item: "Mid-Term Exam",
				weight: "30%",
			}, {
				item: "Final Exam",
				weight: "50%",
			},
		],
		syllabus: "https://www.baidu.com/",
		prerequisites: [
			"CSC1001",
			"CSC1002",
			"CSC3100",
		],
		session: [
			{
				sessionNumber: 1,
				isLecture: true,
				instructor: "Xiaoguang Han",
				weekday: "Monday",
				beginTime: "13:00",
				endTime: "14:20",
				timeSlots: [
					{
						weekday: "Monday",
						beginTime: "13:00",
						endTime: "14:20",
					}, {
						weekday: "Wednesday",
						beginTime: "13:00",
						endTime: "14:20",
					},
				],
				location: "TB 101",
				currentEnrollment: 142,
				classCapacity: 150,
			},
			{
				sessionNumber: 2,
				isLecture: true,
				instructor: "Junhua Zhao",
				weekday: "Monday",
				beginTime: "15:00",
				endTime: "16:20",
				timeSlots: [
					{
						weekday: "Monday",
						beginTime: "15:00",
						endTime: "16:20",
					}, {
						weekday: "Wednesday",
						beginTime: "15:00",
						endTime: "16:20",
					},
				],
				location: "TB 105",
				currentEnrollment: 129,
				classCapacity: 150,
			},
			{
				sessionNumber: 3,
				isLecture: true,
				instructor: "Wei Cai",
				weekday: "Tuesday",
				beginTime: "13:00",
				endTime: "14:20",
				timeSlots: [
					{
						weekday: "Tuesday",
						beginTime: "13:00",
						endTime: "14:20",
					}, {
						weekday: "Thursday",
						beginTime: "13:00",
						endTime: "14:20",
					},
				],
				location: "TB 110",
				currentEnrollment: 148,
				classCapacity: 150,
			},
			{
				sessionNumber: 1,
				isLecture: false,
				instructor: "Staff",
				weekday: "Monday",
				beginTime: "18:00",
				endTime: "18:50",
				timeSlots: [
					{
						weekday: "Monday",
						beginTime: "18:00",
						endTime: "18:50",
					},
				],
				location: "TD 110",
				currentEnrollment: 37,
				classCapacity: 40,
			},
			{
				sessionNumber: 2,
				isLecture: false,
				instructor: "Staff",
				weekday: "Wednesday",
				beginTime: "19:00",
				endTime: "19:50",
				timeSlots: [
					{
						weekday: "Wednesday",
						beginTime: "19:00",
						endTime: "19:50",
					},
				],
				location: "TC 210",
				currentEnrollment: 40,
				classCapacity: 40,
			},
		]
	},
	{
		title: "CSC3002",
		fullName: "CSC3002 - Introduction to Computational Paradigm",
		code: 3002,
		credit: 3,
		school: "SDS",
		term: "2020-2021 Term 2",
		mode: "Onsite",
		targetStudent: "Undergraduate",
		introduction: `
		C++ (/ˌsiːˌplʌsˈplʌs/) is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or "C with Classes". The language has expanded significantly over time, and modern C++ now has object-oriented, generic, and functional features in addition to facilities for low-level memory manipulation. It is almost always implemented as a compiled language, and many vendors provide C++ compilers, including the Free Software Foundation, LLVM, Microsoft, Intel, Oracle, and IBM, so it is available on many platforms.[9]
		C++ was designed with an orientation toward system programming and embedded, resource-constrained software and large systems, with performance, efficiency, and flexibility of use as its design highlights.[10] C++ has also been found useful in many other contexts, with key strengths being software infrastructure and resource-constrained applications,[10] including desktop applications, video games, servers (e.g. e-commerce, web search, or databases), and performance-critical applications (e.g. telephone switches or space probes).[11]
		C++ is standardized by the International Organization for Standardization (ISO), with the latest standard version ratified and published by ISO in December 2020 as ISO/IEC 14882:2020 (informally known as C++20).[12] The C++ programming language was initially standardized in 1998 as ISO/IEC 14882:1998, which was then amended by the C++03, C++11, C++14, and C++17 standards. The current C++20 standard supersedes these with new features and an enlarged standard library. Before the initial standardization in 1998, C++ was developed by Danish computer scientist Bjarne Stroustrup at Bell Labs since 1979 as an extension of the C language; he wanted an efficient and flexible language similar to C that also provided high-level features for program organization.[13] Since 2012, C++ is on a three-year release schedule,[14] with C++23 the next planned standard.
		`,
		markingCriteria: [
			{
				item: "Assignments",
				weight: "30%",
			}, {
				item: "Mid-Term Exam",
				weight: "30%",
			}, {
				item: "Final Exam",
				weight: "40%",
			},
		],
		syllabus: "https://www.baidu.com/",
		prerequisites: [
			"CSC1001",
			"CSC1002",
			"CSC3100",
		],
		session: [
			{
				sessionNumber: 1,
				isLecture: true,
				instructor: "Rui Huang",
				weekday: "Thursday",
				beginTime: "13:00",
				endTime: "14:20",
				timeSlots: [
					{
						weekday: "Tuesday",
						beginTime: "13:00",
						endTime: "14:20",
					}, {
						weekday: "Thursday",
						beginTime: "13:00",
						endTime: "14:20",
					},
				],
				location: "TB 101",
				currentEnrollment: 142,
				classCapacity: 150,
			},
			{
				sessionNumber: 2,
				isLecture: true,
				instructor: "Rui Huang",
				weekday: "Friday",
				beginTime: "15:00",
				endTime: "16:20",
				timeSlots: [
					{
						weekday: "Friday",
						beginTime: "15:00",
						endTime: "16:20",
					}, {
						weekday: "Friday",
						beginTime: "16:30",
						endTime: "16:50",
					},
				],
				location: "TB 105",
				currentEnrollment: 129,
				classCapacity: 150,
			},
			{
				sessionNumber: 1,
				isLecture: false,
				instructor: "Staff",
				weekday: "Monday",
				beginTime: "19:00",
				endTime: "19:50",
				timeSlots: [
					{
						weekday: "Monday",
						beginTime: "19:00",
						endTime: "19:50",
					},
				],
				location: "TD 110",
				currentEnrollment: 37,
				classCapacity: 40,
			},
			{
				sessionNumber: 2,
				isLecture: false,
				instructor: "Staff",
				weekday: "Thursday",
				beginTime: "19:00",
				endTime: "19:50",
				timeSlots: [
					{
						weekday: "Thursday",
						beginTime: "19:00",
						endTime: "19:50",
					},
				],
				location: "TC 210",
				currentEnrollment: 40,
				classCapacity: 40,
			},
		],
	},
];


export const CourseCommentData = [
	{
		actions: <span>Reply to</span>,
		author: "Liu Yuxuan",
		avatar: DeveloperLyxAvatar,
		content: "This is a nice course",
		dateTime: "2021-05-04",
	},
	{
		actions: <span>Reply to</span>,
		author: "Li Yihan",
		avatar: DeveloperLyhAvatar,
		content: "This is a nice course",
		dateTime: "2021-05-04",
	},
	{
		actions: <span>Reply to</span>,
		author: "Li Zeyu",
		avatar: DeveloperLzyAvatar,
		content: "This is a nice course",
		dateTime: "2021-05-04",
	},
	{
		actions: <span>Reply to</span>,
		author: "Chen Ang",
		avatar: DeveloperCaAvatar,
		content: "This is a nice course",
		dateTime: "2021-05-04",
	},
];