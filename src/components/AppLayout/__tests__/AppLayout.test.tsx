import React from 'react'
import renderer from 'react-test-renderer'
import { AppLayout } from '../AppLayout'

test('it renders correctly', () => {
  const root = renderer.create(<AppLayout />).toJSON()
  expect(root).toMatchSnapshot()
})
