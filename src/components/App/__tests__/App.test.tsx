import React from 'react'
import renderer from 'react-test-renderer'
import { App } from '../App'

test('it renders correctly', () => {
  const root = renderer.create(<App />).toJSON()
  expect(root).toMatchSnapshot()
})
