import React from 'react';
import useData from './useData';
import './style.scss';
import { useScreen } from './screenHook';

export default function VehicleList() {
  const [loading, error, vehicles] = useData();
  const { width } = useScreen();
  const isDesktop = 800;

  if (loading) {
    return <div data-testid="loading">Loading</div>;
  }

  if (error) {
    return <div data-testid="error">{ error }</div>;
  }

  return (
    <div
      data-testid="results"
      className="VehicleList"
    >

      {vehicles.map((input) => (
        <div
          style={{ margin: '0', padding: '0' }}
          className="item"
          key={input.id}
        >

          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div className="Card">

              {width > isDesktop ? <img src={input.media[0].url} height={400} width={800} alt="car" /> : <img src={input.media[0].url} alt="car" /> }
              {/* the tablet image seems unlikely to be an improvment */}
              <div className="Info">

                <h1>
                  {input.media[0].name.toUpperCase()}
                  {' '}
                  NAME
                </h1>

                {input.price && (
                <div className="Price" role="note">
                  From
                  {' '}
                  {input.price}
                </div>
                )}

                <div className="Description">
                  {input.description}
                </div>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
