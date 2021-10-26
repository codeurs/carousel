import './examples.css'

import {action} from '@storybook/addon-actions'
import {withInfo} from '@storybook/addon-info'
import {boolean, number, select, text} from '@storybook/addon-knobs'
import {storiesOf} from '@storybook/react'
import React, {useRef} from 'react'
import {Carousel, useCarousel} from '../'
import notes from './carousel.md'

const stories = storiesOf('Carousel', module)

const SimpleExample = () => {
	const carousel = useCarousel()
	const slides = number('Slides', 4, {
		range: true,
		min: 0,
		max: 100,
		step: 1
	})
	return (
		<div>
			<Carousel {...carousel} className="carousel">
				{Array.from(Array(slides)).map((_, i) => (
					<div
						className={`slide ${carousel.isActive(i) ? 'is-active' : ''}`}
						key={i}
					>
						{i + 1}
					</div>
				))}
			</Carousel>
			<div className="options">
				<div>Total pages: {carousel.total}</div>
				<div>Current page: {carousel.current}</div>
				<button onClick={() => carousel.goPrevious()}>Previous</button>
				<button onClick={() => carousel.goNext()}>Next</button>
			</div>
		</div>
	)
}

stories.add('Simple', () => <SimpleExample />)

const ContainerExample = () => {
	const snapTo = select(
		'Snap to',
		{
			Pages: 'pages',
			Elements: 'elements'
		},
		'pages'
	)
	const carousel = useCarousel({snapTo})
	return (
		<div style={{overflow: 'hidden'}}>
			<div className="container">
				<Carousel {...carousel} full className="carousel">
					{Array.from(Array(26)).map((_, i) => (
						<div className={`card is-${carousel.getPosition(i)}`} key={i}>
							<div className="slide">{i + 1}</div>
						</div>
					))}
				</Carousel>
				Active page: {carousel.current}
			</div>
		</div>
	)
}

stories.add('In container', () => <ContainerExample />, {
	notes: {markdown: notes}
})

const VariableWidth = () => {
	const carousel = useCarousel()
	return (
		<div>
			<Carousel {...carousel} className="carousel">
				<div className="slide is-active">1</div>
				<div className="slide is-active" style={{minWidth: '25%'}}>
					2
				</div>
			</Carousel>
			<div className="options">
				<div>Total pages: {carousel.total}</div>
				<div>Current page: {carousel.current}</div>
				<button onClick={() => carousel.goPrevious()}>Previous</button>
				<button onClick={() => carousel.goNext()}>Next</button>
			</div>
		</div>
	)
}

stories.add('Variable Width', () => <VariableWidth />)
