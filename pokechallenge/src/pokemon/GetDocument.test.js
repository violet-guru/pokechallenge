import React from 'react';
import GetDocument from "./GetDocument";
import {render, fireEvent, screen} from '@testing-library/react';

it('retrieves document, change data, then update document', async () => {
  //Arrange
  const fakeUpdate = jest.fn((id, payLoad) => Promise.resolve({}));

  //Act
  const allTest = render(<GetDocument getDocument={fakeUpdate}/>);
  await screen.findByText(/abilities/i);

  //Assert
  expect(allTest).toMatchSnapshot();
  expect(fakeUpdate).toHaveBeenCalledTimes(1);
  expect(fakeUpdate).toHaveBeenCalledWith(undefined);
});

it('has empty props', () => {
  //Arrange

  //Act
  render(<GetDocument />);
  let submit = screen.getByText(/abilities/i);


  //Assert
  expect(submit).toBeInTheDocument();
});