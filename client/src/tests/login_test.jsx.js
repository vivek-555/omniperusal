import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Login from '../components/Login';

describe('<Login />', () => {
  it('renders two <input /> tags', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(input)).to.have.length(2);
  });

  it('renders an `.imgcontainer`', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('.imgcontainer')).to.have.length(1);
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(
      <Login onButtonClick={onButtonClick} />
    );
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('username', "vivek");
    expect(onButtonClick).to.have.property('password', "123456");
  });
});