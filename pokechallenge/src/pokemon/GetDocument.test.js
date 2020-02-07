//tests made with JEST, using JEST snapshots
import React from 'react';
import GetDocument from "./GetDocument";
import {render, fireEvent, screen} from '@testing-library/react';

it('retrieves document, change data, then update document', async () => {
  //Arrange
  const fakeUpdate = jest.fn((id, payLoad) => Promise.resolve({}));

  //Act
  const allTest = render(<GetDocument getDocument={fakeUpdate}/>);
  await screen.findByText(/No data/i);

  //Assert
  expect(allTest).toMatchSnapshot();
  expect(fakeUpdate).toHaveBeenCalledTimes(1);
  expect(fakeUpdate).toHaveBeenCalledWith(undefined);
});

it('has empty props', () => {
  //Arrange

  //Act
  render(<GetDocument />);
  let submit = screen.getByText(/no data/i);


  //Assert
  expect(submit).toBeInTheDocument();
});