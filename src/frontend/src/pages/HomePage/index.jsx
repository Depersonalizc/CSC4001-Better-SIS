/* 引入样式表 */
import './index.less';

/* 引入rem计算 */
import '../../utils/rem.jsx';

/* 引入组件 */
import Header from './Header';
import Navigator from './Navigator';
import CourseRegistration from './CourseRegistration';
import CourseEvaluation from './CourseEvaluation';
import Developers from './Developers';
import ChangeLog from './ChangeLog';
import Footer from './Footer';

/* 引入图片 */
import CourseInfoImg from '@/static/images/course-info.jpg';
import ProfessorTomLuo from '@/static/images/professor-tom-luo.jpg';



export default function IndexPage() {
  return (
    <div className="home-page">
      <Header />
      <Navigator />
      <CourseRegistration />
      <CourseEvaluation />
      <div id="home-page-course-instructor-info">
        <img src={CourseInfoImg} />
        <img src={ProfessorTomLuo} />
        <p className="home-page-course-instructor-info-title">整合课程和教师信息，选课途中轻松查阅</p>
        <p className="home-page-course-info">课程信息</p>
        <p className="home-page-instructor-info">教师信息</p>
      </div>
      <Developers />
      <div id="home-page-project-info">
        <p className="home-page-project-info-title">
          {/* 更新日志及项目设计信息 */}
          项目信息
        </p>
        <div>
          <ChangeLog />
          <div>
            <p>项目设计（UML+报告）</p>
          </div>
        </div>
      </div>
      <div id="home-page-footer">
        <Footer />
      </div>
    </div>
  );
}
