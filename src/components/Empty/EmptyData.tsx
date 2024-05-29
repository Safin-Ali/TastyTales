import { Empty } from 'keep-react'
import emptySvg from '../../../public/assets/empty.svg';

export const EmptyData = () => {
	return (
		<Empty>
			<Empty.Image>
				<img src={emptySvg} alt="empty_vector" />
			</Empty.Image>
			<Empty.Title>No Data Found</Empty.Title>
		</Empty>
	)
}
