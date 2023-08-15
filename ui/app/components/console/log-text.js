/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import Component from '@ember/component';

export default Component.extend({
  'data-test-component': 'console/log-text',
  attributeBindings: ['data-test-component'],
});
