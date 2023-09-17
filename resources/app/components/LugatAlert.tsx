import React, { ComponentPropsWithoutRef } from 'react';

type RabbitAlertProps = {
	alertClassNames?: string;
} & ComponentPropsWithoutRef<'div'>;

const RabbitAlert: React.FC<RabbitAlertProps> = (props) => {
	const { alertClassNames, ...divProps } = props;
	return (
		<div
			className={`flex p-4 mb-4 text-sm rounded-lg bg-gray-800 text-green-400 w-full ${alertClassNames}`}
			role="alert"
			{...divProps}>
			<div className={'text-center'}>{divProps.children}</div>
		</div>
	);
};
export default RabbitAlert;
