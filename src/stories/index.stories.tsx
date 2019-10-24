import * as React from 'react'
import {storiesOf} from '@storybook/react'
import {withInfo} from '@storybook/addon-info'
import {action} from '@storybook/addon-actions'
import {Carousel, useCarousel} from '..'

const stories = storiesOf('Components', module)

stories.addDecorator(withInfo)
stories.addParameters({info: {inline: true}})

stories.add('Carousel', () => {
	const carousel = useCarousel()
	return (
		<>
			<Carousel {...carousel}>
				<div
					style={{
						minWidth: '100%',
						height: '300px',
						background: 'red',
						color: 'white'
					}}
				>
					a
				</div>
				<div
					style={{
						minWidth: '100%',
						height: '300px',
						background: 'red',
						color: 'white'
					}}
				>
					b
				</div>
				<div
					style={{
						minWidth: '100%',
						height: '300px',
						background: 'red',
						color: 'white'
					}}
				>
					b
				</div>
				<div
					style={{
						minWidth: '100%',
						height: '300px',
						background: 'red',
						color: 'white'
					}}
				>
					b
				</div>
			</Carousel>
			Total pages: {carousel.total}
			<br />
			Current page: {carousel.current}
			<br />
			<button onClick={() => carousel.goPrevious()}>Previous</button>
			<br />
			<button onClick={() => carousel.goNext()}>Next</button>
		</>
	)
})
