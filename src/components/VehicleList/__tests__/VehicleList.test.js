import React from 'react';
import { render } from '@testing-library/react';
import VehicleList from '..';
import useData from '../useData';

jest.mock('../useData');
const results = [{
  id: 'ftype',
  modelYear: 'k17',
  apiUrl: '/api/vehicle_ftype.json',
  media: [
    {
      name: 'vehicle',
      url: '/images/16x9/ftype_k17.jpg'
    },
    {
      name: 'vehicle',
      url: '/images/1x1/ftype_k17.jpg'
    }],
  description: 'Luxury business saloon with distinctive design, dynamic drive and state-of-the-art technologies.',
  price: '',
  meta: {
    passengers: 5,
    drivetrain: [
      'AWD',
      'RWD'
    ],
    bodystyles: [
      'saloon'
    ],
    emissions: {
      template: 'CO2 Emissions $value g/km',
      value: 104
    }
  }

}];

describe('<VehicleList /> Tests', () => {
  it('Should show loading state if it not falsy', () => {
    useData.mockReturnValue([true, 'An error occurred', 'results']);
    const { queryByTestId } = render(<VehicleList />);

    expect(queryByTestId('loading')).not.toBeNull();
    expect(queryByTestId('error')).toBeNull();
    expect(queryByTestId('results')).toBeNull();
  });

  it('Should show error if it is not falsy and loading is finished', () => {
    useData.mockReturnValue([false, 'An error occurred', 'results']);
    const { queryByTestId } = render(<VehicleList />);

    expect(queryByTestId('loading')).toBeNull();
    expect(queryByTestId('error')).not.toBeNull();
    expect(queryByTestId('results')).toBeNull();
  });

  it('Should show results if loading successfully finished', async () => {
    useData.mockReturnValue([false, false, results]);
    const { queryByTestId } = render(<VehicleList />);

    expect(queryByTestId('loading')).toBeNull();
    expect(queryByTestId('error')).toBeNull();
    expect(queryByTestId('results')).not.toBeNull();
  });
});
