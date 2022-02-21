import {number, select} from '@storybook/addon-knobs'
import {storiesOf} from '@storybook/react'
import React from 'react'
import {Carousel, useCarousel} from '../carousel'
import './examples.css'

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
					<div className={`slide is-${carousel.getPosition(i)}`} key={i}>
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
					{Array.from(Array(5)).map((_, i) => (
						<div className={`card is-${carousel.getPosition(i)}`} key={i}>
							<div className="slide">{i + 1}</div>
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
		</div>
	)
}

stories.add('In container', () => <ContainerExample />)

const ResponsiveExample = () => {
	console.log('draw here')
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
					{Array.from(Array(5)).map((_, i) => (
						<div
							className={`card is-responsive is-${carousel.getPosition(i)}`}
							key={i}
						>
							<div className="slide">{i + 1}</div>
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
		</div>
	)
}

stories.add('Responsive', () => <ResponsiveExample />)

const VariableWidth = () => {
	const carousel = useCarousel()
	return (
		<div>
			<Carousel {...carousel} className="carousel">
				<div className={`slide is-${carousel.getPosition(0)}`}>1</div>
				<div
					className={`slide is-${carousel.getPosition(1)}`}
					style={{minWidth: '25%'}}
				>
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
