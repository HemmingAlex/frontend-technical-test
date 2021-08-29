// eslint-disable-next-line no-unused-vars
import { request } from './helpers';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.
export default async function getData() {
  const response = await request('http://localhost:8080/api/vehicles.json').then((data) => fetch(data));

  const store = await response.json();
  const list = await store.filter((object) => object.id !== 'problematic').map(async (input) => {
    const details = await request(`http://localhost:8080/api/vehicle_${input.id}.json`).then((data) => fetch(data));
    const newDetails = await details.json();
    return { ...input, ...newDetails };
  });
  const resolvedList = await Promise.all(list);
  return resolvedList;
}
