/* 引入图片 */
import Page404Background from '@/static/images/page404.jpg';


export default function Error404(props) {
  return (
		<div className="error-404">
			{/* Error 404: page not found */}
			<img src={Page404Background} />
		</div>
	)
}