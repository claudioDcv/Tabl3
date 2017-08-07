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

/*
import React from 'react';

import ReactTestUtils from 'react-dom/test-utils';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import ComponentWrapper from '../index';

// Demo tests

// Shallow Rendering
// https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
describe('Shallow Rendering', () => {

  it('to have three `.icon-test`s', () => {
    const wrapper = shallow(<ComponentWrapper />);
    expect(wrapper.find('.table-2-new')).to.have.length(1);
  });
/*
    it('simulates click events', () => {
        const buttonClick = sinon.spy();
        const wrapper = shallow(
          <MyComponent handleClick={buttonClick} />
        );
        wrapper.find('button').simulate('click');
        expect(buttonClick.calledOnce).to.equal(true);
    });
*/
/*
});

// Full DOM Rendering
// https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md\
/*
describe('Full DOM Rendering', () => {

    it('allows us to set props', () => {
        const wrapper = mount(<MyComponent bar='baz' />);
        expect(wrapper.props().bar).to.equal('baz');
        wrapper.setProps({ bar: 'foo' });
        expect(wrapper.props().bar).to.equal('foo');
    });

    it('calls componentDidMount', () => {
        sinon.spy(MyComponent.prototype, 'componentDidMount');
        const wrapper = mount(<MyComponent />);
        expect(MyComponent.prototype.componentDidMount.calledOnce).to.be.true;
        MyComponent.prototype.componentDidMount.restore();
    });

});

// Static Rendered Markup
// https://github.com/airbnb/enzyme/blob/master/docs/api/render.md
describe('Static Rendered Markup', () => {

    it('renders three `.icon-test`s', () => {
        const wrapper = render(<MyComponent />);
        expect(wrapper.find('.icon-test').length).to.equal(3);
    });

});
*/
