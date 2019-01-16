import React from 'react'
import ReactDOM from 'react-dom'
import RecipeReviewCard from './card'

it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(<RecipeReviewCard/>, div)
	ReactDOM.unmountComponentAtNode(div)
})