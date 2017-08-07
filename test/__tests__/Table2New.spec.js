import React from 'react'
import ReactDOM from 'react-dom'
import Tabl3 from '../index'
import { mount } from 'enzyme'

describe('Inicializando Tabl3', () => {
  it('Montando componente `tabl3`', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Tabl3 />, div)
  })

  it('agregando propiedad `config`', () => {
    const wrapper = mount(<Tabl3 config={{}} />)
    expect(wrapper.props().config).to.equal({})
    // wrapper.setProps({ bar: 'foo' });
    // expect(wrapper.props().bar).to.equal('foo');
  })
})

// initial
// page 2
// page 3
// ordering by -name
// search by name 'a'
// search by id='Blanco'
