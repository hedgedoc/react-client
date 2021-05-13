/*
 * SPDX-FileCopyrightText: Copyright (c) 2013-present, Facebook, Inc.
 *
 * SPDX-License-Identifier: MIT
 */
'use strict';

module.exports = {
  process() {
    return 'module.exports = {};';
  },
  getCacheKey() {
    // The output is always the same.
    return 'cssTransform';
  },
};
