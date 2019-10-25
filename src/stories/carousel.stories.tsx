import './examples.css'

import React, {useRef} from 'react'
import {storiesOf} from '@storybook/react'
import {withInfo} from '@storybook/addon-info'
import {action} from '@storybook/addon-actions'
import {Carousel, useCarousel} from '..'
import notes from './carousel.md'
import {text, boolean, number} from '@storybook/addon-knobs'

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
					<div className="slide" key={i}>
						{i + 1}
					</div>
				))}
			</Carousel>
			Total pages: {carousel.total}
			<br />
			Current page: {carousel.current}
			<br />
			<button onClick={() => carousel.goPrevious()}>Previous</button>
			<br />
			<button onClick={() => carousel.goNext()}>Next</button>
		</div>
	)
}

stories.add('Simple', () => <SimpleExample />)

const ContainerExample = () => {
	const carousel = useCarousel()
	return (
		<div style={{overflow: 'hidden'}}>
			<div className="container">
				<Carousel {...carousel} full className="carousel">
					{Array.from(Array(30)).map((_, i) => (
						<div
							className={`card ${carousel.isActive(i) ? 'is-active' : ''}`}
							key={i}
						>
							<div className="slide">{i + 1}</div>
						</div>
					))}
				</Carousel>
				Active page: {carousel.current}
			</div>
		</div>
	)
}

stories.add(
	'In container',
	() => (
		<div>
			<ContainerExample />
		</div>
	),
	{
		notes: {markdown: notes}
	}
)
