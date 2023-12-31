import ReactPaginate from 'react-paginate'
import { isMobile } from 'react-device-detect'
import PreviousIcon from '@/components/icons/PreviousIcon'
import NextIcon from '@/components/icons/NextIcon'
import { CollectionMetaType } from '@/helpers/types'
import { clsx } from 'clsx'

type PaginationType = {
	paginate: Function
	currentPage: number
	meta: CollectionMetaType
}

export default function Pagination({ paginate, currentPage, meta }: PaginationType) {
	const nPages = Math.ceil(meta.total / meta.per_page)

	return (
		<div
			className={clsx(
				'py-2',
				'flex',
				'justify-between',
				'flex-col',
				'space-y-4',
				'md:space-y-0',
				'md:flex-row',
				'items-center',
			)}
		>
			<div>
				<p className='text-sm text-gray-900'>
					Showing
					<span className='font-semibold'>
						&nbsp;
						{meta.from} to {meta.to}
						&nbsp;
					</span>
					of
					<span className='font-semibold'> {meta.total} </span>
					entries
				</p>
			</div>
			<nav className='block'>
				<ReactPaginate
					breakLabel='...'
					onPageChange={(event) => paginate(event.selected + 1)}
					pageRangeDisplayed={isMobile ? 3 : 10}
					pageCount={nPages}
					renderOnZeroPageCount={null}
					previousLabel={<PreviousIcon width={18} height={18} fillColor={'currentColor'} />}
					nextLabel={<NextIcon width={18} height={18} fillColor={'currentColor'} />}
					forcePage={currentPage - 1}
					pageLinkClassName={clsx(
						'bg-transparent',
						'w-10',
						'h-10',
						'rounded-full',
						'flex',
						'items-center',
						'justify-center',
						'hover:!bg-gray-50',
						'hover:!text-gray-900',
						'transition-all',
					)}
					containerClassName={clsx('flex', 'pl-0', 'list-none', 'space-x-1')}
					previousClassName={clsx(
						'bg-blue-50',
						'w-10',
						'h-10',
						'rounded-full',
						'flex',
						'items-center',
						'justify-center',
						'text-blue-500',
						'hover:bg-blue-100',
						'transition-all',
						'cursor-pointer',
					)}
					nextClassName={clsx(
						'bg-blue-50',
						'w-10',
						'h-10',
						'rounded-full',
						'flex',
						'items-center',
						'justify-center',
						'text-blue-500',
						'hover:bg-blue-100',
						'transition-all',
						'cursor-pointer',
					)}
					breakLinkClassName={clsx(
						'bg-white',
						'w-10',
						'h-10',
						'rounded-full',
						'flex',
						'items-center',
						'justify-center',
						'text-blue-700',
						'hover:bg-blue-100',
						'transition-all',
						'cursor-pointer',
					)}
					activeLinkClassName={clsx('!border-transparent', '!bg-blue-500', 'text-white', 'block')}
					marginPagesDisplayed={0}
				/>
			</nav>
		</div>
	)
}
