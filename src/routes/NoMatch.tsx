import * as React from 'react';
import { Location } from 'history';

interface INoMatchProps {
  location: Location
}

const NoMatch: React.FunctionComponent<INoMatchProps> = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
);

export { NoMatch };