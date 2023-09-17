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
				<p className='text-sm text-gray-400'>
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
					nextLabel='İleri'
					onPageChange={(event) => paginate(event.selected + 1)}
					pageRangeDisplayed={isMobile ? 3 : 10}
					pageCount={nPages}
					previousLabel='Geri'
					renderOnZeroPageCount={null}
					forcePage={currentPage - 1}
					pageLinkClassName={
						'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white px-3 py-2 ml-0 leading-tight border rounded-lg cursor-pointer block'
					}
					containerClassName={'flex pl-0 rounded list-none'}
					previousClassName={
						'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white px-3 py-2 ml-0 leading-tight border rounded-lg cursor-pointer'
					}
					nextClassName={
						'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white px-3 py-2 ml-0 leading-tight border rounded-lg cursor-pointer'
					}
					pageClassName={''}
					breakClassName={
						'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white px-3 py-2 ml-0 leading-tight border rounded-lg'
					}
					activeLinkClassName={'border-gray-700 bg-gray-900 text-white block'}
					marginPagesDisplayed={0}
				/>
			</nav>
		</div>
	)
}
