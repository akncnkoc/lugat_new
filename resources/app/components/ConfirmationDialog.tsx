import LugatButton from '@/components/form/LugatButton'
import { ConfirmationDialogResponse } from '@/helpers/types'
import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'

interface Props {
  onResolve: (r: ConfirmationDialogResponse) => void
}

const ConfirmationDialog: FC<Props> = ({ onResolve }) => {
  const handleYes = () => {
    onResolve(ConfirmationDialogResponse.YES)
  }

  const handleNo = () => {
    onResolve(ConfirmationDialogResponse.NO)
  }

  return (
    <AnimatePresence>
      <motion.div
        className={clsx('relative', 'p-4', 'max-w-lg', 'h-52', 'md:h-52', 'z-[99999999]')}
        initial={{
          opacity: 0,
          scale: 0.75,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            ease: 'easeOut',
            duration: 0.15,
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.75,
          transition: {
            ease: 'easeIn',
            duration: 0.15,
          },
        }}
      >
        <div className={clsx('relative', 'p-4', 'text-center', 'bg-white', 'rounded-lg', 'shadow', 'sm:p-5', 'w-full', 'h-full')}>
          <button
            type='button'
            onClick={handleNo}
            className={clsx(
              'text-gray-400',
              'absolute',
              'top-2.5',
              'right-2.5',
              'bg-transparent',
              'hover:bg-gray-200',
              'hover:text-gray-900',
              'rounded-lg',
              'text-sm',
              'p-1.5',
              'ml-auto',
              'inline-flex',
              'items-center',
            )}
          >
            <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <svg
            className={clsx('text-gray-400', 'w-11', 'h-11', 'mb-3.5', 'mx-auto')}
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
              clipRule='evenodd'
            ></path>
          </svg>
          <p className='mb-4 text-gray-500'>Are you sure you want to delete this item?</p>
          <div className={clsx('flex', 'justify-center', 'items-center', 'space-x-4')}>
            <LugatButton onClick={handleNo} buttonClassNames={clsx('!w-fit', 'bg-gray-50', 'hover:bg-gray-100', '!text-gray-900')}>
              No, cancel
            </LugatButton>
            <LugatButton onClick={handleYes} buttonClassNames={clsx('!w-fit', 'bg-red-500', 'hover:bg-red-600')}>
              Yes, I'm sure
            </LugatButton>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ConfirmationDialog
