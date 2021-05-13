/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

'use strict';
const { createHash } = require('crypto');

module.exports = env => {
  const hash = createHash('md4');
  hash.update(JSON.stringify(env));

  return hash.digest('hex');
};
