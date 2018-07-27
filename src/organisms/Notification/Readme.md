	const Button = require('../../molecules/Button/Button').default;

	let notification;
	
	<div
		className="dc-site-currys"
		style={{
			position: 'relative',
			display: 'flex',
			flexDirection: 'column'
		}}
	>
		<Button
			onClick={() => notification.show({
				fadeInOut: true,
				content: <span>Foo <strong>bar</strong></span>,
				type: 'positive'
			})}
		>
			Show notification
		</Button>
		
		<Button
			onClick={() => notification.show({
				fadeInOut: true,
				content: 'There is some error!',
				type: 'negative'
			})}
		>
			Show different notification
		</Button>
		
		<Button
			onClick={() => notification.hide()}>
			Hide notification with fade out
		</Button>
		
		<Button
			onClick={() => notification.hide({ fadeInOut: false })}>
			Hide notification without fade out
		</Button>
		
		<Notification
			ref={n => notification = n}
			style={{
				maxWidth: 300,
				right: 50,
				bottom: 130
			}}
		/>
	</div>
