import * as React from 'react'
import {storiesOf} from '@storybook/react'
import {Carousel} from '..'

const stories = storiesOf('Components', module)

stories.add('Carousel', () => <Carousel />, {info: {inline: true}})
