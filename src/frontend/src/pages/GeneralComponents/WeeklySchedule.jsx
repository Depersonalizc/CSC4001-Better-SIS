import React from 'react';

/* 引入样式表 */
import '../global.less';

/* 引入通用及api函数 */
import { getStudentInfo } from '../api/api';
import {
  getCookie,
} from '../../utils/GeneralFunctions';

/* 引入数据 */
import { CourseTimeSlotList } from '../data.d';

/* 引入Ant Design */
import {
  Badge,
  Spin,
} from 'antd';


const rowNumber = 16;
const rowHeight = 5;
// const columnNumber = 8;
const columnNumber = 6;
// const columnWidth = 22;
const columnWidth = 20;
const startDate = new Date();


const ColorList = {
  confirmed: "#8CEA00",           // code: 1
  addedNotConfirmed: "#b37feb",   // code: 2
  added: "#ff85c0",               // code: 3
  toAdd: "#ff85c0",
};
// const ColorCodeToString = (code) => {
//   switch(code) {
//     case 1:
//       return ColorList["confior"]
//   }
// }


// let dateRow = ["time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let dateRow = ["time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let timeArray = ["08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30"];



export default function WeeklySchedule(props) {
  let weeklyScheduleArray = [];
  // 构建初始空课表
  for ( let i = 0; i < rowNumber * columnNumber; ++i ) {
    weeklyScheduleArray[i] = "";
  }
  for ( let i = 0; i < dateRow.length; ++i ) {
    weeklyScheduleArray[i] = dateRow[i];
  }
  for ( let row = 1; row < rowNumber; ++row ) {
    weeklyScheduleArray[row * columnNumber] = timeArray[row - 1];
  }
  /* 
   * props格式
   * --------------------------
   * {
   *   timeSlots: {
   *     confirmed: {
   *        show: boolean,
   *        data: [],
   *     },
   *     addedNotConfirmed: {
   *        show: boolean,
   *        data: [], 
   *     },
   *     comingLectures: {
   *        show: boolean,
   *        keepShowing: boolean,
   *        data: [],
   *     },
   *     comingTutorials: {
   *        show: boolean,
   *        keepShowing: boolean,
   *        data: [],
   *     },
   *   }
   * }
   */

  const [ isSpinning, setIsSpinning ] = React.useState(true);
  const [ userInfo, setUserInfo ] = React.useState(null);

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      let studentID = getCookie("studentID");

      if (studentID) {
        let studentInfo = await( getStudentInfo(studentID) );
        console.log(`return studentInfo = ${ JSON.stringify(studentInfo) }`);

        setUserInfo(studentInfo);
        setIsSpinning(false);
      }
    };

    fetchUserInfo();
  }, []);

  // console.log(`weeklySchdeduleArray = ${weeklyScheduleArray} with type = ${Object.prototype.toString.call(weeklyScheduleArray)}`);
  
  
  let confirmedTimeSlotList = [];
  if ( userInfo ) {
    userInfo.weeklySchedule.confirmed.forEach(element => {
      element.timeSlots.forEach((ele) => {
        confirmedTimeSlotList.push({
            courseTitle: element.courseCode,
            sessionNumber: element.sessionNumber,
            isLecture: element.isLecture,
            beginTime: ele.beginTime,
            endTime: ele.endTime,
            weekday: ele.weekday,
            location: element.location,
        });
      });
    });
  }
  console.log(`confirmed time slot list = ${ JSON.stringify(confirmedTimeSlotList) }`);


  return (
    <Spin spinning={isSpinning} >
      <div>
        <div className="weekly-schedule">
          {
            weeklyScheduleArray && weeklyScheduleArray.map((ele, index) => {
              return (
                <div key={index}>
                  <p className="default-grid-text">{ele}</p>
                </div>
              );
            })
          }
          {
            confirmedTimeSlotList.map((ele, index) => {
              return (
                <TimeSlot 
                  data={ele}
                  key={index}
                  type="confirmed"
                />
              );
            })
          }
          {/* {
            userInfo? userInfo.weeklySchedule.confirmed.map((ele, index) => {
              console.log(`!!! ele = ${ JSON.stringify(ele) }`);

              ele.timeSlots.map((timeslot, idx) => {
                return (
                  <TimeSlot 
                    data={{
                      courseTitle: ele.courseTitle,
                      sessionNumber: ele.sessionNumber,
                      isLecture: ele.isLecture,
                      beginTime: timeslot.beginTime,
                      endTime: timeslot.endTime,
                      weekday: timeslot.weekday,
                      location: ele.location,
                    }}
                    type="confirmed"
                  />
                )
              })

              // const firstData = {
              //   courseTitle: ele.courseCode,
              //   sessionNumber: ele.sessionNumber,
              //   isLecture: ele.isLecture,
              //   beginTime: ele.timeSlots[0].beginTime,
              //   endTime: ele.timeSlots[0].endTime,
              //   weekday: ele.timeSlots[0].weekday,
              //   location: ele.location,
              // };
              // // console.log(`!!! firstData = ${firstData}`);
              // if ( ele.isLecture === true ) {
              //   return (
              //     <TimeSlot data={firstData} type="confirmed" />
              //     // <TimeSlot data={{
              //     //   courseTitle: ele.courseCode,
              //     //   isLecture: true,
              //     //   beginTime: ele.timeSlots[0].beginTime,
              //     //   endTime: ele.timeSlots[0].endTime,
              //     //   weekday: ele.timeSlots[0].weekday,
              //     //   location: ele.location,
              //     // }} type="confirmed" />
              //   );
              // }
              // else {
              //   return (
              //     <TimeSlot data={firstData} type="confirmed" />
              //   )
              // }
              // // return (
              // //   <TimeSlot data={ele} key={index} type={"confirmed"} />
              // // );
            })
            :
            null
          } */}


          {/* {
            props.timeSlots && props.timeSlots.confirmed && props.timeSlots.confirmed.show && props.timeSlots.confirmed.data.map((ele, index) => {
              return (
                <TimeSlot data={ele} key={index} type={"added"} />
              );
            })
          } */}



          {/* {
            props.timeSlots && props.timeSlots.addedNotConfirmed && props.timeSlots.addedNotConfirmed.show && props.timeSlots.addedNotConfirmed.data.map((ele, index) => {
              return (
                <TimeSlot data={ele} key={index} type={"addedNotConfirmed"} />
              );
            })
          } */}
          {
            props.timeSlots && props.timeSlots.comingLectures && props.timeSlots.comingLectures.show && props.timeSlots.comingLectures.data.map((ele, index) => {
              return (
                <TimeSlot data={ele} key={index} type={"added"} />
              );
            })
          }
          {
            props.timeSlots && props.timeSlots.comingTutorials && props.timeSlots.comingTutorials.show && props.timeSlots.comingTutorials.data.map((ele, index) => {
              return (
                <TimeSlot data={ele} key={index} type={"added"} />
              );
            })
          }



          {/* {
            props.existsCourseList && props.existsCourseList.map((ele, index) => {
              return (
                <TimeSlot data={ele} key={index} type={"confirmed"} />
              )
            })
          }
          {
            props.showComingCourses && props.comingCourseList && props.comingCourseList.map((ele, index) => {
              return (
                <TimeSlot data={ele} key={index} type={"added"} />
              )
            })
          }
          {
            props.showComingTutorial && props.comingTutorialList && props.comingTutorialList.map((ele, index) => {
              return (
                <TimeSlot data={ele} key={index} type={"added"} />
              )
            })
          } */}
        </div>
        <div className="weekly-schedule-prompt">
          <div>
            <Badge className="weekly-schedule-prompt-badge" color={ColorList.confirmed} text={"Confirmed"} />
            {/* <Badge className="weekly-schedule-prompt-badge" color={ColorList.addedNotConfirmed} text={"Added But Not Confirmed"} /> */}
            <Badge className="weekly-schedule-prompt-badge" color={ColorList.toAdd} text={"To Add"} />
          </div>
        </div>
      </div>
    </Spin>
  )
}


function TimeSlot(props) {
  // console.log(`!!! timeSLot: props.data = ${ JSON.stringify(props.data) }`);
  const weekDayToNumber = (weekday) => {
    switch(weekday) {
      case "Monday":
        return 1;
      case "Tuesday":
        return 2;
      case "Wednesday":
        return 3;
      case "Thursday":
        return 4;
      case "Friday":
        return 5;
      case "Saturday":
        return 6;
      case "Sunday":
        return 7;
      default:
        return -1;
    }
  };

  const calculateTopMargin = (beginTime) => {
    try {
      let hour = parseInt( beginTime.split(":")[0], 10 );
      let minute = parseInt( beginTime.split(":")[1], 10 );

      let baseTopMargin = 7.5 + (hour - 8) * rowHeight;
      let bonusTopMargin = ( minute / 60 ) * rowHeight;
      return (baseTopMargin + bonusTopMargin).toFixed(2) + "rem";
    }
    catch(error) {
      console.log(error);
    }
  };

  const calculateLeftMargin = (weekday) => {
    try {
      let weekdayNumber = weekDayToNumber( weekday );
      if ( weekdayNumber === -1 ) {
        console.log(`error occurs: weekday number = -1`);
      }
      return ( 10 + (weekdayNumber - 1) * columnWidth ).toFixed(2) + "rem";
    }
    catch(error) {
      console.log(error);
    }
  };

  const session = props.data.session || props.data.sessionNumber;
  return (
    <div 
      className="time-slot"
      style={{
        top: calculateTopMargin(props.data && props.data.beginTime),
        left: calculateLeftMargin(props.data.weekday),
        backgroundColor: ColorList[props.type],
        boxShadow: props.isExist? "1.5px 1.5px 1.5px 1.5px rgba(182, 209, 146)" : "1.5px 1.5px 1.5px 1.5px #ffd6e7",
      }}
    >
      <p>
        {`${props.data.courseTitle} - ${props.data.isLecture? "L" : "T"}${session.toString().length === 1? '0' + session.toString() : session.toString()}`}
      </p>
      <p>{props.data.isLecture? "Lecture" : "Tutorial"}</p>
      <p>
        {`${props.data.beginTime} - ${props.data.endTime}`}
      </p>
      <p>{props.data.location}</p>
    </div>
  )
}