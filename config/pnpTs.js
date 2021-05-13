/*
 * SPDX-FileCopyrightText: Copyright (c) 2013-present, Facebook, Inc.
 *
 * SPDX-License-Identifier: MIT
 */

import {resolveModuleName} from "ts-pnp";

export function resolveModuleName(
  typescript,
  moduleName,
  containingFile,
  compilerOptions,
  resolutionHost
) {
  return resolveModuleName(
    moduleName,
    containingFile,
    compilerOptions,
    resolutionHost,
    typescript.resolveModuleName
  );
}

export function resolveTypeReferenceDirective (
  typescript,
  moduleName,
  containingFile,
  compilerOptions,
  resolutionHost
) {
  return resolveModuleName(
    moduleName,
    containingFile,
    compilerOptions,
    resolutionHost,
    typescript.resolveTypeReferenceDirective
  );
}
