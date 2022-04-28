import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	useMemo,
} from 'react';

// useState

export const App = () => {
	// array destructuring
	const [name, setName] = useState('');

	const ref = useRef(0);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChangeInputCB = useCallback((event: any) => {
		console.log(++ref.current);
		console.log({ name: event.target.value, time: Date.now() });
		setName(event.target.value);
	}, []);

	const handleChangeInputV2 = useCallback((value?: string) => {
		console.log(++ref.current);
		console.log({ name: value, time: Date.now() });

		if (typeof value === 'string') setName(value);
	}, []);
	const handleChangeInput = useCallback(() => {
		if (typeof inputRef.current?.value === 'string')
			setName(inputRef.current.value);
	}, []);

	useEffect(() => {
		const ref = inputRef.current;
		ref?.addEventListener('click', handleChangeInput);

		return () => {
			ref?.removeEventListener('click', handleChangeInput);
		};
	}, [handleChangeInput]);

	// const handleChangeInputNoCB = (event: any) => {
	// 	console.log({ name: event.target.value, time: Date.now() });
	// 	setName(event.target.value);
	// };

	useEffect(() => {
		console.log({ name, time: Date.now() });
	}, [name]);

	// useEffect(() => {
	// 	console.log('updates on every rerender');
	// }, [handleChangeInputNoCB]);

	useEffect(() => {
		console.log('mount CB');
	}, [handleChangeInputCB]);

	useEffect(() => {
		console.log('mount NONE');
	}, []);

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '300px 1fr',
				height: '100vh',
			}}
		>
			<h1>App</h1>
			<div style={{ background: 'black', color: 'white' }}>
				<h2>{name}</h2>
				<input
					ref={inputRef}
					type='text'
					value={name}
					onChange={handleChangeInputCB}
				/>
			</div>
		</div>
	);
};
