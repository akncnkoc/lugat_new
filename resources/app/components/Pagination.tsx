import ReactPaginate from 'react-paginate'
import { isMobile } from 'react-device-detect'

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
					forcePage={currentPage - 1}
					pageLinkClassName={
						'bg-gray-100 border-gray-400 text-gray-600 hover:bg-gray-300 hover:text-gray-800 px-3 py-2 ml-0 leading-tight border rounded-lg cursor-pointer block'
					}
					containerClassName={'flex pl-0 rounded list-none space-x-1'}
					previousClassName={
						'bg-gray-300 border-gray-400 text-gray-600 hover:bg-gray-300 hover:text-gray-800 px-3 py-2 ml-0 leading-tight border rounded-lg cursor-pointer'
					}
					nextClassName={
						'bg-gray-300 border-gray-400 text-gray-600 hover:bg-gray-300 hover:text-gray-800 px-3 py-2 ml-0 leading-tight border rounded-lg cursor-pointer'
					}
					pageClassName={'bg-gray-300 text-white rounded-lg'}
					breakClassName={
						'bg-gray-300 border-gray-400 text-gray-600 hover:bg-gray-300 hover:text-gray-800 px-3 py-2 ml-0 leading-tight border rounded-lg'
					}
					activeLinkClassName={'!border-transparent bg-blue-700 text-white block'}
					marginPagesDisplayed={0}
				/>
			</nav>
		</div>
	)
}
