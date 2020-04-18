import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Order from '~/pages/Order';
import ManageOrder from '~/pages/Order/Manage';
import Deliverymen from '~/pages/Deliverymen';
import ManageDeliverymen from '~/pages/Deliverymen/Manage';
import Recipient from '~/pages/Recipient';
import ManageRecipient from '~/pages/Recipient/Manage';
import Problem from '~/pages/Problem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/order" exact component={Order} isPrivate />
      <Route path="/order/manage" exact component={ManageOrder} isPrivate />
      <Route path="/deliverymen" exact component={Deliverymen} isPrivate />
      <Route
        path="/deliverymen/manage"
        exact
        component={ManageDeliverymen}
        isPrivate
      />
      <Route path="/recipient" exact component={Recipient} isPrivate />
      <Route
        path="/recipient/manage"
        exact
        component={ManageRecipient}
        isPrivate
      />
      <Route path="/problem" component={Problem} isPrivate />
    </Switch>
  );
}
