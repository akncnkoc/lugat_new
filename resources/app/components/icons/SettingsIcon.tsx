import React from 'react'
import { SvgProps } from '@/helpers/types'

const SettingsIcon: React.FC<SvgProps> = (props) => {
	const { width = 24, height = 24, fillColor = 'currentColor' } = props
	return (
		<svg
			viewBox='0 0 24 24'
			width={width}
			height={height}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M9.75195 12.0128C9.75175 11.0587 10.4087 10.2372 11.3211 10.0509C12.2335 9.86458 13.1472 10.3652 13.5034 11.2467C13.8595 12.1282 13.559 13.1449 12.7856 13.6752C12.0121 14.2054 10.9812 14.1014 10.3233 13.4268C9.95757 13.0518 9.75206 12.5432 9.75195 12.0128Z'
					stroke={fillColor}
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				></path>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M10.3077 5.46781C10.2943 4.94809 10.557 4.46185 10.9937 4.19793C11.4305 3.93402 11.9725 3.93402 12.4092 4.19793C12.8459 4.46185 13.1086 4.94809 13.0952 5.46781V6.18481C14.1532 6.45066 15.1177 7.01454 15.8798 7.81281L16.4346 7.47881C16.7552 7.28632 17.1379 7.23446 17.4962 7.33495C17.8545 7.43544 18.1583 7.6798 18.3388 8.01281C18.7238 8.70718 18.4973 9.58984 17.8288 9.99981L17.3121 10.3108C17.6296 11.4207 17.6296 12.6009 17.3121 13.7108L17.8288 14.0218C18.4996 14.4319 18.7264 15.3175 18.3388 16.0128C18.1579 16.3455 17.8541 16.5894 17.4958 16.6895C17.1375 16.7896 16.7549 16.7375 16.4346 16.5448L15.8798 16.2108C15.1177 17.01 14.1528 17.5746 13.0942 17.8408V18.5578C13.1076 19.0775 12.845 19.5638 12.4082 19.8277C11.9715 20.0916 11.4295 20.0916 10.9927 19.8277C10.556 19.5638 10.2933 19.0775 10.3067 18.5578V17.8408C9.24871 17.575 8.28422 17.0111 7.52212 16.2128L6.96735 16.5468C6.64684 16.739 6.26438 16.7907 5.90629 16.6902C5.5482 16.5897 5.24464 16.3455 5.06415 16.0128C4.67911 15.3184 4.90563 14.4358 5.57407 14.0258L6.09082 13.7148C5.77329 12.6049 5.77329 11.4247 6.09082 10.3148L5.57407 10.0038C4.90333 9.59369 4.67651 8.70808 5.06415 8.01281C5.24498 7.68014 5.54885 7.43621 5.90715 7.3361C6.26546 7.236 6.64797 7.28816 6.96832 7.48081L7.5231 7.81481C8.28484 7.01545 9.24936 6.4505 10.3077 6.18381V5.46781Z'
					stroke={fillColor}
					strokeWidth='1.5'
					strokeLinecap='round'
					strokeLinejoin='round'
				></path>
			</g>
		</svg>
	)
}

export default SettingsIcon
