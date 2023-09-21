import ReactPaginate from 'react-paginate'
import { isMobile } from 'react-device-detect'
import PreviousIcon from '@/components/icons/PreviousIcon'
import NextIcon from '@/components/icons/NextIcon'

type PaginationType = {
	perPage: number
	total: number
	paginate: any
	currentPage: number
}

export default function Pagination({ perPage, total, paginate, currentPage }: PaginationType) {
	const nPages = Math.ceil(total / perPage)

	return (
		<div className='py-2 flex justify-between flex-col space-y-4 md:space-y-0 md:flex-row items-center'>
			<div>
				<p className='text-sm text-gray-900'>
					Sayfada
					<span className='font-medium'> {total} </span>
					kayıttan
					<span className='font-medium'>
						&nbsp;
						{total > perPage
							? currentPage * perPage - perPage > 0
								? currentPage * perPage - perPage
								: 1
							: total}{' '}
						- {total > perPage ? currentPage * perPage : total}
					</span>
					&nbsp;arasındakiler gösteriliyor
				</p>
			</div>
			<nav className='block'>
				<ReactPaginate
					breakLabel='...'
					onPageChange={(event) => paginate(event.selected + 1)}
					pageRangeDisplayed={isMobile ? 3 : 10}
					pageCount={nPages}
					renderOnZeroPageCount={null}
					previousLabel={<PreviousIcon width={20} height={20} fillColor={'#005CE8'} />}
					nextLabel={<NextIcon width={20} height={20} fillColor={'#005CE8'} />}
					forcePage={currentPage - 1}
					pageLinkClassName={
						'bg-transparent w-10 h-10 rounded-full flex items-center justify-center hover:!bg-gray-50 hover:!text-gray-900 transition-all'
					}
					containerClassName={'flex pl-0 list-none space-x-1'}
					previousClassName={
						'bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center'
					}
					nextClassName={
						'bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center'
					}
					activeLinkClassName={'!border-transparent !bg-blue-500 text-white block'}
					marginPagesDisplayed={0}
				/>
			</nav>
		</div>
	)
}